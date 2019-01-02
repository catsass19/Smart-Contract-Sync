(self as any).window = self;
const  Web3 = require('web3');
const ctx : Worker = self as any;
ctx.onmessage = (e) => {
  ctx.postMessage({ foo: e.data });
  const dataHandler = new Web3('ws://testnet.dexon.org:8546');
  const { abi, address } = e.data;
  dataHandler.eth
    .subscribe('newBlockHeaders')
    .on('data', async (blockHeader) => {
      // console.log(blockHeader);
      const d = await dataHandler.eth.getBlock(blockHeader.number, true);
      const { transactions } = d;
      transactions.forEach((tx) => {
        console.log(tx.from, tx.to);
        const { from, to, input } = tx;
        if (!from || !to) {
          return;
        }
        // ctx.postMessage({ from, to });
        // if (
        //   (from.toLowerCase() === CONTRACT) ||
        //   (to.toLocaleLowerCase() === CONTRACT)
        // ) {
        //   console.log(`CHAT: from ${from} to ${to}`);
        //   // console.log(input);
        //   const t = decoder.decodeData(input);
        //   console.log(t);
        // }
      });
    });
};
