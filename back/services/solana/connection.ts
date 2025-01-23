import {clusterApiUrl, Connection} from "@solana/web3.js";

export let connection: Connection | null = null;

export const connectSolana = () => {
    connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
}

export const disconnectSolana = () => {
    connection = null;
}
