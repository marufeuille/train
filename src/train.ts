/*********************************************************/
/* Name: train.ts / train.js                             */
/* Description:                                          */
/*   this scripts processing yahoo.co.jp                 */
/*********************************************************/
/// <reference path="../ext/node.d.ts"/>
/// <reference path="../typings/index.d.ts"/>
/// <reference path="../ext/cheerio-httpcli.d.ts"" />
let client = require("cheerio-httpcli");
import mongoose = require("mongoose");
let logger = require("./logger").request;

export namespace Line {
    export enum State {
        NORMAL, DELAYED, SUSPENDED, OTHER,NA
    }
    export class LineInfo {

        protected state: State;
        protected desc: string;
        constructor(private name: string, private url: string) {
            this.state = State.NA;
            this.desc = "";
        }

        get getName(): string {
            return this.name;
        }

        get getURL(): string {
            return this.url;
        }

        get getState(): State {
            return this.state;
        }


        public refreshState(): boolean {
            let result: any = client.fetchSync(this.url);

            if (result.response.statusCode != 200) {
                return false;
            }

            let state: string = result.$("#mdServiceStatus dt").text().slice(3);
            logger.info(state)

            let preState: State = this.state;
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
                return true
            }
            return false;
        }

    }

    export function getAllURLs(base: string): Array<LineInfo> {

        if (base == "") {
            return [];
        }

        let urls: Array<LineInfo> = [];
        let result: Array<any> = [];

        result = client.fetchSync(base).$(".elmTblLstLine table a");
        for (let i: number = 0; i < result.length; i ++) {
            urls.push(new LineInfo(result[i].children[0].data, result[i]["attribs"]["href"]));
        }

        return urls;
    }

}

export default Line