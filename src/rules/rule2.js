const Step = require("../util/Step");

class Rule2 extends Step {
  constructor(...args) {
    super(...args);
  }

  async fn(context) {
    console.log(JSON.stringify(context));
    context.date = new Date();
    console.log(JSON.stringify(context));
  }
}

module.exports = Rule2;
