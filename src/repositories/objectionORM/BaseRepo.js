const shortUUID = require("short-uuid");
const _ = require("lodash");

const addID = (obj) => ({ ...obj, id: shortUUID.generate() });

class BaseRepo {
  constructor(Model, domainMeta) {
    this.Model = Model;
    this.domainMeta = domainMeta;
  }

  async add(data) {
    const dataToAdd = Array.isArray(data) ? data.map(addID) : addID(data);
    const modelInstance = await this.Model.query().insertAndFetch(dataToAdd);
    return this.modelToJSON(modelInstance);
  }

  async addMany(data) {
    return await this.add(data);
  }

  async delete(id) {
    await this.Model.query().findById(id).delete();
  }

  async deleteById(id) {
    await this.Model.query().findById(id).delete();
  }

  async deleteMany(data = []) {
    const entities = data.map((d) => ({ ...d, deletedAt: new Date() }));
    return await this.Model.query().upsertGraph(entities);
  }

  async deleteManyByIds(ids = []) {
    ids = ids.filter(Boolean);
    if (ids.length === 0) return;
    await this.Model.query()
      .whereIn("id", ids)
      .skipUndefined()
      .whereNotDeleted()
      .patch({ deletedAt: new Date() });
  }

  async deleteManyByAttrValues(attr, values) {
    if (!attr || _.isEmpty(values)) return [];
    const modelInstance = await this.Model.query()
      .whereIn(attr, values)
      .patch({ deletedAt: new Date() })
      .whereNotDeleted();
    return this.modelToJSON(modelInstance);
  }

  async deleteManyByAttributes(attrs = {}) {
    await this.Model.query().where(attrs).skipUndefined().whereNotDeleted().delete();
  }

  async forceDeleteManyByIds(ids = []) {
    return await this.Model.query().findByIds(ids).forceDelete();
  }

  async updateById(id, data) {
    const modelInstance = await this.Model.query().patchAndFetchById(id, { ...data, id: undefined });
    return this.modelToJSON(modelInstance);
  }

  async updateByAttributes(attr = {}, data) {
    const item = await this.Model.query().findOne(attr).skipUndefined();
    const modelInstance = await item.$query().patchAndFetch({ ...data, id: undefined });
    return this.modelToJSON(modelInstance);
  }

  async getById(id, errorMsg) {
    const modelInstance = await this.Model.query()
      .findById(id)
      .whereNotDeleted()
      .throwIfNotFound({
        message: errorMsg || `${capitalize(this.domainMeta.singularName)} with id: ${id} not found`,
      });
    return this.modelToJSON(modelInstance);
  }

  async getByIds(ids = []) {
    const modelInstance = await this.Model.query().findByIds(ids).whereNotDeleted();
    return this.modelToJSON(modelInstance);
  }

  async getByAttributes(attr = {}, errorMsg) {
    const modelInstance = await this.Model.query()
      .findOne(attr)
      .skipUndefined()
      .whereNotDeleted()
      .throwIfNotFound({ message: errorMsg || this._generateAttrError(attr) });
    return this.modelToJSON(modelInstance);
  }

  async getAll() {
    const modelInstance = await this.Model.query().whereNotDeleted();
    return this.modelToJSON(modelInstance);
  }

  async getAllByAttributes(attr = {}) {
    const modelInstance = await this.Model.query().where(attr).skipUndefined().whereNotDeleted();
    return this.modelToJSON(modelInstance);
  }

  async getLatestEntryForAttributes(attrs = {}) {
    const modelInstance = await this.Model.query()
      .where(attrs)
      .skipUndefined()
      .whereNotDeleted()
      .orderBy("cId", "desc")
      .first();
    return this.modelToJSON(modelInstance);
  }

  async count() {
    return await this.Model.query().resultSize();
  }

  async countByAttributes(attr) {
    return await this.Model.query().where(attr).skipUndefined().resultSize();
  }

  async recordExistsForId(id) {
    const modelInstance = await this.Model.query().findById(id);
    return Boolean(modelInstance.toJSON());
  }

  async recordExistForAttributes(attr = {}) {
    const record = await this.Model.query().select("id").where(attr).whereNotDeleted().first();
    return !!record;
  }

  _isInstanceOfModel(modelInstance) {
    return modelInstance instanceof this.Model;
  }

  modelToJSON(singleOrListModel) {
    if (Array.isArray(singleOrListModel)) {
      return singleOrListModel.map((m) => (this._isInstanceOfModel(m) ? m.toJSON() : m));
    }
    return this._isInstanceOfModel(singleOrListModel) ? singleOrListModel.toJSON() : singleOrListModel;
  }

  convertRelateds(relateds = []) {
    return relateds.reduce((acc, curr) => ({ ...acc, [curr]: true }), {});
  }

  addPrefixToAttrKeys(attr = {}, tableName = this.Model.tableName) {
    return Object.keys(attr).reduce(
      (acc, attrKey) => ({ ...acc, [`${tableName}.${attrKey}`]: attr[attrKey] }),
      {}
    );
  }

  _generateAttrError(attr) {
    const idInAttr = attr.id ? ` with id: ${attr.id} ` : "";
    const keyList = Object.keys(attr);
    const keyItems = keyList
      .filter((k) => k !== "id")
      .map((k) => k.replace("Id", ""))
      .join(", ");
    let errorMsg = `${capitalize(
      this.domainMeta.singularName
    )}${idInAttr} is not associated with ${keyItems}`;

    //if there is only 1 key present and it's not the "id" key
    if (!idInAttr && keyList.length === 1) {
      errorMsg = `No ${capitalize(this.domainMeta.singularName)} is associated with ${keyItems}: ${
        attr[keyList[0]]
      }`;
    }
    return errorMsg;
  }
}

const capitalize = (word) => {
  if (typeof word !== "string") throw Error(`Capitalize --> ${word} not a string`);
  let start = word[0].toUpperCase();
  return start + word.substr(1);
};

module.exports = BaseRepo;
