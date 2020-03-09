import { ICoreDataAccess, ICoreUseCaseBase } from '..';
/**
 * Inject db
 * Insert data
 */
export const findbyId: ICoreUseCaseBase = <T>(db: ICoreDataAccess<T>) => {
    return async (id: string): Promise<T> => {
        //is valid id
        if (!id || id === "") throw new Error("invalid id");

        //validate db has method implementation
        if (!db.findById) throw new Error("Method not implemented.");

        //all good! Hey!
        return db.findById(id);
    }
}

export default findbyId;