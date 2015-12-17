$(function() {

  // ===========================================================
  //
  //
  //   Load user's friend list when page opens
  //
  // ============================================================
  var server = 'localhost:3000';

  // user = this.state.user;

  var userId = 1;

  $.get('users/' + userId + '/friends', function(friends){
    var friendslist = $('ul.friends') 
    friends.each(friend, function (){
      var li = $('<li>').appendTo(friendslist);
      li.text(friend);
    })
 
  })
})
