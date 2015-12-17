$(function() {

  // ===========================================================
  //
  //
  //   Load user's friend list when page opens
  //
  // ============================================================
  var server = 'localhost:3000';

  // var userId = $('.something_to_get_userid').text();

  var userId = 1;

  $.get('users/' + userId + '/friends', function(friends){

    // find the <ul>
    var $friendsUl = $('ul.friends');

    var $friendsLi;

    // iterate thru returned array and load <li>s
    friends.forEach(function(friends) {

       $friendsLi = $('<li>');

       // <a href data-toggle="modal" data-target="#myModal">Do laundry</a>

       $friendsAnchor = $('<a>').text(friends.description)
                             .attr({
                                    'id':   friends.id.toString(),
                                    'href': '',
                                    'data-toggle': "modal",
                                    'data-target': "#myModal"
                                  });

       $friendsLi.append($friendsAnchor);

       $friendsUl.append($friendsLi);
    });

    var temp = 1;

  });


  // ===========================================================
  //
  //
  //   Trap friends list item click and open modal Bootstrap window
  //
  // ============================================================
  // Attach a delegated event handler
  $('ul.friends').on('click', 'a', function(event) {

    // load user's friends data into modal

    event.preventDefault();

    // $('#myModalLabel').text("This is a test");

    $('div.details').text( $( this ).text() ).attr({
                                                  'id':   $(this).attr("id")
                                                  });


  });


});