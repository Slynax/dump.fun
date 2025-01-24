import wrapAsync from '../../../middlewares/wrapAsync';
import route from './route';

export default [wrapAsync(route)];

