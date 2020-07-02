import { Request, Response} from 'express';
import createUser from './services/createUser'; // Import the service

export function myRoute(req: Request, res: Response) {
    const user = createUser({
        name: 'Mateus',
        email: 'mateus@gmail.com',
        password: '123123',
        techs: [
            'Node.JS',
            'React.JS',
            'React Native',
            { title: 'JavaScript', experience: 100 }
            //May receive string or object 
        ]
    });

    return res.json({message:'Hello server'});
}