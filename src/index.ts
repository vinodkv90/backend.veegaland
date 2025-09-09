import type { Core } from '@strapi/strapi';

export default {
  register({ strapi }: { strapi: Core.Strapi }) {
    strapi.db.lifecycles.subscribe(async (event) => {
      const { model, action, result } = event;

      if(event.action === 'afterUpdate') {

        const ct = strapi.contentType(model.uid as any);
        
        if (model.uid === 'api::url-mapper.url-mapper') return;

        if(!ct) return;

        if(!result.title) return;

        if(!result.url) return;

        const isPublished = result?.createdBy?.publishedAt;

        console.log('result==', result)

        if(!isPublished) return;

        if(ct?.kind === 'singleType') {
          const title = result.title;
          const url = result.slug;
          strapi.entityService.create('api::url-mapper.url-mapper', {
            data: {
              title,
              url,
              type: 'single',
              cid: result.id,
              uid: model.uid,
            },
          });
        }
                
        if(ct?.kind === 'collectionType') {
          const title = result?.title;
          const url = result?.url;
          const existing = await strapi.db.query('api::url-mapper.url-mapper').findOne({
            where: {
              url,
            },
          })
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
