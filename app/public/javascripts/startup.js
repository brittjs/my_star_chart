// ===========================================================
//
//    Global function
//
// ============================================================

var allTasks; // This needs to remain in the global scope, please do not move!

function dailyTaskRefresh(userId) {

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  allTasks.forEach(function(task) {
        // task.due_date should be "today"
    if (task.recurring === true && task.due_date === "2016-01-08 16:00:00-08" || task.postponed === true && task.completed === false) {
      
      var myTask = {description: task.description,
       due_date: tomorrow,
       priority: task.priority,
       recurring: task.recurring,
       postponed: false,
       completed: false,
       UserId: userId};

      $.post('/users/' + userId + '/tasks', myTask, function(task) {
        console.log("Create task submit button successful.");
        console.log("task = ", task);
        
      $.ajax({
        url: '/users/' + userId + '/tasks/' + task.id,
        type: 'DELETE',
        success: function() {
          console.log("done with delete");
      })

    } else {
      //nothing
    }
    reloadTasks(userId);


    });
}