import { ICoreDataAccess, ICoreUseCaseBase } from '..';
/**
 * Inject db
 * Insert data
 */
export const filter:ICoreUseCaseBase = <T>(db: ICoreDataAccess<T>) => {
    return async (expression: any): Promise<T[]> => {
        //validate db has method implementation
        if (!db.filter) throw new Error("Method not implemented.");
        //all good! Hey!
        return db.filter(expression);
    }
}

export default filter;