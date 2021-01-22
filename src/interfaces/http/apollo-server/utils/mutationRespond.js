const mutationRespond = (message, data, status = "SUCCESS") => {
  return {
    status,
    message,
    data: JSON.stringify(data),
  };
};

module.exports = mutationRespond;
