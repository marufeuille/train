/*********************************************************/
/* Name: train.ts / train.js                             */
/* Description:                                          */
/*   this scripts processing yahoo.co.jp                 */
/*********************************************************/
var client = require("cheerio-httpcli");
function getTrainData(url) {
    if (url == "") {
        return "";
    }
    var result = "";
    result = client.fetchSync(url);
    var title = result.$("title").text().split("-")[0].split("の運行情報")[0];
    var status = result.$("#mdServiceStatus dt").text().slice(3);
    return title + "," + status;
}
exports.getTrainData = getTrainData;
