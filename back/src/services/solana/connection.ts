import {clusterApiUrl, Connection} from "@solana/web3.js";

export let connection: Connection;

export const connectSolana = () => {
    connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
}
