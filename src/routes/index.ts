import { FastifyInstance, FastifyRequest, DefaultQuery, DefaultParams, DefaultHeaders, FastifyReply } from 'fastify';

/**
 * Instance definition for every view route defined in the application.
 *
 * @export
 * @interface IViewRoutes
 */
export interface IViewRoutes {
    path: string;
    view: string;
    middleware?: () => void;
    locals?: (req: FastifyRequest<{}, DefaultQuery, DefaultParams, DefaultHeaders, any>, res: FastifyReply<{}>) => any[];
}

const routes: IViewRoutes[] = [
    {
        path: '/',
        view: 'index',
    },
];

export default (app: FastifyInstance<{}, {}, {}>, opts: {}, next: (err?: Error) => void) => {
    // add routes here
    // pass to the next middleware
    next();
};
