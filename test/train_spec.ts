/// <reference path='../ext/node.d.ts'/>
let assert = require("assert");
import Line from "../src/train.js";

// Test for Empty Argument
assert.equal(Line.getAllURLs(""),[]);
// Test for valid URL
assert.notEqual(Line.getAllURLs("http://transit.yahoo.co.jp/traininfo/area/4/"),[]);