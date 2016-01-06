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

  var userId = $('div#userId').data('id');
  console.log("$('div#userId').data('id')");
  console.log(userId);

  function reloadFriends(userId) {
    var friendslist = $('ul.listOfFriends');
    friendslist.empty();

    $.get('/users/' + userId + '/friends').then(function(friends)
    { 
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
    };

  reloadFriends(userId);

  // ===========================================================
  //
  //
  //   Trap friend list item click and open friend detail modal with stars
  //
  // ============================================================

  $('ul.listOfFriends').on('click', 'a', function(e) {
    e.preventDefault();
    var friendId = $(this).parents('[data-friend-id]').data('friendId');
    var friendName = $(this).parents('[data-friend-id]').text();
    $('#friend-details').text(friendName);
    $('#friendstars').empty();

     $.get('users/' + friendId + '/stars', function(stars){
        stars.forEach(function(star){
          var div = $("<div>").addClass("star-container");
          $("#friendstars").append(div);
          $("<div>").addClass("star").appendTo(div);
          $(div).css({"left": star.x_cord+"%", "top": star.y_cord+"%"});
        });
      });
   });

  // ===========================================================
  //
  //
  //   Trap add button click, search users table for that email address, and show results
  //   NOTE: will always return the same, hardcoded result
  //
  // ============================================================
  $('#findFriendForm').on('submit', function(e) {
    e.preventDefault();

    var emailAddress = $("#findByEmail").val();
    $("#show-results").empty();

    $.get('/users/search/'+emailAddress+'/', function(user) {
      var div = $("#show-results");
      $(div).html("username: " + user.username + "<br>email: " + user.email);
      $(div).attr({'data-usernum': user.id});
      $('#addFriendshipButton').addClass('shown');
    });
  });
  // ===========================================================
  //
  //
  //   Trap add button click, create friendship
  //
  // ============================================================
  $('#addFriendshipButton').on('click', function (e) {
    e.preventDefault();
    console.log("well, the button clicked");

    var newFriendId = $("#show-results").data('usernum');
    var newFriendship = {Friend1Id: newFriendId, Friend2Id: userId};

    $.post('/users/' +userId + '/friends', newFriendship, function(friendship){
      console.log("success?");
      reloadFriends(userId);

    // .fail( function(xhr, textStatus, errorThrown) {
    //   alert(xhr.responseText);
    //   console.log(xhr.responseText);
    // });

    // $("#show-results").empty();
    $("#addFriendModal").modal('hide');

    })

  })

}
});
