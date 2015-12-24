// ===========================================================
//
//    Global function
//
//    reloadTasks() is called in _taskcreatemodal.ejs when Submit button clicked
//    reloadTasks() is called in user.html.ejs when delete checkbox is clicked
//
// ============================================================

var allTasks; // This needs to remain in the global scope, please do not move!

function reloadTasks(userId) {

  $(".tasks").empty();

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
  };



$(function() {

  console.log("in applications.js file");
  console.log(window.location.pathname);

  var str = window.location.pathname;

  var usersPage = str.match(/^\/view$/);

  var homePage = str.match(/^\/$/);


  if (usersPage || homePage) {


        // ===========================================================
        //
        //
        //   Load user's task list when page opens
        //
        // ============================================================

        var userId = $('div#userId').attr('data-id');
        console.log('inside application.js  line 70');
        console.log("$('div#userId').attr('data-id')");
        console.log(userId);

        $.get('users/' + userId + '/tasks', function(tasks){

          // find the <ul>
          var $taskUl = $('ul.tasks');

          var $taskLi;

          allTasks = tasks;

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

   } // end of user's Page  !!!

});