// ===========================================================
//
//    Global function
//
//    getRandomInt()
//
// ============================================================
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function dailyTaskRefresh() {

  var today = new Date();
  today.setHours(0,0,0,0);
  console.log("today: "+today);

  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0,0,0,0);
  console.log("yesterday: "+yesterday);

  allTasks.forEach(function(task) {

    var dueDate = task.due_date;
    dueDate.setHours(0,0,0,0);

    if (dueDate === yesterday && (task.recurring === true || task.postponed === true)) {
      
      var myTask = {description: task.description,
       due_date: today,
       priority: task.priority,
       recurring: task.recurring,
       postponed: false,
       completed: false,
       UserId: userId};

      $.post('/users/' + userId + '/tasks', myTask, function(task) {
        console.log("Create task submit button successful.");
        console.log("task = ", task);
      });
        
      if (task.completed === false) {
        $.ajax({
          url: '/users/' + userId + '/tasks/' + task.id,
          type: 'DELETE',
          success: function() {
            console.log("done with delete");
          }
        });
      } 
    } 
    
  });
reloadTasks(userId);
}
  
// ===========================================================
//
//    Global function
//
//    changeHeaderTask()
//
// ============================================================
function changeHeaderTask() {

  var oneOrMoreIncompleteTasks = false;

  // if one or more tasks are not completed change task in header
  allTasks.forEach(function(task) {
    if (!task.completed) {
      oneOrMoreIncompleteTasks = true;
    }
  });

  if (oneOrMoreIncompleteTasks) {

    var foundRandomIncompleteTask = false;
    var min = 0;
    var max = allTasks.length;
    var randomIndex;

    do {
      randomIndex = getRandomInt(min, max);
      if (!allTasks[randomIndex].completed) {
        foundRandomIncompleteTask = true;
      }
    } while (!foundRandomIncompleteTask);

    var task2 = allTasks[randomIndex];

    // <span id='header-task' data-header-task-id='header_task'>
    $('#header-task').text(task2.description).attr('data-header-task-id', task2.id );

  }

}


// ===========================================================
//
//    Global function
//
//    reloadTasks() is called in _taskcreatemodal.ejs when Submit button clicked
//    reloadTasks() is called in user.html.ejs when delete checkbox is clicked
//
// ============================================================

var allTasks; // This needs to remain in the global scope, please do not move!

