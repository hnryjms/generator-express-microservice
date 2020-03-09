import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { middleware, IOnAutherize, IUser } from './core';
import router from './router';
dotenv.config();

const apiRoot = process.env.DM_API_ROOT || "/api";
const app = express();
app.use(bodyParser.json());

// AUTHERIZE REQUEST
/**
 * If you want to implement autherize request comp use below commented code
      let xapiKey = ""// get key from keyvault/env file
      let onAutherize: IOnAutherize = async (userName: string): Promise<IUser> => {
        //verify username to your data store  
        let user: IUser = (() => { return null })();// check user from valid db
        return user;
      }
      app.use(middleware.security.verifyRequest(xapiKey, onAutherize));
 */

app.use(middleware.security.verifyRequest());


// TODO: figure out autherize.
//app.use(autherize)
app.use('/api', router);


// listen for requests
app.listen(3002, () => {
  console.log('Server is listening on port 3002')
})


export default app;
