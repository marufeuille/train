/*********************************************************/
/* Name: train.ts / train.js                             */
/* Description:                                          */
/*   this scripts processing yahoo.co.jp                 */
/*********************************************************/

let client = require("cheerio-httpcli");

function getTrainData(url: String): String{

    if (url == "") {
        return "";
    }

    let result: any = "";

    result = client.fetchSync(url);
    let title:String = result.$("title").text().split("-")[0].split("の運行情報")[0];
    let status: String = result.$("#mdServiceStatus dt").text().slice(3);
    return title + "," + status;

}

exports.getTrainData = getTrainData