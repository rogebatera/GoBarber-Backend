import { Router } from 'express';

import SessionsControllers from '../controllers/SessionsControllers';

const sessionRouter = Router();
const sessionsControllers = new SessionsControllers();

sessionRouter.post('/', sessionsControllers.create);

export default sessionRouter;