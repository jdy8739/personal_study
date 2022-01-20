"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CryptoJS = require("crypto-js");
var Block = /** @class */ (function () {
    function Block(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
    Block.isValidStructure = function (aBlock) {
        if (typeof aBlock.index === 'number' &&
            typeof aBlock.hash === 'string' &&
            typeof aBlock.previousHash === 'string' &&
            typeof aBlock.timestamp === 'number' &&
            typeof aBlock.data === 'string')
            return true;
        else
            return false;
    };
    ;
    Block.calculateBlockHash = function (index, previousHash, timestamp, data) {
        return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
    };
    return Block;
}());
var genesisBlock = new Block(0, '3213123143245426t356', '', 'first-block', 20222314141);
var blockChain = [genesisBlock];
var getBlockChain = function () { return blockChain; };
var getLatestBlock = function () { return blockChain[blockChain.length - 1]; };
var getNewTimeStamp = function () { return Math.round(new Date().getTime() / 1000); };
var createNewBlock = function (data) {
    var previousBlock = getLatestBlock();
    var newIndex = previousBlock.index + 1;
    var newTimeStamp = getNewTimeStamp();
    var newHash = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimeStamp, data);
    var newBlock = new Block(newIndex, newHash, previousBlock.hash, data, newTimeStamp);
    addBlock(newBlock);
    console.log('???');
    return newBlock;
};
var getHashForBlock = function (aBlock) { return Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data); };
var isBlockValid = function (candidateBlock, previousBlock) {
    if (Block.isValidStructure(candidateBlock) &&
        previousBlock.hash === candidateBlock.previousHash &&
        previousBlock.index + 1 === candidateBlock.index &&
        getHashForBlock(candidateBlock) === candidateBlock.hash)
        return true;
    else
        return false;
};
var addBlock = function (candidateBlock) {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockChain.push(candidateBlock);
    }
};
createNewBlock('second-block');
createNewBlock('third-block');
createNewBlock('fourth-block');
createNewBlock('fifth-block');
console.log(blockChain);
//# sourceMappingURL=index.js.map