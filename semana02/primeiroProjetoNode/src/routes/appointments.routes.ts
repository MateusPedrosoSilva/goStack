import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/appointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (req, res)=>{
    return res.status(200).json(appointmentRepository.all());
})

appointmentsRouter.post('/', (req, res) => {
    try {
        const { provider, date } = req.body;

        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService(appointmentRepository);

        const appointment = createAppointment.execute({provider, date: parsedDate});

        return res.status(200).json(appointment);
    } catch(err){
        return res.status(400).json({ error: err.message });
    }
});

export default appointmentsRouter;