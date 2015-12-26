$(function() {

  var str = window.location.pathname;

  var usersPage = str.match(/^\/view$/);

  var homePage = str.match(/^\/$/);


  if (usersPage || homePage) {

  // ===========================================================
  //
  //
  //   Load user's friend list when page opens
  //
  // ============================================================

  // var userId = 2; //change this to be current_user_id
  var userId = $('div#userId').attr('data-id');
  console.log("$('div#userId').attr('data-id')");
  console.log(userId);

  $.get('/users/' + userId + '/friends').then(function(friends)
  {
    var friendslist = $('ul.friendslist');
    var friendsLi = friends.map(function (friend)
    {
      return $('<li>').attr({
        'data-friend-id': friend.id,
        'data-toggle': "modal",
        'data-target': "#showFriendModal"
      }).append($('<a href="javascript:void(0);">').text(friend.username));
    });

    friendslist.append(friendsLi);
  });

  // ===========================================================
  //
  //
  //   Trap friend list item click and open modal Bootstrap window
  //
  // ============================================================

  $('ul.friendslist').on('click', 'a', function(e) {
    e.preventDefault();
    var friendId = $(this).parents('[data-friend-id]').data('friendId');
    var friendName = $(this).parents('[data-friend-id]').text();
    $('#friend-details').text(friendName);
    $('#friendstars').empty();

     $.get('users/' + friendId + '/stars', function(stars){
        stars.forEach(function(star){
          console.log(star);
          // var x_cord;
          // var y_cord;
          var div = $("<div>").addClass("star-container");
          $("#friendstars").append(div);
          $("<div>").addClass("star").appendTo(div);
          // var addStar = div.append(newStar);
          $(div).css({"left": star.x_cord+"%", "top": star.y_cord+"%"});
        });
      });
   });
}
});
