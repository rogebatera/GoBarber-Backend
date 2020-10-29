import Appointment from "../models/Appointment";
import { EntityRepository, Repository } from 'typeorm';

/**
 * ONDE FICA AS FUNCOES DO AGENDAMENTO
 * COMO CRIAÇAO ATUALIZAÇÃO E ETC
 */

 @EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment>{

    public async findByDate(date: Date): Promise<Appointment | null>{

        const findAppointment = await this.findOne({
            where: { date }
        });

        return findAppointment || null;
    }

}

export default AppointmentsRepository;