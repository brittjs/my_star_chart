$(function() {

  console.log("in taskdetailsmodal.js file");
  console.log(window.location.pathname);

  var str = window.location.pathname;

  var usersPage = str.match(/^\/user$/);

  var homePage = str.match(/^\/$/);


  if (usersPage || homePage) {

      //  var userId = 2;
      var userId = $('div#userId').data('id');
      console.log("$('div#userId').data('id')");
      console.log(userId);


      // ===========================================================
      //
      //   _taskdetailsmodal.ejs    user click on "Edit Task" button
      //
      //   Retrieve Specific Task for Edit task modal
      //   ... Edit task modal opens.
      //
      // ============================================================

      $("#editTask").on('click', function() {
        var taskId = $('div.details').attr("id");
        var task = findByTaskId(taskId);
        $("#Edescription").val(task.description);
        $("#Edue_date").val(new Date(task.due_date).toDateInputValue());
        $("#Epriority").val(task.priority);
        $("#ERecurring").prop('checked', task.recurring);
      });


    // ===========================================================
    //
    //   _taskdetailsmodal.ejs
    //
    //   Trap button clicks at bottom of View Details modal Bootstrap window
    //
    // ============================================================

    // <div class="taskDetailButtons">
    // <button type="button" class="btn btn-default" id="editTask">Edit Task</button>   <==  this pops up another modal window
    // <button type="button" class="btn btn-default" id="deleteTask">Delete Task</button>
    // <button type="button" class="btn btn-default" id="procrastinate">Procrastinate</button>
    // <button type="button" class="btn btn-default" id="taskComplete">Mark as complete</button>
    // </div>

    $('div.taskDetailButtons').on('click', 'button', function(event) {

       var userId;
       var taskId;
       var task = {};
       var star = {};

       event.preventDefault();

        // ===========================================================
        //
        //
        //   Delete task on click    -  This is being called on
        //                              user cannot delete Task from web pages
        //
        // ============================================================

        if ($(this).attr("id") === "deleteTask") {
       // $("#deleteTask").on('click', function() {

          taskId = $('div.details').attr("id");
          userId = $('#userId').data("id");
          console.log("userId");
          console.log(userId);
          console.log("trying to delete a task");
          console.log(taskId);
          $(".taskId").attr({
                            'id':   taskId
                            });

          //  delete Task in the server
          //  ... also deletes the stars associated with the task

          $.ajax({
            url: '/users/' + userId + '/tasks/' + taskId,
            type: 'DELETE',
            success: function() {
              console.log("done with delete");

              $("#myModal").modal('hide');

              // if this task was the header task
              // ... then need to select another header task
              // ... &&&
              var headerTaskId = $('#header-task').attr('data-header-task-id');

              var changeHeaderTaskFlag = false;
              if (taskId === headerTaskId) {
                changeHeaderTaskFlag = true;
              }
              reloadTasks(userId, changeHeaderTaskFlag);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log("#deleteTask button click ajax DELETE failed.");
                console.log("status = " + xhr.status);
                console.log("xhr.responseText = " + xhr.responseText);
            }

          });

        }

       // ---------------------------------------------------------------
       //
       //   trap and process Procastinate Task button click
       //
       // ---------------------------------------------------------------
       if ($(this).attr("id") === "procrastinate") {

          userId = $('div#userId').data('id');
          console.log("$('div#userId').attr('data-id')");
          console.log(userId);

          taskId = $('div.details').attr("id");
          // console.log(taskId);
          var task = findByTaskId(taskId);
          console.log(task);
          task.postponed = true;

          // AJAX call to  POST data to server
          $.ajax({
              type: "PUT",
              url:  'users/' + userId + '/tasks/' + task.id,
              contentType: "application/json",
              data: JSON.stringify(task),
              success: function(data) {
                        console.log('Task was postponed');
                        // console.log(data);
                        // console.log(taskId);
                        $("#myModal").modal('hide');

                        reloadTasks(userId);

                      },
              failure: function ( jqXHR, textStatus, errorThrown ) {
                       console.log(jqXHR.responseText);
                       alert(jqXHR.responseText);
              }
          });

       }
       // ---------------------------------------------------------------
       //
       //   trap and process Completed Task button click
       //
       //   THIS IS SUPPOSED TO BE TRIGGERED BY CHECKBOX ON USER PAGE
       //   ... NOT TRIGGERED BY "Complete" Button on Task Details modal
       //
       // ---------------------------------------------------------------

       if ($(this).attr("id") === "taskComplete") {

          userId = $('div#userId').data('id');
          console.log("$('div#userId').attr('data-id')");
          console.log(userId);


          star.TaskId = $('div.details').attr("id");

          star.UserId = userId;

          var min = 1;
          var max = 100;
          star.x_cord = Math.floor(Math.random() * (max - min + 1)) + min;
          star.y_cord = Math.floor(Math.random() * (max - min + 1)) + min;
          // star.x_cord = getRandomInt(1, 100);
          // star.y_cord = getRandomInt(1, 100);


          // AJAX call to  POST star to server
          $.ajax({
              type: "POST",
              url:  'users/' + userId + '/tasks/' + star.TaskId + '/stars',
              contentType: "application/json",
              data: JSON.stringify(star),
              success: function(data) {
                        console.log('Star was inserted successfully');
                        console.log(data);
                        alert('Star was inserted successfully.');
                      },
              failure: function ( jqXHR, textStatus, errorThrown ) {
                       console.log(jqXHR.responseText);
                       alert(jqXHR.responseText);
                     }
           });

          task.id = $('div.details').attr("id");
          task = findByTaskId(task.id);
          task.completed = true;
          // $(".complete").prop('checked', task.completed);

          // all task fields must be passed to the server
          // ... regardless of whether they were changed or not

          // AJAX call to  POST data to server

          $.ajax({
              type: "PUT",
              url:  'users/' + userId + '/tasks/' + task.id,
              contentType: "application/json",
              data: JSON.stringify(task),
              success: function(data) {
                        console.log('Task was updated successfully');
                        console.log(data);
                        alert('Task was updated successfully.');

                        $("#myModal").modal('hide');

                        // if the task completed was the header task
                        // ... then need to change the header task
                        // ... &&&
                        var headerTaskId = $('#header-task').attr('data-header-task-id');

                        var changeHeaderTaskFlag = false;
                        if (task.id === parseInt(headerTaskId, 10)) {
                          changeHeaderTaskFlag = true;
                        }
                        reloadTasks(userId, changeHeaderTaskFlag);
                      },
              failure: function ( jqXHR, textStatus, errorThrown ) {
                       console.log(jqXHR.responseText);
                       alert(jqXHR.responseText);
              }
          });

          // star.TaskId = $('div.details').attr("id");

          // star.UserId = userId;

          // star.x_cord = 81;
          // star.y_cord = 131;


          // // AJAX call to  POST star to server
          // $.ajax({
          //     type: "POST",
          //     url:  'users/' + userId + '/tasks/' + star.TaskId + '/stars',
          //     contentType: "application/json",
          //     data: JSON.stringify(star),
          //     success: function(data) {
          //               console.log('Star was inserted successfully');
          //               console.log(data);
          //               alert('Task was inserted successfully.');
          //             },
          //     failure: function ( jqXHR, textStatus, errorThrown ) {
          //              console.log(jqXHR.responseText);
          //              alert(jqXHR.responseText);
          //            }
          //  });
       }

    });

  }

});
