module.exports = {
  createFromTemplate: function createFromTemplate(name, fqdn, secret) {
    return {
      name,
      fqdn,
      secret,
      system: false,
    };
  },
};
