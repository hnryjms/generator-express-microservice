import jwt from 'jsonwebtoken';
import { IJwtPayload, IOnAutherize, IUser } from './security.model';

// verfiy request
export const verifyRequest = (xapiKey: string = null, onAutherize: IOnAutherize = null) => {
    return async (req, res, next) => {
        try {
            // if no parameters please ignore security
            if (!xapiKey && !onAutherize) {
                next();
                return;
            }
            //check apikey and jwt token
            if (req.headers) {
                // verify app key
                let verifyAppKey: boolean = xapiKey ? (req.header('X-API-Key') && req.header('X-API-Key') === xapiKey) : true;
                if (!verifyAppKey) return res.status(401).send('Not Authorized');
                //if no onautherze implimentation
                if (!onAutherize) {
                    next();
                    return;
                }

                // verify jwt
                let authHeader = req.header('Authorization');
                let token;
                if (authHeader.startsWith("Bearer ")) {
                    token = authHeader.substring(7, authHeader.length);
                } else {
                    //Error
                    return res.status(401).send('Not Authorized');
                }
                let decoded = jwt.decode(token);
                //Check if expired
                assertAlive(decoded);

                const tokenPayload: Partial<IJwtPayload> = decoded as IJwtPayload;
                //console.log(tokenPayload);
                let user: IUser = await onAutherize(tokenPayload.BechtelUserName);
                //console.log(user);
                if (user && user.active) {
                    for (let userRole of user.roles) {
                        if (userRole.active)
                            user[`is${userRole.name.substring(0, 1).toUpperCase()}${userRole.name.toLowerCase().substring(1)}`] = true;
                    }
                    req["user"] = user;
                    req["authtoken"] = token;
                    next();
                    return;
                }
            }
            return res.status(401).send('Not Authorized');
        } catch (ex) {
            console.log(`VerifyRequest Authrization Error - ${ex}`);
            return res.status(401).send('Not Authorized');
        }
    };
}

function assertAlive(decoded) {
    const now = Date.now().valueOf() / 1000
    if (typeof decoded.exp !== 'undefined' && decoded.exp < now) {
        throw new Error(`token expired: ${JSON.stringify(decoded)}`)
    }
    if (typeof decoded.nbf !== 'undefined' && decoded.nbf > now) {
        throw new Error(`token not yet valid: ${JSON.stringify(decoded)}`)
    }
}
