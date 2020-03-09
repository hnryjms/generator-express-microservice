
export interface IAppFeature {
    name?: string,
    description?: string,
    end_point?: string,
    routes?: IRoute[],
    active: Boolean,
    created_on?: Date,
    created_by?: string,
    updated_on?: Date,
    updated_by?: string
}

export interface IRoute {
    name: string,
    description?: string,
    method?: string,
    url_params?: string,
    roles?: string[],
    active?: boolean,
    created_on?: Date,
    created_by?: string,
    updated_on?: Date,
    updated_by?: string
}

export interface IRouteInitClass {
    FEATURE_NAME: string,
    init: (router: any, entityAppFeature: IAppFeature) => {};
}