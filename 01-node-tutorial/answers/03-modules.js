const ceos = require("./04-names");
const ceoPrinter = require("./05-utils");

console.log(
  "Printing a list of ceos from 04-names.js using the ceoPrinter function from 05-utils.js:"
);
ceoPrinter(ceos);

console.log("Printing some company info from 06-alternative-flavor.js:");
const companies = require("./06-alternative-flavor");
console.log(companies);

const mindGrenade = require("./07-mind-grenade");
