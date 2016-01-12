$(function() {

  function paintStarsInTheSky() {
    var str = window.location.pathname;

    var usersPage = str.match(/^\/user$/);

    var homePage = str.match(/^\/$/);


    if (usersPage || homePage) {

      var userId = $('div#userId').attr('data-id');
 
      $.get('users/' + userId + '/stars', function(stars){
        stars.forEach(function(star){
          var $textDiv;
          var $innerDiv;
          var $hoverControl;
          var $starContainerDiv;
          var $starDiv;
  
          //  get Task description
          $.get('users/' + userId + '/tasks/' + star.TaskId, function(task){
 
            $hoverControl = $("<div>").addClass("hover-control");
 
            $textDiv = $("<div>").addClass("hidden-task-info").text('      ' + task.description);
 
            $hoverControl.append($textDiv);
 
            $starContainerDiv = $("<div>").addClass("star-container");
            $starDiv = $("<div>").addClass("star");
 
            $starContainerDiv.append($starDiv);
            $hoverControl.append($starContainerDiv);
 
            $("#basebox").append($hoverControl);
 
            $hoverControl.css({"left": star.x_cord+"%", "top": star.y_cord+"%"});

          });
 // 
        });
      });
  
    }
  }

  paintStarsInTheSky();

});
