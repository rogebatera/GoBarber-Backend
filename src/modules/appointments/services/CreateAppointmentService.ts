/**
 * NOS SERVICES É ONDE FICA A REGRA DE NEGOCIO 
 * ONDE VAI UTILIZAR OS REPOSITORIOS E FAZER O MEIO CAMPO.
 */

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

import AppError from '@shared/Error/AppError';

import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';

interface IRequest{
    provider_id: string;
    date: Date;
}

@injectable()
class CreateAppointmentService {

    constructor(
        @inject('AppointmentRepository')
        private appointmentsRepository: IAppointmentsRepository
    ){}

    public async execute({provider_id, date}: IRequest):Promise<Appointment>{

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate
        );
    
        if(findAppointmentInSameDate){
            throw new AppError('This appointment is already booked');
        }

        const appointment = await this.appointmentsRepository.create({
            date: appointmentDate,
            provider_id
        });
        
        return appointment;
    }

}

export default CreateAppointmentService;