var assert = require("assert");
var train = require("../src/train.js");
// Test for Empty Argument
assert.equal(train.getTrainData(""), "");
// Test for valid URL
assert.notEqual(train.getTrainData("http://transit.yahoo.co.jp/traininfo/detail/22/0/"), "");
