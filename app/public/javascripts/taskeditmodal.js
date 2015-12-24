

$(function() {

  console.log("in taskeditmodal.js file");
  console.log(window.location.pathname);

  var str = window.location.pathname;

  var usersPage = str.match(/^\/view$/);

  var homePage = str.match(/^\/$/);


  if (usersPage || homePage) {

      // var userId = 2;
      var userId = $('div#userId').attr('data-id');
      console.log("$('div#userId').attr('data-id')");
      console.log(userId);


       /* taskeditmodal.js */

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
                          console.log("#saveEditButton click ajax PUT was suceessful.");
                          console.log("data returned ", data);
                        },
                error: function (xhr, ajaxOptions, thrownError) {
                          console.log("#saveEditButton click ajax PUT failed.");
                          console.log("status = " + xhr.status);
                          console.log("xhr.responseText = " + xhr.responseText);
                        }
            });
      });



      // ===========================================================
      //
      //   _taskeditmodal.ejs
      //
      //   Prepopulate Edit form when modal window opens
      //
      //       moved to "taskdetailsmodal.js"  on "Edit" button click event
      //       Steph cannot figure out how to execute on hide/show
      //
      // ============================================================

      // function prepopulateEditForm(task) {


      //   $("#Edescription").val(task.description);
      //   $("#Edue_date").val(task.due_date);
      //   $("#Epriority").val(task.priority);
      //   $("#Erecurring").val(task.recurring);
      // }


  }

});
