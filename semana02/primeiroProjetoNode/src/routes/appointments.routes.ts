import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/appointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import { getCustomRepository } from 'typeorm';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (req, res)=>{
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();
    return res.status(200).json(appointments);
})

appointmentsRouter.post('/', async  (req, res) => {
    try {
        const { provider, date } = req.body;
        
        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService();

        const appointment = await createAppointment.execute({provider, date: parsedDate});

        return res.status(200).json(appointment);
    } catch(err){
        return res.status(400).json({ error: err.message });
    }
});

export default appointmentsRouter;