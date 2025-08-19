/**
 * header service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::header.header', ({ strapi }) => ({
    async find(): Promise<any> {
        const menu = await strapi.query('api::header.header').findOne({
            select:['*'],
            where: {},
            populate: {
                logo: true,
                menu: {
                    populate: {
                        menu_item: true,
                        projects: {
                            button: true,
                            populate: {
                                locations: true
                            }
                        }
                    },
                },
            },
        });
    }
}));
