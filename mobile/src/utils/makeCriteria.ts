import { ICriteria } from '../types/ICriteria';
export function makeCriteria(criteria: ICriteria | undefined) {
    if (!criteria) {
        return {};
    }
    const {filter, sort} = criteria;
    const param: any = {...criteria};
    filter && (param.filter = JSON.stringify(criteria.filter));
    sort && (param.sort = JSON.stringify(criteria.sort));

    return param;
}

