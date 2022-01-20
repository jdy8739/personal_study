import * as CryptoJS from 'crypto-js';

interface BlockType {
    index: number,
    hash: string,
    previousHash: string, 
    data: string,
    timestamp: number
}

type CalBlockHash = (index: number, previousHash: string, timestamp: number, data: string) => string

class Block implements BlockType {
    constructor(
        public index: number, 
        public hash: string,
        public previousHash: string, 
        public data: string, 
        public timestamp: number
    ) {

    }
    static calculateBlockHash: CalBlockHash = (index, previousHash, timestamp, data) => {
        return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
    };

    static isValidStructure(aBlock: Block) {
        if(
            typeof aBlock.index === 'number' &&
            typeof aBlock.hash === 'string' &&
            typeof aBlock.previousHash === 'string' &&
            typeof aBlock.timestamp === 'number' &&
            typeof aBlock.data === 'string'
        ) return true;
        else return false;
    };
}

const genesisBlock = new Block(0, '3213123143245426t356', '', 'first-block', 20222314141);

const blockChain: Block[] = [ genesisBlock ];

const getBlockChain = (): Block[] => blockChain;
const getLatestBlock = (): Block => blockChain[blockChain.length - 1];
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);


const createNewBlock = (data: string): Block => {
    const previousBlock: Block = getLatestBlock();
    const newIndex: number = previousBlock.index + 1;
    const newTimeStamp: number = getNewTimeStamp();
    const newHash: string = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimeStamp, data);
    
    const newBlock = new Block(newIndex, newHash, previousBlock.hash, data, newTimeStamp);
    addBlock(newBlock);
    console.log('???');
    return newBlock;
};

const getHashForBlock = (aBlock: Block) :string => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);

const isBlockValid = (candidateBlock: Block, previousBlock: Block) :boolean => {
    if(
        Block.isValidStructure(candidateBlock) &&
        previousBlock.hash === candidateBlock.previousHash &&
        previousBlock.index + 1 === candidateBlock.index &&
        getHashForBlock(candidateBlock) === candidateBlock.hash
    ) return true;
    else return false;
};

const addBlock = (candidateBlock: Block) :void => {
    if(isBlockValid(candidateBlock, getLatestBlock())) {
        blockChain.push(candidateBlock);
    }
};

createNewBlock('second-block');
createNewBlock('third-block');
createNewBlock('fourth-block');
createNewBlock('fifth-block');

console.log(blockChain);
