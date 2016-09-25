"use strict";
/*********************************************************/
/* Name: train.ts / train.js                             */
/* Description:                                          */
/*   this scripts processing yahoo.co.jp                 */
/*********************************************************/
/// <reference path="../ext/node.d.ts"/>
/// <reference path="../typings/index.d.ts"/>
/// <reference path="../ext/cheerio-httpcli.d.ts"" />
var client = require("cheerio-httpcli");
var logger = require("./logger").request;
var Line;
(function (Line) {
    (function (State) {
        State[State["NORMAL"] = 0] = "NORMAL";
        State[State["DELAYED"] = 1] = "DELAYED";
        State[State["SUSPENDED"] = 2] = "SUSPENDED";
        State[State["OTHER"] = 3] = "OTHER";
        State[State["NA"] = 4] = "NA";
    })(Line.State || (Line.State = {}));
    var State = Line.State;
    var LineInfo = (function () {
        function LineInfo(name, url) {
            this.name = name;
            this.url = url;
            this.state = State.NA;
            this.desc = "";
        }
        Object.defineProperty(LineInfo.prototype, "getName", {
            get: function () {
                return this.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LineInfo.prototype, "getURL", {
            get: function () {
                return this.url;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LineInfo.prototype, "getState", {
            get: function () {
                return this.state;
            },
            enumerable: true,
            configurable: true
        });
        LineInfo.prototype.refreshState = function () {
            var result = client.fetchSync(this.url);
            if (result.response.statusCode != 200) {
                return false;
            }
            var state = result.$("#mdServiceStatus dt").text().slice(3);
            logger.info(state);
            var preState = this.state;
            if (state.indexOf("平常") != -1) {
                this.state = State.NORMAL;
            }
            else if (state.indexOf("遅延") != -1) {
                this.state = State.DELAYED;
            }
            else if (state.indexOf("運休") != -1) {
                this.state = State.SUSPENDED;
            }
            else {
                this.state = State.OTHER;
            }
            this.desc = state;
            if (preState != this.state) {
                return true;
            }
            return false;
        };
        return LineInfo;
    }());
    Line.LineInfo = LineInfo;
    function getAllURLs(base) {
        if (base == "") {
            return [];
        }
        var urls = [];
        var result = [];
        result = client.fetchSync(base).$(".elmTblLstLine table a");
        for (var i = 0; i < result.length; i++) {
            urls.push(new LineInfo(result[i].children[0].data, result[i]["attribs"]["href"]));
        }
        return urls;
    }
    Line.getAllURLs = getAllURLs;
})(Line = exports.Line || (exports.Line = {}));
exports.__esModule = true;
exports["default"] = Line;
