import {Response, Request } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersControllers{
    public async create(request:Request, response:Response){
        
        const { name, password, email } = request.body;
        
        const createUsers = container.resolve(CreateUserService);

        const user = await createUsers.execute({
            name, 
            email, 
            password
        });

        delete user.password;
    
        return response.json(user);
    }
}