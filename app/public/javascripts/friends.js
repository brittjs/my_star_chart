$(function() {

  var str = window.location.pathname;
  var re = /^\/view$/;
  var usersPage = str.match(re);

  if (usersPage) {

        // ===========================================================
        //
        //
        //   Load user's friend list when page opens
        //
        // ============================================================

        var userId = 2; //change this to be current_user_id

        $.get('/users/' + userId + '/friends').then(function(friends)
        {
          var friendslist = $('ul.friends');
          var friendsLi = friends.map(function (friend)
          {
            return $('<li>').text(friend);
          });

          friendslist.append(friendsLi);
        });

   }  // end of user's Page



});
