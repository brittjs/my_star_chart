$(function() {

  $(document).ajaxError(function(e)
  {
    console.error('Ajax Request Failed: ', e);
  });

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

    $('div.details').text( $( this ).text() ).attr({
                                                  'id':   $(this).attr("id")
                                                  });
  });


  // ===========================================================
  //
  //
  //   Trap button clicks at bottom of  modal Bootstrap window
  //
  // ============================================================

  // <div class="taskDetailButtons">
  // <button type="button" class="btn btn-default" id="editTask">Edit Task</button>
  // <button type="button" class="btn btn-default" id="deleteTask">Delete Task</button>
  // <button type="button" class="btn btn-default" id="procrastinate">Procrastinate</button>
  // <button type="button" class="btn btn-default" id="taskComplete">Mark as complete</button>
  // </div>

  $('div.taskDetailButtons').on('click', 'button', function(event) {

     var task = {};
     var star = {};

     event.preventDefault();

     // ---------------------------------------------------------------
     //
     //   trap and process Save of Task
     //
     // ---------------------------------------------------------------
     if ($(this).attr("id") === "saveTask") {

        // task.description = $('div.details').text();
        task.description = 'supercalifragalisticexpeaalidoshus';
        task.id = $('div.details').attr("id");

        // AJAX call to  POST data to server
        $.ajax({
            type: "PUT",
            url:  'users/' + userId + '/tasks/' + task.id,
            contentType: "application/json",
            data: JSON.stringify(task),
            success: function(data) {
                      alert('Update was successful.');
                    },
            failure: function(err) {
                      alert(err);
                    }
        });

     }

     // ---------------------------------------------------------------
     //
     //   trap and process Completed Task button click
     //
     // ---------------------------------------------------------------
     if ($(this).attr("id") === "taskComplete") {

        star.TaskId = $('div.details').attr("id");

        star.x_cord = 81;
        star.y_cord = 131;


        // AJAX call to  POST star to server
        $.ajax({
            type: "POST",
            url:  'users/' + userId + '/tasks/' + star.TaskId + '/stars',
            contentType: "application/json",
            data: JSON.stringify(star),
            success: function(data) {
                      alert('Star create was successful.');
                    },
            failure: function(err) {
                      alert(err);
                    }
        });

     }

  });



});
