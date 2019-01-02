// import Web3 from 'web3';
// import Chat from './Chat.json';
const rawSource : string = require('../dist/worker/work.js');
const Chat = require('./Chat.json');

declare const window : any;

console.log(typeof rawSource);

const blob = new Blob(
  [rawSource],
  { type: 'text/javascript' }
);
const fileSource = (window).URL.createObjectURL(blob);
console.log(fileSource);
const worker = new Worker(fileSource);
const { abi, networks } = Chat;
// console.log(abi, networks);
// // console.log(Web3);

// const worker = new Worker('/dist/worker/work.js');

worker.onmessage = (e) => {
  console.log(e.data);
};

worker.postMessage({
  address: networks['238'].address,
  abi,
});
