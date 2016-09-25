/*********************************************************/
/* Name: train.ts / train.js                             */
/* Description:                                          */
/*   this scripts processing yahoo.co.jp                 */
/*********************************************************/
/// <reference path='../ext/node.d.ts'/>

import Line from "./train";
import sqlite3 = require("sqlite3");
import fs = require("fs");
let logger = require('./logger').request;

let db_path = "./test.sqlite3",
    exists = fs.existsSync(db_path);

sqlite3.verbose();
var db: sqlite3.Database = new sqlite3.Database(db_path);
db.on("error", (err: Error) => {
    logger.error("error occured.")
    logger.error(err);
});
db.serialize(() => {
    if (!exists) {
        logger.info("create table.");
        db.run('create table trains (name TEXT, state TEXT, date INTEGER)');
    }
});
let baseUrl: string = "http://transit.yahoo.co.jp/traininfo/area/4/";
let all: Array<Line.LineInfo> = Line.getAllURLs(baseUrl);

all.forEach((elm: Line.LineInfo) => {
    if (elm.refreshState()) {
        logger.info('new data: ' + elm.getName + " : " + elm.getState);
        db.run('insert into trains values (?, ?, ?);',elm.getName, Line.State[elm.getState], Date.now());
    }
});
db.close();