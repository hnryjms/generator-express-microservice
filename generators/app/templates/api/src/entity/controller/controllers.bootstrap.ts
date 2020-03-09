/**
 * Core idea of bootstrap is to build Independent layers of entities, controllers and usecases
 */
import * as <%= entityName %>UseCases from '../use-cases';
import { coreControllers } from '../../core';

//bootstrap core controllers with entity usecases
export const filter = coreControllers.filter(<%= entityName %>UseCases.filter);
export const insert = coreControllers.insert(<%= entityName %>UseCases.insert);
export const update = coreControllers.update(<%= entityName %>UseCases.update);
export const remove = coreControllers.remove(<%= entityName %>UseCases.remove);
export const findById = coreControllers.findbyId(<%= entityName %>UseCases.findById);

//additional object which would useful to extend core capabilities
export const entityCoreControllers = {
    filter: filter,
    insert: insert,
    update: update,
    remove: remove,
    findById: findById
}