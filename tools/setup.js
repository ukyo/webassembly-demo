var inquirer = require("inquirer");
var fs = require("fs");
var path = require("path");

inquirer.prompt([{
  type: "input",
  name: "sexprwastPath",
  message: "set path to sexpr-wasm (see also https://github.com/WebAssembly/sexpr-wasm-prototype):"
}]).then(function(answer) {
  fs.writeFileSync(path.resolve(process.cwd(), "wastconfig.json"), JSON.stringify(answer, null, 2));
});