const hostname = process.env.hostname || "127.0.0.1";
const port = process.env.PORT || 4000;
const blockchainService = require("./Blockchain/Web");

const app = require("./route.js");

const service = new blockchainService();
service.start();

app.listen(port, hostname, () => {
    console.log(`App running on http://${hostname}:${port}`);
});
