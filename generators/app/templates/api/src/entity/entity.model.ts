/**
 * Entity Class for defined <%= entityName%>. Please feel free to replace Entity to relevant context
 */

export interface <%= entityInterface%> {
    id?: string;
    //add additional paramters
}

export class <%= entityClass %> implements <%= entityInterface%> {
    private _id: string;
    get id(): string {
        return this._id;
    };

    /**
     * 
     * @param <%= entityName%> Constructor with input data and validations
     */
    constructor(<%= entityName%>: <%= entityInterface%>) {
        //validate input mandates
        if (!<%= entityName%>) throw Error("Invalid input");
        if (!<%= entityName%>.id || <%= entityName%>.id === '') throw Error("Invalid id input");
        this._id = <%= entityName%>.id;
    }
}

export default <%= entityClass %>;