module.exports = ({ env }) => ({
    upload: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: 'flute-medi',
        api_key: '277215585278948',
        api_secret: 'a2Ln2fGqrKf72gguQf-jvf61Pfo',
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  });