import type { Schema, Struct } from '@strapi/strapi';

export interface ApartmentFeatured extends Struct.ComponentSchema {
  collectionName: 'components_apartment_featureds';
  info: {
    displayName: 'Featured';
  };
  attributes: {
    section: Schema.Attribute.Component<'apartment.section', true>;
  };
}

export interface ApartmentSection extends Struct.ComponentSchema {
  collectionName: 'components_apartment_sections';
  info: {
    displayName: 'Section';
  };
  attributes: {
    apartment_status: Schema.Attribute.Enumeration<
      ['new launch', 'on going', 'sample ready']
    >;
    button: Schema.Attribute.Component<'common.button', false>;
    description: Schema.Attribute.Text;
    floor: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    krera: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
    whatsapp: Schema.Attribute.Component<'common.button', false>;
  };
}

export interface ApartmentStatus extends Struct.ComponentSchema {
  collectionName: 'components_apartment_statuses';
  info: {
    displayName: 'Status';
  };
  attributes: {
    apartment_status: Schema.Attribute.Enumeration<
      ['on going', 'sample ready', 'new launch']
    >;
  };
}

export interface CommonButton extends Struct.ComponentSchema {
  collectionName: 'components_common_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    external: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface CommonDescription extends Struct.ComponentSchema {
  collectionName: 'components_common_descriptions';
  info: {
    displayName: 'Description';
  };
  attributes: {
    description: Schema.Attribute.Text;
  };
}

export interface HeaderMainMenu extends Struct.ComponentSchema {
  collectionName: 'components_header_main_menus';
  info: {
    displayName: 'Main Menu';
  };
  attributes: {
    menu_item: Schema.Attribute.Component<'header.menu-item', true>;
    projects: Schema.Attribute.Component<'header.projects', false>;
  };
}

export interface HeaderMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_header_menu_items';
  info: {
    displayName: 'Menu Item';
  };
  attributes: {
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface HeaderProjects extends Struct.ComponentSchema {
  collectionName: 'components_header_projects';
  info: {
    displayName: 'Projects';
  };
  attributes: {
    button: Schema.Attribute.Component<'common.button', false>;
    locations: Schema.Attribute.Relation<'oneToMany', 'api::location.location'>;
  };
}

export interface HeaderSubMenu extends Struct.ComponentSchema {
  collectionName: 'components_header_sub_menus';
  info: {
    displayName: 'Sub Menu';
  };
  attributes: {
    sub_menu: Schema.Attribute.Component<'header.menu-item', true>;
  };
}

export interface HomeOurCustomers extends Struct.ComponentSchema {
  collectionName: 'components_home_our_customers';
  info: {
    displayName: 'Our customers';
  };
  attributes: {
    description: Schema.Attribute.String;
    handovers: Schema.Attribute.Relation<'oneToMany', 'api::handover.handover'>;
    testimonials: Schema.Attribute.Relation<
      'oneToMany',
      'api::testimonial.testimonial'
    >;
    title: Schema.Attribute.String;
  };
}

export interface HomeTrust extends Struct.ComponentSchema {
  collectionName: 'components_home_trusts';
  info: {
    displayName: 'Trust';
  };
  attributes: {
    description: Schema.Attribute.Component<'common.description', true>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    message: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

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
      'apartment.featured': ApartmentFeatured;
      'apartment.section': ApartmentSection;
      'apartment.status': ApartmentStatus;
      'common.button': CommonButton;
      'common.description': CommonDescription;
      'header.main-menu': HeaderMainMenu;
      'header.menu-item': HeaderMenuItem;
      'header.projects': HeaderProjects;
      'header.sub-menu': HeaderSubMenu;
      'home.our-customers': HomeOurCustomers;
      'home.trust': HomeTrust;
      'milestones.medias': MilestonesMedias;
    }
  }
}
