import type { Schema, Struct } from '@strapi/strapi';

export interface MilestonesMedias extends Struct.ComponentSchema {
  collectionName: 'components_milestones_medias';
  info: {
    displayName: 'Medias';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'milestones.medias': MilestonesMedias;
    }
  }
}
