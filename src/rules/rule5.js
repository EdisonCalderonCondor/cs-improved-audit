const Step = require("../util/Step");

class Rule5 extends Step {
  fn(context) {
    context.location.address[1] = "St A, Av 987";
  }
}

module.exports = Rule5;
