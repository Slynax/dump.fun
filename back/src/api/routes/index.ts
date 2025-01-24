import express from 'express';
import GenerateWallet from './generateWallet';
import RestoreWallet from './restoreWallet';

const ApiEndpoints = express.Router({ mergeParams: true });

ApiEndpoints.get('/generateWallet', GenerateWallet);
ApiEndpoints.post('/restoreWallet', RestoreWallet);
export default ApiEndpoints;
