import moment from "moment";
import { IOrganizationShedule } from "../types/organization/IOrganization";

const sheduleDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]


export const textToOrganizationClosed = (_shedule: IOrganizationShedule) => {
    const {id, ...shedule} = _shedule;
    const currentDate = new Date();
    const currentDay = currentDate.getDay() - 1;
    const {time_from = '', time_to= ''} = shedule[sheduleDays[currentDay] as keyof Omit<IOrganizationShedule, 'id'>];
    const [openedHours, openedMinutes] = time_from.split(':');
    const [closedHours, closedMinutes] = time_to.split(':');
    // if(!(openedHours && openedMinutes && closedHours && closedMinutes)) {
    //     return 'Закрыто';
    // }
    const dateOpened = new Date();
    const dateClosed = new Date();

    if(+openedHours > +closedHours) {
        dateClosed.setDate(dateClosed.getDate() + 1);
    }
    dateOpened.setHours(+openedHours);
    dateOpened.setMinutes(+openedMinutes);

    dateClosed.setHours(+closedHours);
    dateClosed.setMinutes(+closedMinutes);
    
    
    if(moment(currentDate).isBefore(dateOpened)) {
        return `Откроется ${moment(dateOpened).from(currentDate)}`;
    }
    if(moment(currentDate).isBefore(dateClosed)) {
        return `Закроется ${moment(dateClosed).from(currentDate)}`;
    }

    return `Закрыто`;
}


export const isTodayOpen = (_shedule: IOrganizationShedule) => {
    const {id, ...shedule} = _shedule;
    const currentDate = new Date();
    const currentDay = currentDate.getDay() - 1;
    const {time_from = '', time_to= ''} = shedule[sheduleDays[currentDay] as keyof Omit<IOrganizationShedule, 'id'>];
    const [openedHours, openedMinutes] = time_from.split(':');
    const [closedHours, closedMinutes] = time_to.split(':');
    if(!(openedHours && openedMinutes && closedHours && closedMinutes)) {
        return false;
    }
    const dateOpened = new Date();
    const dateClosed = new Date();

    if(+openedHours > +closedHours) {
        dateClosed.setDate(dateClosed.getDate() + 1);
    }
    
    dateOpened.setHours(+openedHours);
    dateOpened.setMinutes(+openedMinutes);

    dateClosed.setHours(+closedHours);
    dateClosed.setMinutes(+closedMinutes);
    
    return moment(currentDate).isBetween(dateOpened, dateClosed)

}