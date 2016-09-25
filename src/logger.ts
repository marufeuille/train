/*********************************************************/
/* Name: logger.ts / logger.js                           */
/* Description:                                          */
/*   setting for logging                                 */
/*********************************************************/
/// <reference path="../ext/node.d.ts"/>
var log4js = require("log4js");
var logger = exports = module.exports = {};
log4js.configure({
     appenders: [
         {
             "type": "file",
             "category": "request",
             "filename": "./logs/request.log",
             "pattern": "_yyyy-MM-dd"
         }
    ]
});
logger["request"] = log4js.getLogger("request");