module.exports = {
  create: function create(initiative, items, properties) {
    return {
      initiative,
      items,
      properties,
    };
  },

  createProperties: function createProperties(userName, email, phone, emailCc, poNumber, comments) {
    return {
      user_name: userName,
      email,
      phone,
      email_cc: emailCc,
      po_number: poNumber,
      comments,
    };
  },

  createItems: function createItems(artworkType, thumbnail, keyVisual, location, components, fields, version) {
    return {
      artwork_type: artworkType,
      thumbnail,
      key_visual: keyVisual,
      location,
      components,
      fields,
      version,
    };
  },

  createFromTemplate: function createFromTemplate(initiativeRef, artworkTypeRef, location, properties) {
    return {
      initiative: initiativeRef,
      items: [
        {
          artwork_type: artworkTypeRef,
          thumbnail: 'poster.png',
          key_visual: 'poster_visual.png',
          location,
          components: [
            {
              name: 'Poster Size',
              condition: null,
            },
            {
              name: 'Claim',
              condition: null,
            },
            {
              name: 'Disclaimer',
              condition: null,
            },
            {
              name: 'French Legal',
              condition: {
                comparator: {
                  name: 'Lang',
                  component: false,
                },
                comparison: 'eq',
                value: 'fr',
              },
            },
            {
              name: 'Retailer',
              condition: null,
            },
            {
              name: 'Recto',
              condition: null,
            },
            {
              name: 'Warehouse',
              condition: null,
            },
            {
              name: 'Comments',
              condition: null,
            },
            {
              name: 'Fileupload',
              condition: [],
            },
          ],
          fields: {
            'Poster Size': {
              value: {
                format: 'Portrait',
                value: 'A1',
                style: 'picker',
              },
            },
            Claim: {
              value: {
                en: {
                  target: '',
                },
              },
            },
            Disclaimer: {
              value: {
                en: {
                  target: '',
                },
              },
            },
            Retailer: {
              value: 'No Retailer Adaption',
            },
            Recto: {
              value: 'Recto/Verso OFF',
            },
            Warehouse: {
              value: '',
            },
            Comments: {
              value: '',
            },
            Fileupload: {
              value: null,
            },
          },
          version: 1,
        },
      ],
      properties,
    };
  },
};
