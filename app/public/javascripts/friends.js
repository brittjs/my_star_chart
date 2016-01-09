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
    }

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
    $('#friend-details').text(friendName).attr({'data-friend-id': friendId});
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
  //   Clear add friend modal on closing
  //
  // ============================================================
  $('#addFriendModal').on('hidden.bs.modal', function (e) {
    $('#inviteFriendButton').removeClass('shown');
    $('#addFriendshipButton').removeClass('shown');
    $("#findByEmail").val("");
    $("#show-results").empty();
    $('#hiddenErrorMsg').css("display", "none");
  });

  // ===========================================================
  //
  //
  //   Trap add button click, search users table for that email address, and show results
  //
  // ============================================================
  $('#findFriendForm').on('submit', function(e) {
    e.preventDefault();

    var emailAddress = $("#findByEmail").val();
    var div = $("#show-results");
    $('#inviteFriendButton').removeClass('shown');
    $(div).empty();

    $.get('/users/search/'+emailAddress+'/', function(user) {
      if (!user.username) {
        console.log ("right track");
        $(div).html(user.email +" was not found");
        $('#inviteFriendButton').addClass('shown');

        $('#inviteFriendButton').on('click', function (e) {
          e.preventDefault();
          console.log("right button");
          window.open("mailto:"+user.email+"?subject=Let%27s%20Be%20Star%20Chart%20Friends!&body=I%27ve%20found%20this%20great%20motivational%20tool%20that%20I%20think%20you%20would%20like.%0A%0AVisit%20[URL]%20to%20find%20out%20more!", "_blank");
          $("#addFriendModal").modal('hide');
        });

        // resets form and removes invite button
        $("#findByEmail").mousedown(function () {
          $("#findFriendForm").trigger("reset");
          $('#inviteFriendButton').removeClass('shown');
          $(div).empty();
        });

      }

      else if (user.id === userId) {
        // if user searches for themselves, their username, email address, 
        // and "Cannot add yourself as a friend." will appear in the modal
        $(div).html("username: " + user.username + "<br>email: " + user.email);
        $(div).attr({'usernum': user.id});
        $('#hiddenErrorMsg').css("display", "block");
        
        // after finding themselves, when the user clicks the input field, 
        //the form resets, error msg and their info disappears
        $("#findByEmail").mousedown(function () {
          $("#findFriendForm").trigger("reset");
          $('#hiddenErrorMsg').css("display", "none");
          $(div).empty();
        });

      } else {
        console.log(user.id);
        console.log(user.username);
        console.log(user.email);
        console.log(userId);
        $(div).html("username: " + user.username + "<br>email: " + user.email);
        $(div).attr({'usernum': user.id});
        $('#addFriendshipButton').addClass('shown');
        
        // reseting form and removing info on mousedown is necessary so that if 
        // user enters their email after searching for another user, add friend button will be removed
        $("#findByEmail").mousedown(function () {
          $("#findFriendForm").trigger("reset");
          $('#addFriendshipButton').removeClass('shown');
          $(div).empty();
        });

      }

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

    var newFriendId = $("#show-results").attr('usernum');
    var newFriendship = {Friend1Id: newFriendId, Friend2Id: userId};
    console.log(newFriendId);
    console.log(userId);

    if (parseInt(newFriendId) === parseInt(userId)) {
      alert("Cannot add self as friend");
    } else {

    $.post('/users/' +userId + '/friends', newFriendship, function(friendship){
      console.log("add friend button successful");
      console.log("friend = ", friendship);
      reloadFriends(userId);

    // .fail( function(xhr, textStatus, errorThrown) {
    //   alert(xhr.responseText);
    //   console.log(xhr.responseText);
    // });
    $("#findFriendForm").trigger("reset");
    $("#addFriendModal").modal('hide');
    });

    } 

  });

  // ===========================================================
  //
  //
  //   Trap remove button click, delete friendship
  //
  // ============================================================
   $('#deleteFriendshipButton').on('click', function (e) {
    e.preventDefault();
   
    var friendId = $('#friend-details').attr('data-friend-id');
    var userId = $('div#userId').data('id'); //does this need to be here?

    $.ajax({
        url: '/users/' + userId + '/friends/' + friendId, 
        type: 'DELETE',
        success: function () {
          console.log('deleted!');
          console.log('deleted = ', friendId);
          reloadFriends(userId);
          $("#showFriendModal").modal('hide');
        },
        error: function (xhr, ajaxOptions, thrownError) {
          console.log("#deleteFriendshipButton click ajax DELETE failed.");
          console.log("status = " + xhr.status);
          console.log("xhr.responseText = " + xhr.responseText);
      }

    });
  });


}
});
