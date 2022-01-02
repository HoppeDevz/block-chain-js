import { SHA256 } from 'crypto-js';
class Block {
    constructor(timestamp, last_hash, hash, data) {
        this.timestamp = timestamp;
        this.last_hash = last_hash;
        this.hash = hash;
        this.data = data;
    }
    printBlock() {
        console.log(`
            Timestamp: ${this.timestamp}
            Last Hash: ${this.last_hash}
            Hash: ${this.hash}
            data: ${this.data}
        `);
    }
    static genesis() {
        const currentDate = new Date();
        const currentTimestamp = currentDate.getTime();
        return new this(currentTimestamp, "GENESIS_LAST_HASH", "GENESIS_HASH", { payload: "GENESIS_PAYLOAD" });
    }
    static genHash(timestamp, lastHash, data) {
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }
    static mineBlock(lastBlock, data) {
        const currentDate = new Date();
        const currentTimestamp = currentDate.getTime();
        const lastHash = lastBlock.hash;
        const hash = this.genHash(currentTimestamp, lastHash, data);
        return new this(currentTimestamp, lastHash, hash, data);
    }
}
export default Block;
//# sourceMappingURL=Block.js.map