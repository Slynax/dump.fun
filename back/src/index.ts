import express from 'express';
import {initSockets} from "./socket";
import cors from 'cors';

import PublicEndpoints from "./api";
import {connectSolana} from "./services/solana/connection";
import {initialize, listener, subscribeToEvent} from "./services/solana/listener";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/', PublicEndpoints);

(async () => {
    connectSolana();
    console.log('Start')
    await listener();
    console.log('1');
    const server = app.listen(5001, () => {
        console.log('Server is running on http://localhost:5001');
    });
    console.log('HDUYZGHIUD')
    initSockets({ server });
})();

