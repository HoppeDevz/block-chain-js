import BlockT from '../@types/Block';
import BlockData from '../@types/BlockData';
import Block from './Block';

class BlockChain {  

    private chain: Array<BlockT>; 

    constructor() {

        this.chain = [Block.genesis()];
    }

    public getLastBlock() {
        
        return this.chain[this.chain.length - 1] || Block.genesis();
    }

    public addBlock(data: BlockData) {

        const lastBlock = this.getLastBlock();
        const newBlock = Block.mineBlock(lastBlock, data);
        
        this.chain.push(newBlock);

        return newBlock;
    }

    public isValidChain(chain: Array<BlockT>) {

        const isValidGenesis = JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis());
        
        if (!isValidGenesis) return false;

        for (let [key, block] of chain.entries()) {


            if (key > 0) {


                const lastBlock = chain[key - 1];

                const lastHashIsValid = block.last_hash !== lastBlock?.hash;
                const hashIsValid = block.hash !== Block.genHash(block.timestamp, block.last_hash, block.data);

                if ( !lastHashIsValid || !hashIsValid ) return false;
            }
        }

        return true;
    }

    public replaceChain(newChain: Array<BlockT>, callBack?: (err?: string) => void) {

        if (newChain.length <= this.chain.length) {

            callBack ? callBack("new chain is not longer than the current chain!") : null;
            return;
        }

        if (!this.isValidChain(newChain)) {

            callBack ? callBack("new chain is not valid chain!") : null;
            return;
        }

        this.chain = newChain;
        callBack ? callBack() : null;
    }
}

export default BlockChain;