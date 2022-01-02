import BlockData from './BlockData';

type Block = {
    timestamp: number,
    last_hash: string,
    hash: string,
    data: BlockData
}

export default Block