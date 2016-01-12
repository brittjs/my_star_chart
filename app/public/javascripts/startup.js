// function dailyTaskRefresh (userId) {

//   console.log("inside dailyTaskRefresh");
  
//   var today = new Date();
//   today.setHours(0,0,0,0);

//   $.get('users/' + userId + '/old/tasks', function(tasks){

//     var oldTasks = tasks;

//     oldTasks.forEach(function(task) {

//       if (task.recurring === true || task.postponed === true) {
//         //create duplicate task with today as due date
//         var myTask = {description: task.description,
//          due_date: today,
//          priority: task.priority,
//          recurring: task.recurring,
//          postponed: false,
//          completed: false,
//          UserId: userId};

//         $.post('/users/' + userId + '/tasks', myTask, function(task) {
//           console.log("Create of task "+task.id+" successful.");
//           console.log("task = ", task);
//         });
//       }

//       if (task.completed === false) {
//         //delete incomplete tasks
//         $.ajax({
//           url: '/users/' + userId + '/tasks/' + task.id,
//           type: 'DELETE',
//           success: function() {
//             console.log("done with delete task "+task.id);
//           }
//         });
//       } else {
//         //change recurring to false.
//         var myTask = {id: task.id,
//          description: task.description,
//          due_date: task.due_date,
//          priority: task.priority,
//          recurring: false,
//          postponed: false,
//          completed: task.completed,
//          UserId: userId};

//         $.ajax({
//           type: "PUT",
//           url:  'users/' + userId + '/tasks/' + task.id,
//           contentType: "application/json",
//           data: JSON.stringify(myTask),
//           success: function(data) {
//             console.log("removed recurring flag from yesterday's completed task "+task.id)
//           },
//           error: function (xhr, ajaxOptions, thrownError) {
//             alert(xhr.responseText);
//           }
//         });
//       }
//     });
  
//   // reloadTasks(userId);
//   });
// yield next;
// }
