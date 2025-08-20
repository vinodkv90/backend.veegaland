/**
 * header service
 */

import { factories } from '@strapi/strapi';
import GetImageUrl from '../../../utils/getImageUrl';
import GetImage from '../../../utils/getImage';

export default factories.createCoreService('api::header.header', ({ strapi }) => ({

    async structure(data) {
        // return data
        return {
            logo: await GetImage(data?.logo),
            menu: data?.menu?.menu_item?.map((item, index) => {
                return {
                    id: index + 1,
                    title: item?.title,
                    url: item?.url,
                    subMenu: item?.sub_menu_item?.map((subItem, subIndex) => {
                        return {
                            id: subIndex + 1,
                            title: subItem?.title,
                            url: subItem?.url,
                            location: subItem?.location ? {
                                id: subItem?.location?.id,
                                title: subItem?.location?.title,
                                apartments: subItem?.location?.apartments?.map((apartment) =>{
                                    return {
                                        id: apartment?.id,
                                        title: apartment?.title,
                                        slug: apartment?.url,
                                    }
                                }) || []
                            } : null
                        }
                    }) || [],
                }
            })
        }
    },

    async find(): Promise<any> {
        const menu = await strapi.query('api::header.header').findOne({
            select:['*'],
            where: {
                publishedAt: {
                    $notNull: true
                }
            },
            populate: {
                logo: true,
                menu: {
                    populate: {
                        menu_item: {
                            populate: {
                                sub_menu_item: {
                                    populate: {
                                        location: {
                                            populate: {
                                                apartments: true
                                            }
                                        }
                                    }
                                }
                            }
                        },
                    },
                },
            },
        });

        return await this.structure(menu);
    }
}));
