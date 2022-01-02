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
        
        return newBlock;
    }
}

export default BlockChain;