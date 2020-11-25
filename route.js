const http = require("http");
const url = require("url");
const blockchainService = require("./Blockchain/Web");

module.exports = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);
    res.setHeader("content-Type", "Application/json");
    
    let resp = {
        "success": false,
        "data": null
    }

    if(reqUrl.pathname.toLocaleLowerCase() === "/getlogs" && req.method === "GET"){
        res.statusCode = 200;
        const service = new blockchainService();
        resp = {
            "success": true,
            "data": service.transactionLogs  || []
        }
        res.end(JSON.stringify(resp));
    }
    else if(reqUrl.pathname.toLocaleLowerCase() === "/getgroupedlogs" && req.method === "GET"){
        res.statusCode = 200;
        const service = new blockchainService();
        resp = {
            "success": true,
            "data": service.groupedTransactionLogs || []
        }
        res.end(JSON.stringify(resp));
    }

    res.statusCode = 404;
    res.end(JSON.stringify(resp));
});