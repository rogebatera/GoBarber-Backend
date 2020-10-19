import Appointment from '../models/Appointment';
import { startOfHour } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointentsRepository';

interface Request{
    provider: string;
    date: Date;
}

/**
 * NOS SERVICES É ONDE FICA A REGRA DE NEGOCIO 
 * ONDE VAI UTILIZAR OS REPOSITORIOS E FAZER O MEIO CAMPO.
 */

class CreateAppointmentService {

    private appointmentsRepository:AppointmentsRepository;

    constructor(appointmentRepository:AppointmentsRepository){
        this.appointmentsRepository = appointmentRepository;
    }

    public execute({provider, date}: Request): Appointment{

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
            appointmentDate
        );
    
        if(findAppointmentInSameDate){
            throw Error('This appointment is already booked');
        }

        const appointment = this.appointmentsRepository.create({
            date: appointmentDate,
            provider
        });
        
        return appointment;
    }
}

export default CreateAppointmentService;