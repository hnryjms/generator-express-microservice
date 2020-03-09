import { IRole, IUser } from './security.model';

export const authorizeRoute = (autherizedRoles = []) => {
    if (!autherizedRoles || autherizedRoles.length <= 0) {
        return [
            // authorize based on user role
            (req, res, next) => {
                //No roles authentication and authorization successful
                next();
            }
        ];
    }

    if (typeof autherizedRoles === 'string') {
        autherizedRoles = [autherizedRoles];
    }

    return [
        // authorize based on user role
        (req, res, next) => {
            let user: IUser = req.user;
            let unauthorized = res.status(401).json({ message: 'Unauthorized' });
            if (!user) return unauthorized;
            if (autherizedRoles.length && (!user.roles || user.roles.length <= 0 || !user.roles.find((role: IRole) => autherizedRoles.includes(role.name)))) {
                // user's role is not authorized
                return unauthorized;
            }
            // authentication and authorization successful
            next();
        }
    ];
}
