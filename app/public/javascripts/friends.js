$(function() {

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
      return $('<li>').attr({
        'data-friend-id': friend.id,
        'data-toggle': "modal",
        'data-target': "#showFriendModal"
      }).append($('<a href="javascript:void(0);">').text(friend.username));
    });

    friendslist.append(friendsLi);
  })
// })


  // ===========================================================
  //
  //
  //   Trap task list item click and open modal Bootstrap window
  //
  // ============================================================
  // Attach a delegated event handler
  $('ul.friends').on('click', 'a', function(e) {
    // load user's task data into modal
    e.preventDefault();
    var friendId = $(this).parents('[data-friend-id]').data('friendId');
    $('#friend-details').text(friendId)
  });
})
