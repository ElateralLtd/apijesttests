module.exports = {
  assetForInitiative: function assetForInitiative(name, description, initiative, metadata) {
    return {
      name,
      description,
      start: '2017-02-01T01:23:45.000Z',
      end: '2030-02-22T01:23:45.000Z',
      initiative,
      status: 'New',
      origin: 'initiative',
      parent: '123',
      metadata,
    };
  },
  assetOrphan: function assetOrphan(name, description, metadata) {
    return {
      name,
      description,
      start: '2017-02-01T01:23:45.000Z',
      end: '2030-02-22T01:23:45.000Z',
      status: 'New',
      origin: 'orphan',
      metadata,
    };
  },
};
