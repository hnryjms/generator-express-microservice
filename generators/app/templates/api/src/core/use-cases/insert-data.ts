import { ICoreDataAccess, ICoreUseCaseBase } from '..';
/**
 * Inject db
 * Insert data
 */
export const insert: ICoreUseCaseBase = <T>(db: ICoreDataAccess<T>, entityParser: (data: T) => {}) => {
    return async (data: T): Promise<T> => {
        //validate object
        let entity: any = entityParser(data);

        //validate db has method implementation
        if (!db.findById || !db.insert) throw new Error("Method not implemented.");
        
        //if record exisits
        const exists = db.findById(entity.id);
        //banggg!
        if (exists) {
            throw new Error("Record already existed!");
        }

        //all good! Hey!
        return db.insert(entity);
    }
}

export default insert;