import type { Core } from '@strapi/strapi';

export default {
  register({ strapi }: { strapi: Core.Strapi }) {
    strapi.db.lifecycles.subscribe(async (event) => {
      const { model, action, result } = event;
      if(event.action === 'afterUpdate') {

        const ct = strapi.contentType(model.uid as any);
        
        if (model.uid === 'api::url-mapper.url-mapper') return;

        // if(!ct) return;

        // if(!ct.attributes.title && !ct.attributes.name) return;

        // if(!result.title && !result.name) return;

        // if(!result.slug) return;

        // if(ct?.kind === 'singleType') {
        //   const title = result.title;
        //   const url = result.slug;
        //   strapi.entityService.create('api::url-mapper.url-mapper', {
        //     data: {
        //       title,
        //       url,
        //       type: 'single',
        //       cid: result.id,
        //       uid: model.uid,
        //     },
        //   });
        // }
                
        if(ct?.kind === 'collectionType') {
          const title = result?.title;
          const url = result?.url;
          console.log('urls==', url)
          const existing = await strapi.db.query('api::url-mapper.url-mapper').findOne({
            where: {
              url,
            },
          })
          console.log('existing==', existing)
          if(existing) return;
          strapi.entityService.create('api::url-mapper.url-mapper', {
            data: {
              title,
              url,
              type: 'collection',
              cid: result?.id,
              uid: model?.uid,
            },
          });
        }

        
      }
    });
  },

  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {},
};
