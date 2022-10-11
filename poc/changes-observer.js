// https://stackoverflow.com/questions/11578377/detecting-change-in-a-javascript-object
const { Observable } = require("object-observer");

const target = {
  name: "Aura",
  addresses: ["Av 123, St. B"],
};

const o = Observable.from(target, { async: false });

Observable.observe(o, (changes) => {
  changes.forEach((change) => {
    const { type, path, value, oldValue } = change;
    console.log(JSON.stringify({ type, path, value, oldValue }));
  });
});

o.addresses[1] = { name: ["ABC", "DEF"] };
o.addresses[1].name[1] = "XYZ";
console.log(o);
