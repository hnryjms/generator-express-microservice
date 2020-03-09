import { filter } from './filter-data';
import { insert } from './insert-data';
import { update } from './update-data';
import { remove } from './remove-data';
import { findbyId } from './find-by-id';

const coreUseCases = Object.freeze({
    filter,
    insert,
    update,
    remove,
    findbyId
});

export default coreUseCases;
export { filter, findbyId, insert, update, remove };
