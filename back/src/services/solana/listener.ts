import WebSocket from 'ws';
import {emitSocket} from "../../socket/emitSocket";
import {SocketActionLabel} from "../../socket/types";
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import bs58 from "bs58";
import { connection } from "./connection";

let ws: WebSocket;

let addressToId: { [key: string]: string } = {

};

function extractTokenTransferInfo(logs: string[]) {
    let senderKey = "";
    let mint = "";
    let tokenAmount = 0;

    for (const log of logs) {
        if (log.includes("Transfer")) {
            const match = log.match(/Transfer (\d+) tokens from (.*?) to (.*?)$/);
            if (match) {
                tokenAmount = parseInt(match[1]);
                senderKey = match[2];
                mint = match[3]; // Sometimes the mint is included
                break;
            }
        }
    }

    return { senderKey, mint, tokenAmount };
}

export const initialize = () => {
    return new Promise((resolve, reject) => {
        if (ws) {
            return resolve(null);
        }
        ws = new WebSocket('wss://mainnet.helius-rpc.com/?api-key=2ceda920-bc66-4b8b-bad8-942311a3731d');
        ws.on('open', function open() {
            console.log('WebSocket is open');
            resolve(null);
        });
    });
}

export const subscribeToEvent = ({programId}: {programId: string}) => {
    const request = {
        jsonrpc: "2.0",
        id: 1,
        method: "logsSubscribe",
        params: [
            {
                mentions: [programId]
            },
            {
                commitment: "confirmed"
            }
        ]
    };

    ws.send(JSON.stringify(request));

    ws.once('message', (data: string) => {
        if (Object.values(addressToId).includes(programId)) return;
        const parsedData = JSON.parse(data);
        addressToId[parsedData.result] = programId;
    });
}

export const unsubscribeToken = ({key}: {key: string}) => {
    const request = {
        jsonrpc: "2.0",
        id: 1,
        method: "unsubscribeTokenTrade",
        keys: [
            key
        ]
    };

    ws.send(JSON.stringify(request));

}

export const listener = async () => {
    if (!ws) {
        await initialize();
    }

    ws.on('message', async (data: string) => {
        const parsedData = JSON.parse(data);
        const receiveTime = Date.now();

        if (!parsedData?.params?.subscription){
            return;
        }

        const mint = addressToId[parsedData.params.subscription];

        if (parsedData.method !== 'logsNotification' || !mint) return;

        const logDetails = parsedData.params.result;
        const signature = logDetails.value.signature;
        const logs = logDetails.value.logs || [];

        let obj: any = {
            signature,
            time: receiveTime,
            rawLogs: logs,
            mint,
        };

        emitSocket({
            channel: mint,
            action: SocketActionLabel.CANDLE_UPDATE,
            data: JSON.stringify(obj),
        });
    });

    ws.on('error', function error(err) {
        console.error('WebSocket error:', err);
    });

    ws.on('close', function close() {
        console.log('WebSocket connection closed');
    });
}
