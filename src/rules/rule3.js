const Step = require("../util/Step");

class Rule3 extends Step {
  async fn(context) {
    Object.assign(context, {
      location: {
        country: "US",
        state: "FL",
        address: [""],
      },
    });

    context.location.address[0] = "Av. 123, St B";
  }
}

module.exports = Rule3;
