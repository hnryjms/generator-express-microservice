/**
 * Core idea of bootstrap is to build Independent layers of entities, controllers and usecases
 */
import { Container } from 'typedi';
import { <%= entityClass %>, <%= entityInterface %> } from '../<%= entityName %>.model';
import { coreUseCases, ICoreUseCases } from '../../core';
import <%= entityClass %>DataAccess from '../<%= entityName %>.data-access';

/**
 * Parser to add additional common functions to usecases
 * @param entity Parser callback for Entity Object
 */
const entityParser = async (<%= entityName %>: <%= entityInterface %>) => {
    return new <%= entityClass %>(<%= entityName %>);
}

//set your dataAccess
let dataAccess = <%= entityClass %>DataAccess; //add any expression to manipulate multiple databases

//bootstrap core usecases with respective dataAccess
export const filter = coreUseCases.filter<<%= entityInterface %>>(Container.get(dataAccess));
export const insert = coreUseCases.insert<<%= entityInterface %>>(Container.get(dataAccess), entityParser);
export const update = coreUseCases.update<<%= entityInterface %>>(Container.get(dataAccess), entityParser);
export const remove = coreUseCases.remove<<%= entityInterface %>>(Container.get(dataAccess));
export const findById = coreUseCases.findbyId<<%= entityInterface %>>(Container.get(dataAccess));

//additional object which would useful to extend core capabilities
export const entityCoreUseCases: ICoreUseCases = {
    filter: filter,
    insert: insert,
    update: update,
    remove: remove,
    findById: findById
}
