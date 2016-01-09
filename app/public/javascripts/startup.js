$(function() {

  console.log("inside startup.js");

  var str = window.location.pathname;

  var usersPage = str.match(/^\/user$/);

  var homePage = str.match(/^\/$/);

  if (usersPage || homePage) {

    var userId = $('div#userId').data('id');

  //   function dailyTaskRefresh() {

  //     console.log("inside dailyTaskRefresh");

  //     var today = new Date();
  //     today.setHours(0,0,0,0);
  //     console.log("today: "+today);

  //     var yesterday = new Date();
  //     yesterday.setDate(yesterday.getDate() - 1);
  //     yesterday.setHours(0,0,0,0);
  //     console.log("yesterday: "+yesterday);

  //     allTasks.forEach(function(task) {

  //       var dueDate = task.due_date;
  //       dueDate.setHours(0,0,0,0);

  //       if (dueDate === yesterday && (task.recurring === true || task.postponed === true)) {
          
  //         var myTask = {description: task.description,
  //          due_date: today,
  //          priority: task.priority,
  //          recurring: task.recurring,
  //          postponed: false,
  //          completed: false,
  //          UserId: userId};

  //         $.post('/users/' + userId + '/tasks', myTask, function(task) {
  //           console.log("Create task submit button successful.");
  //           console.log("task = ", task);
  //         });
            
  //           if (task.completed === false) {
  //             $.ajax({
  //               url: '/users/' + userId + '/tasks/' + task.id,
  //               type: 'DELETE',
  //               success: function() {
  //                 console.log("done with delete");
  //               }
  //             });
  //           } else {
  //             //nothing
  //           }
  //       } else {
  //         //nothing
  //       }
  //       reloadTasks(userId);
  //     });
  //   }
  }
  // dailyTaskRefresh();
});