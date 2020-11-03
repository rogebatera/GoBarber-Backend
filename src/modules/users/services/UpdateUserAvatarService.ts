import User from '@modules/users/infra/typeorm/entities/User';
import uploadConfig from '@config/upload';
import AppError from '@shared/Error/AppError';

import fs from 'fs';
import path from 'path';
import { getRepository } from 'typeorm';

interface Request{
    user_id:string;
    avatarFilename: string;
}

class UpdateUserAvatarService {
    public async execute({user_id, avatarFilename}:Request):Promise<User>{
        const userRepository = getRepository(User);

        const user = await userRepository.findOne(user_id);

        if(!user){
            throw new AppError('Only authentication users can change avatar.', 401);
        }

        if(user.avatar){
            //deletar o avatar se já existir
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if(userAvatarFileExists){
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;

        await userRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;