const Web3 = require("web3");
const config = require("./config");
const inputDataDecoder = require("ethereum-input-data-decoder");

module.exports = class Contract {

    web3 = new Web3(new Web3.providers.WebsocketProvider(config.infuraEndpoint))
    static logs = [];
    contract;
    constructor() {};


    start() {
        this.contract = new this.web3.eth.Contract(
            config.ABI, config.contractAddress,
            (err, res) => err && console.log(err)
        );
        this.tokenTransfers();
    }


    get transactionLogs(){
      return Contract.logs; 
    }


    get groupedTransactionLogs(){
        return Contract.logs.reduce((acc, curr) => {
          let {from, to } = curr;
          if (!acc.hasOwnProperty(from))  acc[from] = [];
          if (!acc.hasOwnProperty(to))  acc[to] = [];

          acc[from].push(curr);
          acc[to].push(curr);
          return acc;
      },{}) 
    }


    tokenTransfers() {
        const options = {
          fromBlock: 'latest'
        }
      
        this.contract.events.Transfer(options, async (err, event) => {
          if (err) {
            console.log(err);

            return;
          }
          console.log(`New transaction ${event.transactionHash}`);
          
          await this.getTransactionDetails(event.transactionHash);
      
          return;
        });
    }


    async getTransactionDetails(transactionHash) {
        try {

            const transaction = await this.web3.eth.getTransaction(transactionHash);
            const decoder = new inputDataDecoder(config.ABI);
            let data = decoder.decodeData(transaction.input);
            
            transaction && Contract.logs.push({...transaction, "amount": `${data["inputs"][1]/1e18}`});
        }
        catch (err) {
          console.log(err);
        };
    }
  }