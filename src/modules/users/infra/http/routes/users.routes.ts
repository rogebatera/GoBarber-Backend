import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersControllers from '../controllers/UsersControllers';
import UserAvatarControllers from '../controllers/UserAvatarControllers';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersControllers = new UsersControllers();
const userAvatarControllers = new UserAvatarControllers();

usersRouter.post('/', usersControllers.create);

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarControllers.update);

export default usersRouter;