/**
 * homepage service
 */

import { factories } from '@strapi/strapi';
import GetWidgetsData from '../../../utils/getWidgetsData';
import { title } from 'process';

export default factories.createCoreService('api::homepage.homepage', ({ strapi}) => ({
    async find(ctx): Promise<any> {
        const homepage = await strapi.query('api::homepage.homepage').findOne({
            select: ['*'],
            where: {
                publishedAt: {
                    $notNull: true
                }
            },
            populate: {
                widgets: {
                    populate: {
                        image: true,
                        logo: true,
                        button: true,
                        krera: true,
                        whatsapp: true,
                        section: {
                            populate: {
                                image: true,
                                logo: true,
                                button: true,
                                krera: true,
                                whatsapp: true,
                            }
                        },
                        description: true,
                        handovers: {
                            populate: {
                                images: {
                                    populate: {
                                        image: true
                                    }
                                }
                            }
                        },
                        testimonials: true,
                    }
                }
            }
        });

        const widgetData =  await GetWidgetsData(homepage);

        return {
            title: homepage?.title,
            url: homepage?.url,
            widges: widgetData,
        }

    }
}));
