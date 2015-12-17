$(function() {

  // ===========================================================
  //
  //
  //   Load user's task list when page opens
  //
  // ============================================================
  var server = 'localhost:3000';

  // var userId = $('.something_to_get_userid').text();

  var userId = 2;

  $.get('users/' + userId + '/tasks', function(tasks){

    // find the <ul>
    var $taskUl = $('ul.tasks');

    var $taskLi;

    // iterate thru returned array and load <li>s
    tasks.forEach(function(task) {

       $taskLi = $('<li>');

       // <a href data-toggle="modal" data-target="#myModal">Do laundry</a>

       $taskAnchor = $('<a>').text(task.description)
                             .attr({
                                    'id':   task.id.toString(),
                                    'href': '',
                                    'data-toggle': "modal",
                                    'data-target': "#myModal"
                                  });

       $taskLi.append($taskAnchor);

       $taskUl.append($taskLi);
    });

    var temp = 1;

  });


  // ===========================================================
  //
  //
  //   Trap task list item click and open modal Bootstrap window
  //
  // ============================================================
  // Attach a delegated event handler
  $('ul.tasks').on('click', 'a', function(event) {

    // load user's task data into modal

    event.preventDefault();

    // $('#myModalLabel').text("This is a test");

    $('div.details').text( $( this ).text() ).attr({
                                                  'id':   $(this).attr("id")
                                                  });


  });


});
