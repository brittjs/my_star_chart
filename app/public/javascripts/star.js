$(function() {

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
          var $textDiv;
          var $div;
          var $innerDiv;
          var $hoverControl;

          console.log(star);

          //  get Task description
          $.get('users/' + userId + '/tasks/' + star.TaskId, function(task){

            $hoverControl = $("<div class='hover-control'>");

            // $textDiv = $("<div class='hidden-task-info'>").text('      ' + star.id + ' ' + task.description + ' x=' + star.x_cord + ' y=' +  star.y_cord);
            $textDiv = $("<div class='hidden-task-info'>").text('      ' + task.description);

            $hoverControl.append($textDiv);

            $starContainerDiv = $("<div>").addClass("star-container");
            $starDiv = $("<div>").addClass("star");

            $starContainerDiv.append($starDiv);
            $hoverControl.append($starContainerDiv);

            $("#basebox").append($hoverControl);

            $hoverControl.css({"left": star.x_cord+"%", "top": star.y_cord+"%"});

          });
        });
      });

    }
  }

  paintStarsInTheSky();

});
