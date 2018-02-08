module.exports = {
  createFromTemplate: function createFromTemplate(title) {
    return {
      title,
      firstName: 'QAAutoFirstName',
      lastName: 'QAAutoLastName',
      email: 'QAAuto@email.com2',
      countryCode: 'US',
      lines: [
        'CompanyName2',
        'mystreet2',
        'mycity2',
        'mystate2',
        'QAAuto API Tests',
      ],
    };
  },
};
