$(function() {

  var str = window.location.pathname;

  var usersPage = str.match(/^\/user$/);

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
    $('#friend-details').text(friendName).attr({'data-friend-id': friendId})
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

  //  TODO: make this work

  // $('#addFriendModal').on('show', function(e){
  //   $('#addFriendshipButton').removeClass('shown');
  //   $("#findByEmail").val("");
  //   $("#show-results").empty();
  // });

  // ===========================================================
  //
  //
  //   Trap add button click, search users table for that email address, and show results
  //   NOTE: will not work for email addresses not already in db
  //
  // ============================================================
  $('#findFriendForm').on('submit', function(e) {
    e.preventDefault();

    var emailAddress = $("#findByEmail").val();
    var div = $("#show-results");
    $(div).empty();

    $.get('/users/search/'+emailAddress+'/', function(user) {
      
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
      reloadFriends(userId);

    // .fail( function(xhr, textStatus, errorThrown) {
    //   alert(xhr.responseText);
    //   console.log(xhr.responseText);
    // });
    $('#addFriendshipButton').removeClass('shown');
    $("#findByEmail").val("");
    $("#show-results").empty();
    $("#addFriendModal").modal('hide');
    })
  })

  // ===========================================================
  //
  //
  //   Trap remove button click, delete friendship
  //
  // ============================================================
   $('#deleteFriendshipButton').on('click', function (e) {
    e.preventDefault();
   
    var friendId = $('#friend-details').data('friend-id');

    $.del('/users/' + userId + '/friends/' + friendId, function(friendship){
      console.log('deleted!');
      reloadFriends(userId);
    $("#showFriendModal").modal('hide');

    })
 

  })


}
});
