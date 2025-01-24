import express from 'express';
import {initSockets} from "./src/socket";
import cors from 'cors';

import PublicEndpoints from "./src/api";
import {connectSolana} from "./src/services/solana/connection";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/', PublicEndpoints);

const server = app.listen(5001, () => {
    console.log('Server is running on http://localhost:5001');
});

connectSolana();

initSockets({ server });
