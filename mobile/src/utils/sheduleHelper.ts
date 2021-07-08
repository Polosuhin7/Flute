import I18n from "i18n-js";
import moment from "moment";
import { IOrganizationShedule } from "../types/organization/IOrganization";

const sheduleDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];


export const isToday = (day: typeof sheduleDays[number]) => {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    return sheduleDays[currentDay] === day;
}
export const textToOrganizationClosed = (_shedule: IOrganizationShedule) => {
    const {id, ...shedule} = _shedule || {};
    if(!Object.keys(shedule).length) {
        return I18n.t('Unknown');
    }
    const currentDate = new Date();
    const currentDay = shedule?.[sheduleDays?.[currentDate.getDay()] as keyof Omit<IOrganizationShedule, 'id'>];

    if(!currentDay) {
        return I18n.t('Unknown');
    }
    const {time_from = '', time_to= ''} = currentDay;
    const [openedHours, openedMinutes] = time_from.split(':');
    const [closedHours, closedMinutes] = time_to.split(':');

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
        return `${I18n.t('Opened from')} ${moment(dateOpened).from(currentDate)}`;
    }
    if(moment(currentDate).isBefore(dateClosed)) {
        return `${I18n.t('Closed from')} ${moment(dateClosed).from(currentDate)}`;
    }

    return I18n.t('Closed');
}


export const isTodayOpen = (_shedule: IOrganizationShedule) => {
    const {id, ...shedule} = _shedule || {};
    if(!Object.keys(shedule).length) {
        return false
    }
    const currentDate = new Date();
    const currentDay = shedule[sheduleDays[currentDate.getDay()] as keyof Omit<IOrganizationShedule, 'id'>];

    const {time_from = '', time_to= ''} = currentDay || {};
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