const { Observable } = require("object-observer");

const getContext = () => {
  const context = { uuid: "default" }; // TODO: Replace with the real context
  const observableContext = Observable.from(context); // Wrap the context with a Recursive Proxy
  return observableContext;
};

module.exports = { getContext };
