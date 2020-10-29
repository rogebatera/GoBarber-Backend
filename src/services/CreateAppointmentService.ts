import Appointment from '../models/Appointment';
import { startOfHour } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointentsRepository';
import { getCustomRepository } from 'typeorm';

/**
 * NOS SERVICES É ONDE FICA A REGRA DE NEGOCIO 
 * ONDE VAI UTILIZAR OS REPOSITORIOS E FAZER O MEIO CAMPO.
 */

interface Request{
    provider: string;
    date: Date;
}

class CreateAppointmentService {

    public async execute({provider, date}: Request):Promise<Appointment>{

        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(
            appointmentDate
        );
    
        if(findAppointmentInSameDate){
            throw Error('This appointment is already booked');
        }

        const appointment = appointmentsRepository.create({
            date: appointmentDate,
            provider
        });

        await appointmentsRepository.save(appointment);
        
        return appointment;
    }

}

export default CreateAppointmentService;