function reloadTasks(userId, changeTaskInHeader) {

  //   ========================================================
        function paintStarsInTheSky() {
          var str = window.location.pathname;

          var usersPage = str.match(/^\/user$/);

          var homePage = str.match(/^\/$/);


          if (usersPage || homePage) {

              //   <div id="userId" data-id="<%= id %>"></div>

              // var userId = $('div#userId').data('id');
              // console.log("$('div#userId').data('id')");
              var userId = $('div#userId').attr('data-id');
              console.log("$('div#userId').attr('data-id')");
              console.log(userId);

              $.get('users/' + userId + '/stars', function(stars){
                stars.forEach(function(star){
                  var div = $("<div>").addClass("star-container");
                  $("#basebox").append(div);
                  $("<div>").addClass("star").appendTo(div);
                  // var addStar = div.append(newStar);
                  $(div).css({"left": star.x_cord+"%", "top": star.y_cord+"%"});
                });
              });

           }
        }

  //   ========================================================


  // default changeTaskInHeader to false
  changeTaskInHeader = typeof changeTaskInHeader !== 'undefined' ?  changeTaskInHeader : false;

  $(".tasks").empty();

  $.get('users/' + userId + '/tasks', function(tasks){

    allTasks = tasks;

    // =========================================================
    //  if parameter "change_task_in_header" == true
    //  ... then change the task in the header
    // =========================================================

    if (changeTaskInHeader) {
      changeHeaderTask();
    }

    // =========================================================

    // find the <ul>
    var $taskUl = $('ul.tasks');

    var $taskLi;

    var $checkBox;

    var $taskAnchor;

    // iterate thru returned array and load <li>s
    allTasks.forEach(function(task) {

      $taskLi = $('<li>');

     // <a href data-toggle="modal" data-target="#myModal">Do laundry</a>

      if (!task.completed) {
        $taskAnchor = $('<a class="taskAnchor">').text(task.description)
                                 .attr({
                                        'id':   task.id.toString(),
                                        'data-priority': task.priority,
                                        'href': '',
                                        'data-toggle': "modal",
                                        'data-target': "#myModal"
                                      });

        $checkBox = $('<input type="checkbox" class="complete">').attr({
          'id':   'chk' + task.id.toString()
          }).prop('checked', task.completed);

        // ===========================================================
        //
        //
        //   Use checklist to mark task as complete and create star
        //
        // ============================================================

        $checkBox.change(function () {
          // console.log("LOOK HERE.");
          var userId = $('div#userId').attr('data-id');
          console.log(userId);
          var taskId = ($(this).attr("id")).substring(3);
          // console.log(taskId);
          var task = findByTaskId(taskId);
          // console.log(taskId);
          task.completed = true;

          // AJAX call to  POST data to server

          $.ajax({
              type: "PUT",
              url:  'users/' + userId + '/tasks/' + task.id,
              contentType: "application/json",
              data: JSON.stringify(task),
              success: function(data) {
                        console.log('Task was updated successfully');
                        console.log(data);

                        // alert('Task was updated successfully.');

                        // if task just completed was the header task
                        // ... then need to change header task.
                        // ...  &&&
                        var headerTaskId = $('#header-task').attr('data-header-task-id');
                        if (task.id === parseInt(headerTaskId, 10)) {
                          changeHeaderTask();
                        }

                      },
              failure: function ( jqXHR, textStatus, errorThrown ) {
                       console.log(jqXHR.responseText);
                       alert(jqXHR.responseText);
              }
          });


          var star = {};
          star.TaskId = taskId;
          console.log(star.TaskId);
          console.log(taskId);

          star.UserId = userId;

          star.x_cord = getRandomInt(0, 98);
          star.y_cord = getRandomInt(2, 92);

          //AJAX call to GET star with specific task id
          //$.get('users/' + userId + '/tasks/' + taskId + '/stars/', function(stars){

            // alert("Check get star with certain id");
            $(".new-hover-control").addClass("hover-control");
            $(".new-hover-control.hover-control").removeClass("new-hover-control");

            var newHoverControl = $("<div>").addClass("new-hover-control");
            var newStarContainerDiv = $("<div>").addClass("new-star-container");
            var addOuterDiv = $("#basebox").append(newHoverControl);
            var addDiv = newHoverControl.append(newStarContainerDiv);
            var newStarDiv = $("<div>").addClass("new-star");
            var addStar = newStarContainerDiv.append(newStarDiv);
            var newTextDiv = $("<div>").addClass("hidden-task-info").text('      ' + task.description);
            var addText = newHoverControl.append(newTextDiv);

            (function(){
              setTimeout(function(){
                console.log("Inside setTimeout");
                // console.log("taskId = " );
                // console.log(taskId);
                $(".new-hover-control").css({"left": star.x_cord + "%", "top": star.y_cord + "%"});
                // $(".new-star-container").addClass("star-container");
                // $(".new-star-container.star-container").removeClass("new-star-container");
              }, 1000);
            })();

            setTimeout(function(){
              //location.reload();
              // logic to determine whether changeHeaderTaskFlag = true or not
              var headerTaskId = $('#header-task').attr('data-header-task-id');

              var changeHeaderTaskFlag = false;
              if (taskId === headerTaskId) {
                changeHeaderTaskFlag = true;
              }

              reloadTasks(userId, changeHeaderTaskFlag);
              // paintStarsInTheSky();
            },3200);

          //});

          // AJAX call to  POST star to server
          $.ajax({
            type: "POST",
            url:  'users/' + userId + '/tasks/' + star.TaskId + '/stars',
            contentType: "application/json",
            data: JSON.stringify(star),
            success:function(data) {
                    console.log('Star was inserted successfully');
                    console.log(data);
                    // alert('Task was inserted successfully.');
                    // location.reload();
                    },
            failure:function ( jqXHR, textStatus, errorThrown ) {
                    console.log(jqXHR.responseText);
                    alert(jqXHR.responseText);
                    }

          });
        });

        } else {
        $taskAnchor = $('<span class="taskAnchor">').text(task.description)
                                 .attr({
                                        'id':   task.id.toString(),
                                        'priority': task.priority,
                                      //  'data-toggle': "modal",
                                      //  'data-target': "#myModal",
                                      //  'disabled': "disabled"
                                      });

        $taskAnchor.addClass("complete_span_disabled");

        $checkBox = $('<input type="checkbox" class="complete complete_checkbox_disabled" disabled>').attr({
          'id':   task.id.toString()
          }).prop('checked', task.completed);


      }


      //for color change upon clicking procrastinate button:
      if (task.postponed){
        $taskAnchor.addClass("postponed");
      }


      // $("#complete").prop('checked', task.completed);



      $taskLi.append($taskAnchor, $checkBox);

      $taskUl.append($taskLi);



    });

  });
}

  // ===========================================================
  //
  //
  //   Function to find task by id
  //
  // ============================================================

  function findByTaskId(task_id) {
    return $.grep(allTasks, function( n ) {
      return n.id === parseInt(task_id);
    })[0];
  }



