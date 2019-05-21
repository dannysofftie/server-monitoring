import * as fastify from 'fastify';
import * as cors from 'fastify-cors';
import { IncomingMessage, Server, ServerResponse } from 'http';
import * as sourceMapSupport from 'source-map-support';
import viewroutes from '../routes';

/**
 * Application server instance.
 *
 * @export
 * @class App
 */
export default class App {
    /**
     * Application server instance.
     *
     * @private
     * @type {fastify.FastifyInstance<Server, IncomingMessage, ServerResponse>}
     * @memberof App
     */
    private app: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse>;

    /**
     * Application port number
     *
     * @private
     * @type {string}
     * @memberof App
     */
    private port: any;

    constructor() {
        this.port = process.env.PORT || 3000;
        this.app = fastify();
        this.config();
    }

    /**
     * Application level configurations
     *
     * @private
     * @memberof App
     */
    private config() {
        sourceMapSupport.install();
        this.app.register(cors, {
            origin: true,
            credentials: true,
            preflightContinue: true,
            methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        });

        // @ts-ignore
        this.app.register(viewroutes, { prefix: '/' });
    }

    /**
     * Start application server.
     *
     * @memberof App
     */
    public async start() {
        try {
            await this.app.listen(this.port, '0.0.0.0');
            console.log('Server listening on port', this.app.server.address());
        } catch (err) {
            this.app.log.error(err);
            // process.exit(1);
        }

        process.on('uncaughtException', error => {
            console.error(error);
        });
        process.on('unhandledRejection', error => {
            console.error(error);
        });
    }
}
