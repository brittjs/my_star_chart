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

  // ===========================================================
  //
  //
  //   Trap friend list item click and open modal Bootstrap window
  //
  // ============================================================

  $('ul.friends').on('click', 'a', function(e) {
    e.preventDefault();
    var friendId = $(this).parents('[data-friend-id]').data('friendId');
    $('#friend-details').text(friendId)
  });

  // ===========================================================
  //
  //
  //   Render starfield in open modal Bootstrap window
  //
  // ============================================================

  $(document).ready(function(){
  var userId = 2;

  $.get('users/' + userId + '/stars', function(stars){
    stars.forEach(function(star){
      console.log(star);
      // var x_cord;
      // var y_cord;
      var div = $("<div>").addClass("star-container");
      $("#basebox").append(div);
      $("<div>").addClass("star").appendTo(div);
      // var addStar = div.append(newStar);
      $(div).css({"left": star.x_cord, "top": star.y_cord});
    });
  }); 
})
