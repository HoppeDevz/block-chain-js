import Block from './Block';
class BlockChain {
    constructor() {
        this.chain = [Block.genesis()];
    }
    getLastBlock() {
        return this.chain[this.chain.length - 1] || Block.genesis();
    }
    addBlock(data) {
        const lastBlock = this.getLastBlock();
        const newBlock = Block.mineBlock(lastBlock, data);
        return newBlock;
    }
}
export default BlockChain;
//# sourceMappingURL=BlockChain.js.map