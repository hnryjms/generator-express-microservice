import { ICoreDataAccess, ICoreUseCaseBase } from '..';
/**
 * Inject db
 * Insert data
 */
export const remove = <T>(db: ICoreDataAccess<T>) => {
    return async (id: string):Promise<number> => {
        //check for valid id
        if(!id || id==="") throw new Error("invalid id");

        //validate db has method implementation
        if (!db.findById || !db.remove) throw new Error("Method not implemented.");

        const exists = db.findById(id);
        if (!exists) {
            throw new Error("No data found");
        }
        //all good! Hey!
        return db.remove(id);
    }
}

export default remove;