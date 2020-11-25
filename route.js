const http = require("http");
const url = require("url");
const blockchainService = require("./Blockchain/Web");

module.exports = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);
    
    let resp = {
        "success": false,
        "data": null
    }

    if(reqUrl.pathname.toLocaleLowerCase() === "/getlogs" && req.method === "GET"){
        res.statusCode = 200;
        res.setHeader("content-Type", "Application/json");
        const service = new blockchainService();
        resp = {
            "success": true,
            "data": service.transactionLogs
        }
        res.end(JSON.stringify(resp));
    }
    else if(reqUrl.pathname.toLocaleLowerCase() === "/getgroupedlogs" && req.method === "GET"){
        res.statusCode = 200;
        res.setHeader("content-Type", "Application/json");
        const service = new blockchainService();
        resp = {
            "success": true,
            "data": service.groupedTansactionLogs
        }
        return res.end(JSON.stringify(resp));
    }

    res.statusCode = 404;
    res.setHeader("content-Type", "Application/json");
    res.end(JSON.stringify(resp));
});