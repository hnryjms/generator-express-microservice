import { Service } from "typedi";
import { <%= entityInterface %> } from './<%= entityName %>.model';
import { DataAccess } from '../db'
@Service()
export default class <%= entityClass %>DataAccess extends DataAccess<<%= entityInterface %>> {
    constructor() {
        super("<%= entityCollectionName %>");//provide <%= entityName %> collection name       
    }
}

export { <%= entityClass %>DataAccess };