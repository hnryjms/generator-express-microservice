import { ICoreDataAccess } from '..';
/**
 * Inject db
 * Insert data
 */
export const update = <T>(db: ICoreDataAccess<T>, entityParser: (data: T) => {}) => {
    return async (id: string, data: T) => {
        //validate object
        let entity: any = entityParser(data);

        //validate db has method implementation
        if (!db.findById || !db.update) throw new Error("Method not implemented.");

        //if record exisits
        const exists = db.findById(entity.id);
        //banggg!!
        if (!exists) {
            throw new Error("No data found");
        }

        //all good! Hey!
        return db.update(id, entity);
    }
}

export default update;