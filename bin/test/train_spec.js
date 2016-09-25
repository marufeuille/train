"use strict";
/// <reference path='../ext/node.d.ts'/>
var assert = require("assert");
var train_js_1 = require("../src/train.js");
// Test for Empty Argument
assert.deepEqual(train_js_1["default"].getAllURLs(""), []);
// Test for valid URL
assert.notDeepEqual(train_js_1["default"].getAllURLs("http://transit.yahoo.co.jp/traininfo/area/4/"), []);
