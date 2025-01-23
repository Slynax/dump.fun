import express from 'express';
import GetHistory from './history';

const ApiEndpoints = express.Router({ mergeParams: true });

ApiEndpoints.get('/history', GetHistory);
export default ApiEndpoints;
