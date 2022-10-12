const Step = require("../util/Step");

class Rule1 extends Step {
  fn(context) {
    console.log(context.uuid);
    context.uuid = Date.now();
    console.log(context.uuid);
  }
}

module.exports = Rule1;
