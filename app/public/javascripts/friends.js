$(function() {

  // ===========================================================
  //
  //
  //   Load user's friend list when page opens
  //
  // ============================================================
  var server = 'localhost:3000';

  // user = this.state.user;

  var userId = 2;

  $.get('/users/' + userId + '/friends').then(function(friends)
  {
    var friendslist = $('ul.friends');
    var friendsLi = friends.map(function (friend)
    {
      return $('<li>').text(friend);
    });

    friendslist.append(friendsLi);
  })
})
