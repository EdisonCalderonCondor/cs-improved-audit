const DeepProxy = require("proxy-deep");

const target = {
  name: "Aura",
  age: 26,
  addresses: ["Av 123, St. B"],
  detail: { numbers: [1, 2, 3, [4, 5, 6]] },
  location: {
    city: "Bogotá",
  },
};
const p = new DeepProxy(target, {
  get(target, path, receiver) {
    const value = Reflect.get(target, path, receiver);
    if (!["toString", "length", "toJSON"].includes(path)) {
      console.log(`The current path is:`, [...this.path, path]);
    }
    if (typeof value === "object" && value != null) {
      return this.nest(value);
    }
    return value;
  },
});

// console.log(JSON.stringify(p.name));
// console.log(JSON.stringify(p.addresses));
// console.log(JSON.stringify(p.detail.numbers));

p; // Observer is not called
const { age } = p; // Observer is called
p.name; // Observer is called
p.addresses; // Observer is called
p.detail.numbers; // Observer is called
p.detail.numbers[3]; // Observer is called
const { location, location : { city } } = p;
console.log(city) // Observer is not called
console.log(location.city) // Observer is called

// Maybe we should consider only unique calls in order to reduce the history size
