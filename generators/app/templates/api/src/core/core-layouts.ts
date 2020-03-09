export interface IFindById<T> {
    (id: string): Promise<T>
}

export interface IFilter<T> {
    (expression: any): Promise<T[]>
}

export interface IInsert<T> {
    (data: T): Promise<T>
}

export interface IInsertMany<T> {
    (data: T[]): Promise<T[]>
}

export interface IUpdate<T> {
    (id:string, data: T): Promise<T>
}

export interface IUpdateAll<T> {
    (data: T[]): Promise<T[]>
}

export interface IRemove<T> {
    (id: string): Promise<number>
}

export interface ICoreDataAccess<T = any> {
    findById: IFindById<T>,
    filter: IFilter<T>,
    insert: IInsert<T>,
    update: IUpdate<T>,
    remove: IRemove<T>,
    updateAll?: IUpdateAll<T>,
    insertMany?: IInsertMany<T>,
}

export interface ICoreUseCases<T = any> extends ICoreDataAccess {
}

export interface ICoreUseCaseBase<T = any> {
    <T>(db: ICoreDataAccess<T>, ...parsers: any): any
}

export interface IControllerMethod{
    (req: any,res: any):any;
}