$(function() {

  console.log("in applications.js file");
  console.log(window.location.pathname);

  var str = window.location.pathname;

  var usersPage = str.match(/^\/user$/);        //   "/user"

  var homePage = str.match(/^\/$/);             //   "/"


  if (usersPage || homePage) {


        // ===========================================================
        //
        //
        //   Load user's task list when page opens
        //
        // ============================================================

        var userId = $('div#userId').data('id');
        console.log('inside application.js  line 70');
        console.log("$('div#userId').attr('data-id')");
        console.log(userId);

        var changeTaskInHeaderFlag = true;

        reloadTasks(userId, changeTaskInHeaderFlag);

        // ===========================================================
        //
        //
        //   Trap create Task button click ( cross icon)
        //   ... and default due date to current date
        //
        // ============================================================
        $('#createTaskButton').on('click', function(event) {
          // populate the date field in the _taskcreatemodal.ejs template

          var objToday = new Date();

          var curYear = objToday.getFullYear();
          var curDay  = objToday.getDate();
          var curMonth = objToday.getMonth() + 1;

          if (curMonth < 10) { curMonth = "0" + curMonth;}

          if (curDay < 10) { curDay = "0" + curDay;}

          var finalDate = curYear + "-" + curMonth + "-" + curDay;

          $("#due_date").val(finalDate);
        });

        // ===========================================================
        //
        //
        //   Trap task list item click and open modal Bootstrap "task detail" window
        //
        // ============================================================
        // Attach a delegated event handler
        $('ul.tasks').on('click', 'a', function(event) {

          // load user's task data into modal

          event.preventDefault();
          var thisTask = findByTaskId(this.id);
          console.log(thisTask);
          console.log(thisTask.due_date);
          $('.taskDetails').html(
            "Task: " + thisTask.description + "<br/>" +
            "Due date: " + thisTask.due_date.substring(0,10)  + "<br/>" +
            "Recurring: " + (thisTask.recurring ? "Yes" : "No")  + "<br/>" +
            "Completed: " + (thisTask.completed ? "Yes" : "No")  + "<br/>" +
            "Postponed: " + (thisTask.postponed ? "Yes" : "No")  + "<br/>" +
            "Priority: " + thisTask.priority  + "<br/>"
            );
          $('div.details').attr({
            'id': $(this).attr("id")
          });

        });

        // ===========================================================
        //
        //
        //   Sort tasks by priority using sortByPriority button
        //
        // ============================================================

        $("#sortByPriority").on('click', function() {
          tinysort('ul.tasks>li', {selector: '.taskAnchor', data: 'priority', order: 'desc'});
          tinysort('ul.tasks>li', {selector: '.taskAnchor.complete_span_disabled', attr: 'priority', order: 'desc'});
        });


   } // end of user's Page  !!!

});
