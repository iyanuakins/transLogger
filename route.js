const http = require("http");
const url = require("url");
const blockchainService = require("./Blockchain/Web");

module.exports = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);

    if(reqUrl.pathname.toLocaleLowerCase() === "/getlogs" && req.method === "GET"){
        res.statusCode = 200;
        res.setHeader("content-Type", "Application/json");
        const service = new blockchainService();
        let res = {
            "success": true,
            "data": service.transactionLogs
        }
        res.end(JSON.stringify(res));
    }
    else if(reqUrl.pathname.toLocaleLowerCase() === "/getgroupedlogs" && req.method === "GET"){
        res.statusCode = 200;
        res.setHeader("content-Type", "Application/json");
        const service = new blockchainService();
        let res = {
            "success": true,
            "data": service.groupedTansactionLogs
        }
        res.end(JSON.stringify(res));
    }
    else {
        res.statusCode = 404;
        res.setHeader("content-Type", "Application/json");
        let res = {
            "success": false,
            "data": null
        }
        res.end(JSON.stringify(res));
    }
});