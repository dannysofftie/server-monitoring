import * as fp from 'fastify-plugin';
import { join } from 'path';
import { readFileSync } from 'fs';

const conf = readFileSync(join(process.cwd(), 'monitor.json'), 'utf-8');

export interface IConfig {
    // configs here
}

const configs: IConfig = {
    // config variables here
};

export default fp(async (fastify, opts, next) => {
    fastify.decorate('config', configs);
    next();
});
