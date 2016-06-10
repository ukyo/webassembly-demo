var watch = require("watch");
var config = require("../wastconfig");
var fs = require("fs");
var exec = require("child_process").exec;
var path = require("path");

function filterWast(fileName) {
  return /wast$/.test(fileName);
}

function done(type, fileName, err) {
  if (err) return console.error(err);
  console.log(type, fileName);
}

function compile(fileName) {
  exec(config.sexprwastPath + " " + fileName + " -o " + fileName.replace(/wast$/, "wasm"), done.bind(null, "compiled", fileName));
}

function remove(fileName) {
  fs.unlink(fileName.replace(/wast$/, "wasm"), done.bind(null, "removed", fileName));
}

// start
fs.readdirSync("src/wast").filter(filterWast).forEach(function(f) { compile(path.resolve('src/wast', f)) });
watch.createMonitor("src/wast", {
  filter: filterWast,
  interval: 500
}, function(monitor) {
  monitor.on("created", compile);
  monitor.on("changed", compile);
  monitor.on("removed", remove);
});