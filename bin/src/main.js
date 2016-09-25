/*********************************************************/
/* Name: train.ts / train.js                             */
/* Description:                                          */
/*   this scripts processing yahoo.co.jp                 */
/*********************************************************/
/// <reference path='../ext/node.d.ts'/>
"use strict";
var train_1 = require("./train");
var sqlite3 = require("sqlite3");
var fs = require("fs");
var logger = require('./logger').request;
var db_path = "./test.sqlite3", exists = fs.existsSync(db_path);
sqlite3.verbose();
var db = new sqlite3.Database(db_path);
db.on("error", function (err) {
    logger.error("error occured.");
    logger.error(err);
});
db.serialize(function () {
    if (!exists) {
        logger.info("create table.");
        db.run('create table trains (name TEXT, state TEXT, date INTEGER)');
    }
});
var baseUrl = "http://transit.yahoo.co.jp/traininfo/area/4/";
var all = train_1["default"].getAllURLs(baseUrl);
all.forEach(function (elm) {
    if (elm.refreshState()) {
        logger.info('new data: ' + elm.getName + " : " + elm.getState);
        db.run('insert into trains values (?, ?, ?);', elm.getName, train_1["default"].State[elm.getState], Date.now());
    }
});
db.close();
