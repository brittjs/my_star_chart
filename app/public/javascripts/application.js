$(function() {

  console.log("in applications.js file");
  console.log(window.location.path);

  var str = window.location.pathname;

  var usersPage = str.match(/^\/view$/);

  var homePage = str.match(/^\/$/);


  if (usersPage || homePage) {

      // $(document).ajaxError(function(e)
      // {
      //   console.error('Ajax Request Failed: ', e);
      // });

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
  //    _taskcreatemodal.ejs    Submit button click
  //
  //   Submit create new task form
  //
  // ============================================================


  $("#createTaskForm").on('submit', function(e) {
    e.preventDefault();

    var taskDescription = $("#description").val();
    var dueDate = $("#due_date").val();
    var taskPriority = $("#priority").val();
    var recurringCheckbox = $("#recurring").val();

    // .attr({
    // 'id':   $(this).attr("id")
    // });

    var myTask = {description: taskDescription, due_date: dueDate, priority: taskPriority, recurring: recurringCheckbox, postponed: false, completed: false};

    // myTask = JSON.stringify(myTask);

    // console.log(myTask);
    // alert("hello");

    $.post('/users/' + userId + '/tasks', myTask, function(task) {
      console.log("Create task submit button successful.");
      console.log("task = ", task);

    })
    .fail( function(xhr, textStatus, errorThrown) {
        alert(xhr.responseText);
        console.log(xhr.responseText);
    });





  });

  // ===========================================================
  //
  //   _taskdetailsmodal.ejs    user click on "Edit Task" button
  //
  //   Retrieve Specific Task for Edit task modal
  //
  // ============================================================
  //

  // function prepopulateEditForm(task) {

  //   $("#Edescription").val(task.description);
  //   $("#Edue_date").val(task.due_date);
  //   $("#Epriority").val(task.priority);
  //   $("#Erecurring").val(task.recurring);
  // }

  $('#editTask').on('click', function() {
    var taskId = $('div.details').attr("id");
    console.log("inside prepopulation edit form");
    console.log(taskId);
    $(".taskId").attr({
                      'id':   taskId
                      });
  });

  // ===========================================================
  //
  //   _taskeditmodal.ejs
  //
  //   Update Task when Submit Task button is clicked on the Edit Task window
  //
  // ============================================================

  $("#saveEditButton").on('click', function(event) {
    event.preventDefault();
    var task = {};
    task.id = $(".taskId").attr("id");
    task.description = $("#Edescription").val();
    task.due_date = $("#Edue_date").val();
    task.priority = $("#Epriority").val();
    task.recurring = $("#Erecurring").val();

    console.log("property values on task object being sent to server");
    for (var prop in task) {
      console.log("task." + prop + "= " + task[prop]);
    }
        // AJAX call to  POST data to server
        $.ajax({
            type: "PUT",
            url:  'users/' + userId + '/tasks/' + task.id,
            contentType: "application/json",
            data: JSON.stringify(task),
            success: function(data) {
                      alert('Update was successful.');
                      console.log("#saveEditButton click ajax PUT was suceessful.")
                      console.log("data returned ", data);
                    },
            error: function (xhr, ajaxOptions, thrownError) {
                      console.log("#saveEditButton click ajax PUT failed.")
                      console.log("status = " + xhr.status);
                      console.log("xhr.responseText = " + xhr.responseText);
                    }
        });
  });

  // ===========================================================
  //
  //
  //   Delete task on click    -  user cannot delete Task from web pages
  //
  // ============================================================

  $("#deleteTask").on('click', function() {
    alert("Button works");
  //   $.ajax({
  //     url: '/users/' + userId +,
  //     type: 'DELETE',
  //     success: function() {
  //       console.log("done");
  //     }
  //   });
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
        //   _taskdetailsmodal.ejs
        //
        //   Trap button clicks at bottom of View Details modal Bootstrap window
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
           // if ($(this).attr("id") === "saveTask") {

           //    // task.description = $('div.details').text();
           //    task.description = 'supercalifragalisticexpeaalidoshus';
           //    task.id = $('div.details').attr("id");

           //    // AJAX call to  POST data to server
           //    $.ajax({
           //        type: "PUT",
           //        url:  'users/' + userId + '/tasks/' + task.id,
           //        contentType: "application/json",
           //        data: JSON.stringify(task),
           //        success: function(data) {
           //                  alert('Update was successful.');
           //                },
           //        failure: function(err) {
           //                  alert(err);
           //                }
           //    });

           //  }

           // ---------------------------------------------------------------
           //
           //   trap and process Completed Task button click
           //
           // ---------------------------------------------------------------
           if ($(this).attr("id") === "taskComplete") {

              // star.TaskId = $('div.details').attr("id");

              // star.x_cord = 81;
              // star.y_cord = 131;


              // // AJAX call to  POST star to server
              // $.ajax({
              //     type: "POST",
              //     url:  'users/' + userId + '/tasks/' + star.TaskId + '/stars',
              //     contentType: "application/json",
              //     data: JSON.stringify(star),
              //     success: function(data) {
              //               alert('Star create was successful.');
              //             },
              //     failure: function(err) {
              //               alert(err);
              //             }
              // });

              task.id = $('div.details').attr("id");
              task.completed = true;

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

        });

   } // end of user's Page  !!!

});

