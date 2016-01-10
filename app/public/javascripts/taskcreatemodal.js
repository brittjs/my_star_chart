$(function() {

  console.log("in taskcreatemodal.js file");
  console.log(window.location.pathname);

  var str = window.location.pathname;

  var usersPage = str.match(/^\/view$/);

  var homePage = str.match(/^\/$/);


  if (usersPage || homePage) {

      var userId = $('div#userId').data('id');
      console.log("$('div#userId').data('id')");
      console.log(userId);

      // ===========================================================
      //
      //    _taskcreatemodal.ejs    handle Submit button clicked on create Task form
      //
      //  Request to create new Task is sent to server.
      //
      // ============================================================

      $("#createTaskForm").on('submit', function(e) {
        e.preventDefault();

        var taskDescription = $("#description").val();
        var dueDate = $("#due_date").val();
        var taskPriority = $("#priority").val();
        var recurringCheckbox = $("#recurring").is(":checked");

        var myTask = {description: taskDescription,
         due_date: dueDate+" 00:00:00.000 -08:00",
         priority: taskPriority,
         recurring: recurringCheckbox,
         postponed: false,
         completed: false,
         UserId: userId};

        $.post('/users/' + userId + '/tasks', myTask, function(task) {
          console.log("Create task submit button successful.");
          console.log("task = ", task);
          reloadTasks(userId);
        })

        .fail( function(xhr, textStatus, errorThrown) {
          alert(xhr.responseText);
          console.log(xhr.responseText);
        });

        $('#createTaskForm').trigger("reset");
        $("#addTaskModal").modal('hide');
      });

  }

});

