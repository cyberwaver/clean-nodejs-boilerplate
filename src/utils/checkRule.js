const checkRule = async (rule) => {
  const ruleIsBroken = await rule.isBroken();
  if (!ruleIsBroken) return;
  throw rule.error;
};

module.exports = checkRule;
