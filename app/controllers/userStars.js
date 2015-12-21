var db = require('../models/index.js');

module.exports = {

  // a user's star paths
  //

  // GET    /users/2/stars   - Retrieves list of stars for user #2

  // -------------------------------------------------------------
  //
  //     get list of stars for user
  //
  // -------------------------------------------------------------
  getListOfStarsForUser: function* getListOfStarsForUser(next) {
    console.log('GET    /users/2/stars');
    console.log('this.state.user');

    user = this.state.user;
    var stars = yield user.getStars(); // gets you all stars
    //console.log('stars');
    //console.log(stars);

    // iterate through stars extract keyvalue "dataValues"
    var mappedStars = [];

    stars.forEach(function (star) {
      mappedStars.push( star["dataValues"]);
    });

    // console.log(mappedStars);

    this.body = mappedStars;

    // User.findAll({
    //   where: ...,
    //   include: [
    //     { model: Picture }, // load all pictures
    //     { model: Picture, as: 'ProfilePicture' }, // load the profile picture. Notice that the spelling must be the exact same as the one in the association
    //   ]
    // });

    yield next;
  }


};


