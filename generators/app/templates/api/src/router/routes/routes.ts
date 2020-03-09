import express from 'express';
import fs from 'fs';
import path from 'path';
import { IAppFeature, IRouteInitClass } from '../../core';
import * as featureDataAccses from '../routes.data-access';

const router = express.Router();

export const initRoutes = async (routesFileName: string) => {
    try {
        let routes: IRouteInitClass = await import(`./${routesFileName}`);
        //validate feature name
        if (!routes.FEATURE_NAME || routes.FEATURE_NAME === "") {
            console.log(`Invalid Feature - ${routes.FEATURE_NAME}`);
            return;
        }
        //validate init implimentation
        if (!routes.init) {
            console.log(`Invalid Feature route init for - ${routes.FEATURE_NAME}`);
            return;
        }
        //build routes
        let appFeature: IAppFeature = await featureDataAccses.getRoutesByFeature(routes.FEATURE_NAME);
        routes.init(router, appFeature);
    }
    catch (ex) {
        console.log(ex);
    }
}

fs.readdirSync(__dirname).forEach(file => {
    if (file.endsWith('.routes.js')) {
        console.log(`route file - ${file}`);
        initRoutes(file);
    }
});

export default router;