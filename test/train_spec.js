var assert = require("assert");
var train = require("../src/train.js");
console.log("########### Start testing for getTrainData function ###########");
console.log("testing empty URL");
assert.equal(train.getTrainData(""), "");
console.log("testing valid URL");
assert.notEqual(train.getTrainData("http://transit.yahoo.co.jp/traininfo/detail/22/0/"), 1);
console.log("########### End testing for getTrainData function ###########");
