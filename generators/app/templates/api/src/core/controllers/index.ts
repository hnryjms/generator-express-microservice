import { filter } from './filter.controller';
import { insert } from './insert.controller';
import { update } from './update.controller';
import { remove } from './remove.controller';
import { findbyId } from './find-by-id.controller';

const coreControllers = Object.freeze({
    filter,
    insert,
    update,
    remove,
    findbyId
});

export default coreControllers;
export { filter, findbyId, insert, update, remove };
