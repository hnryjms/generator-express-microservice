import express, { Router } from 'express';
import { IAppFeature, IRoute } from './routes.model';
import { authorizeRoute } from '../middleware/security'
const routes = express.Router();

export const buildRoutes = async (userRouteConfig: IAppFeature, controller): Promise<Router> => {
    //If available and active
    if (userRouteConfig && userRouteConfig.active) {
        let featureName = userRouteConfig.name;
        //Check routes for User feature
        for (let userRoute of userRouteConfig.routes) {
            //If active && htto METHID GET/PUT/POST && Controller function
            if (userRoute.active &&
                routes[userRoute.method.toLowerCase()] &&
                controller[userRoute.name]) {
                let endpoint = userRouteConfig.end_point + userRoute.url_params;
                //console.log(`endpoint - ${endpoint}`)
                routes[userRoute.method.toLowerCase()](endpoint, authorizeRoute(userRoute.roles), controller[userRoute.name]);
            }
            else if(userRoute.active) {
                console.log(`${((routes[userRoute.method.toLowerCase()]) ? '' : featureName + ' feature  invalid Route method name for ' + userRoute.method) + ' ' +
                    ((controller[userRoute.name]) ? '' : featureName + '  invalid controller method name for ' + userRoute.name)}`);
            }
        }
    }
    return routes;
}