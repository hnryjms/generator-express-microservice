import { ICoreDataAccess } from '../core';
import db from './db';

export class DataAccess<T> implements ICoreDataAccess<T> {
    public db: any;
    // constructor
    constructor(public collectionName: string) {
        this.db = db;
    }
    async findById(id: string): Promise<T> {
        throw new Error("Method not implemented.");
    }
    async filter(expression: T): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
    async insert(data: T): Promise<T> {
        throw new Error("Method not implemented.");
    }
    async insertMany(data: T[]): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
    async update(id: string, data: T): Promise<T> {
        throw new Error("Method not implemented.");
    }
    async updateAll(data: T[]): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
    async remove(id: string): Promise<number> {
        throw new Error("Method not implemented.");
    }
};

export default DataAccess;