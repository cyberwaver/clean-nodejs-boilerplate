const execute = (fn) => (appService, ...args) => {
  return new Promise((resolve, reject) => {
    const { SUCCESS, VALIDATION_ERROR, NOT_FOUND, FAILED, ERROR } = appService.outputs;
    appService.on(SUCCESS, (d) => {
      // console.log(d.data);
      resolve(fn(d));
    });
    appService.on(VALIDATION_ERROR, reject);
    appService.on(NOT_FOUND, reject);
    appService.on(FAILED, reject);
    appService.on(ERROR, (error) => {
      reject(error);
      console.error(error);
    });
    appService.execute(...args);
  });
};

const executeQuery = execute((d) => {
  const items = Array.isArray(d.data) ? d.data : [d.data];
  items.forEach(
    (item) => item.meta && typeof item.meta === "object" && (item.meta = JSON.stringify({ ...item.meta }))
  );
  return Array.isArray(d.data) ? items : items[0];
});
const executeMutation = execute((d) => {
  d.data = JSON.stringify(d.data);
  return d;
});

const stringifyMeta = async (dataPromise) => {
  const data = await dataPromise;
  if (Array.isArray(data)) {
    return data.reduce((acc, curr) => {
      if (!curr.meta) return acc;
      return [...acc, { ...curr, meta: JSON.stringify(curr.meta) }];
    }, []);
  }
  if (data.meta) {
    data.meta = JSON.stringify(data.meta);
  }
  return data;
};

module.exports = { executeQuery, executeMutation, stringifyMeta };
