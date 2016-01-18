'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

   return [
    queryInterface.bulkInsert('Users', [
      { username: "ashleyyy", pwd: '23456', email: 'ashleyfisher@gmail.com', githubId: '13425640', gravatar: "'https://s.gravatar.com/avatar/4e24e73e2082b4db6128a8c8dee143eb?size=48&default=wavatar'" },
      { username: "StephanieBeaton", pwd: '12345', email: 'stephanybeaton@gmail.com', githubId: '8796670', gravatar: "'https://s.gravatar.com/avatar/bfaeaa4f6c2a5157df618b42ed143b1e?size=48&default=wavatar'" },
      { username: "TannerEady", pwd: '34567', email: 'tanneready@shaw.ca', gravatar: "'https://s.gravatar.com/avatar/6712f7cf8713fa8a2ac145b37e7f180d?size=48&default=wavatar'" },
      { username: "genephoenix", pwd: '45678', email: 'lakshmikotteda@hotmail.com', githubId: '13411375', gravatar: "'https://s.gravatar.com/avatar/ac1ef8b87b3bfad9cd2d38677451f4c8?size=48&default=wavatar'" },
      { username: "brittjs", pwd: '56789', email: 'brittanyjsee@gmail.com', githubId: '13922751', gravatar: "'https://s.gravatar.com/avatar/f536920e8fdc08dc3ff7edf9d8aa187f?size=48&default=wavatar'" },
      { username: "firstdummy", pwd: '56789', email: 'dummy@email.com', gravatar: "'https://s.gravatar.com/avatar/fb651279f4712e209991e05610dfb03a?size=48&default=wavatar'"},
      { username: "secondfool", pwd: '56789', email: 'second@email.com', gravatar: "'https://s.gravatar.com/avatar/29e4aea606c385e351ca3f6bdb940e4c?size=48&default=wavatar'"},
      { username: "madeupuser", pwd: '56789', email: 'madeupuser@email.com', gravatar: "'https://s.gravatar.com/avatar/df74afdcf05f6c1d3f62043ae6e0d588?size=48&default=wavatar'"}
    ])
  ];
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
