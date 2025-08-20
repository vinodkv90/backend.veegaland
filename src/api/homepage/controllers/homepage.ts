/**
 * homepage controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::homepage.homepage',({ strapi }) => ({
    async find(ctx) {
        return await strapi.service('api::homepage.homepage').find(ctx.query);
    }
}));
