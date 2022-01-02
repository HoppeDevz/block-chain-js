import { SHA256 } from 'crypto-js';

import BlockData from '../@types/BlockData';
import BlockT from '../@types/Block';

class Block {

    public timestamp: number;
    public last_hash: string;
    public hash: string;
    public data: BlockData;

    constructor(timestamp: number, last_hash: string, hash: string, data: BlockData) {

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
        `)
    }

    static genesis() {

        const currentDate = new Date();
        const currentTimestamp = currentDate.getTime();

        return new this(currentTimestamp, "GENESIS_LAST_HASH", "GENESIS_HASH", { payload: "GENESIS_PAYLOAD" });
    }

    static genHash(timestamp: number, lastHash: string, data: BlockData) {

        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }

    static mineBlock(lastBlock: BlockT, data: BlockData) {

        const currentDate = new Date();
        const currentTimestamp = currentDate.getTime();

        const lastHash = lastBlock.hash;
        const hash = this.genHash(currentTimestamp, lastHash, data);

        return new this(currentTimestamp, lastHash, hash, data);
    }
}

export default Block;