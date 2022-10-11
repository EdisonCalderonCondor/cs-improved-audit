const { Observable } = require("object-observer");
const { clone } = require(".");
const now = require("performance-now");

class Step {
  constructor(context, audit) {
    if (!context) throw new Error("context object is required!");
    this.context = context;
    this.audit = audit;
  }

  async fn() {} // Should be overridden by child classes

  async run() {
    const stepChangeHistory = [];
    const observer = (changes) => {
      changes.forEach((change) => {
        const { type, path, value, oldValue } = change;
        stepChangeHistory.push(clone({ type, path, value, oldValue }));
      });
    };
    Observable.observe(this.context, observer);
    const start = now();
    await this.fn(this.context);
    const end = now();
    Observable.unobserve(this.context, observer);

    this.audit.steps.push({
      rule: this.constructor.name,
      fn: this.fn,
      contextChangesHistory: stepChangeHistory,
      timing: end - start,
    });
  }
}

module.exports = Step;
