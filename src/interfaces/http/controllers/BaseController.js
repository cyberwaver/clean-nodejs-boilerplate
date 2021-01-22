const httpStatus = require("http-status");
const { NotFoundException } = require("../../../exceptions");

class BaseController {
  constructor() {
    this.__executionContext = {
      asyncTask: Promise.resolve(),
      onSuccess: {},
      onFailure: {},
    };
    this.options = {};
  }

  task(asyncTask) {
    this.__executionContext = {};
    this.__executionContext.asyncTask = asyncTask;
    return this;
  }

  onSuccess(statusOrOptions, message, dtoSerializer) {
    let onSuccessData = { status: statusOrOptions, message, dtoSerializer };
    if (typeof statusOrOptions == "object") onSuccessData = statusOrOptions;
    this.__executionContext.onSuccess = onSuccessData;
    return this;
  }

  onFailure(status) {
    this.__executionContext.onFailure = { status };
    return this;
  }

  async execute(res) {
    const { asyncTask, onFailure, onSuccess } = this.__executionContext;
    asyncTask
      .then((result) => {
        const { status, message, dtoSerializer } = onSuccess;
        res
          .status(status || httpStatus.OK)
          .json({ status: "success", message, data: this._runDTOSerializer(result, dtoSerializer) });
      })
      .catch((err) => {
        if (err instanceof NotFoundException) res.status(onFailure.status || httpStatus.NOT_FOUND).json(err);
        else if (err.details) res.status(onFailure.status || httpStatus.BAD_REQUEST).json(err);
        else {
          res.status(onFailure.status || 500).send("INTERNAL SERVER ERROR");
          console.error(err);
        }
      });
  }
  _runDTOSerializer(data, dtoSerializer = (d) => d) {
    return Array.isArray(data) ? data.map(dtoSerializer) : dtoSerializer(data);
  }
}

module.exports = BaseController;
