module.exports = {
  createFromTemplate: function createFromTemplate(name, description, account, metadata) {
    return {
      name,
      description,
      start: '2017-02-01T01:23:45.000Z',
      active: false,
      end: '2030-02-22T01:23:45.000Z',
      account,
      activatedAt: '2017-02-02T09:20:00.000Z',
      metadata,
    };
  },
};
