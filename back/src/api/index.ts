import express from 'express';
import PublicRoutes from './routes'

const PublicEndpoints = express.Router({ mergeParams: true });

PublicEndpoints.use('/api', PublicRoutes);
export default PublicEndpoints;
