/// <reference path='../ext/node.d.ts'/>
let assert = require("assert");
import Line from "../src/train.js";

// Test for Empty Argument
assert.deepEqual(Line.getAllURLs(""),[]);
// Test for valid URL
assert.notDeepEqual(Line.getAllURLs("http://transit.yahoo.co.jp/traininfo/area/4/"),[]);