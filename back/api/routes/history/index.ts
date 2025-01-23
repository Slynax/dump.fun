import wrapAsync from '@/middlewares/wrapAsync';
import routeId from '@/middlewares/routeId';
import route from './route';
import checkValidator from '@/middlewares/checkValidator';
import validator from './validator';

export default [routeId(1), checkValidator(validator), wrapAsync(route)];

