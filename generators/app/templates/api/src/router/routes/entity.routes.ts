import { routeUtils, IAppFeature, IRouteInitClass } from '../../core';
import { controller } from '../../<%= entityName %>';

const FEATURE_NAME = "<%= entityClass %>";

const init = async (router, <%= entityName %>AppFeature: IAppFeature = <%= entityName %>DefaultAppfeature) => {
    try {
        if(!<%= entityName %>AppFeature) <%= entityName %>AppFeature = <%= entityName %>DefaultAppfeature;
        routeUtils.buildRoutes(<%= entityName %>AppFeature, controller).then(<%= entityName %>Routes => router.use('', <%= entityName %>Routes));
    } catch (ex) {
        console.log(`<%= entityClass %> Routes Init Error - ${ex}`);
    }
}

export { FEATURE_NAME, init };
/**
 * *********** temporary solution - please move these rotes to DB ****
 */
const <%= entityName %>DefaultAppfeature: IAppFeature =
{
    created_by: "SYSTEM",
    updated_by: "SYSTEM",
    name: "<%= entityClass %>",
    description: "<%= entityName %>",
    end_point: "/<%= entityName %>",
    routes: [
        {
            roles: [
            ],
            created_by: "SYSTEM",
            updated_by: "SYSTEM",
            created_on: new Date("<%= dateTime %>"),
            updated_on: new Date("<%= dateTime %>"),
            name: "findById",
            description: "Get list of <%= entityName %>'s by id",
            method: "GET",
            url_params: "/:id",
            active: true
        },
        {
            roles: [],
            created_by: "SYSTEM",
            updated_by: "SYSTEM",
            created_on: new Date("<%= dateTime %>"),
            updated_on: new Date("<%= dateTime %>"),
            name: "filter",
            description: "get all <%= entityName %>s",
            method: "GET",
            url_params: "/",
            active: true
        },
        {
            roles: [
            ],
            created_by: "SYSTEM",
            updated_by: "SYSTEM",
            created_on: new Date("<%= dateTime %>"),
            updated_on: new Date("<%= dateTime %>"),
            name: "insert",
            description: "post new <%= entityName %>",
            method: "POST",
            url_params: "/",
            active: true
        },
        {
            roles: [
            ],
            created_by: "SYSTEM",
            updated_by: "SYSTEM",
            created_on: new Date("<%= dateTime %>"),
            updated_on: new Date("<%= dateTime %>"),
            name: "update",
            description: "update <%= entityName %>",
            method: "PUT",
            url_params: "/:id",
            active: true
        },
        {
            roles: [
            ],
            created_by: "SYSTEM",
            updated_by: "SYSTEM",
            created_on: new Date("<%= dateTime %>"),
            updated_on: new Date("<%= dateTime %>"),
            name: "remove",
            description: "remove <%= entityName %>",
            method: "DELETE",
            url_params: "/:id",
            active: true
        }
    ],
    active: true,
    created_on: new Date("2019-08-05T14:33:23.113Z"),
    updated_on: new Date("2019-08-05T14:33:23.113Z")
}