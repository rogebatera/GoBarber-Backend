import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointentsRepository';
import AppError from '@shared/Error/AppError';

import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

/**
 * NOS SERVICES É ONDE FICA A REGRA DE NEGOCIO 
 * ONDE VAI UTILIZAR OS REPOSITORIOS E FAZER O MEIO CAMPO.
 */

interface Request{
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {

    public async execute({provider_id, date}: Request):Promise<Appointment>{

        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(
            appointmentDate
        );
    
        if(findAppointmentInSameDate){
            throw new AppError('This appointment is already booked');
        }

        const appointment = appointmentsRepository.create({
            date: appointmentDate,
            provider_id
        });

        await appointmentsRepository.save(appointment);
        
        return appointment;
    }

}

export default CreateAppointmentService;