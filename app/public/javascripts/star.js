
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
            var div = $("<div>").addClass("star-container");
            // var textDiv = $("<div class='hidden-task-info'>").text(star.id + ' ' + task.description + ' x=' + star.x_cord + ' y=' +  star.y_cord);
            $("#basebox").append(div);
            $("<div>").addClass("star").appendTo(div);
            // var addStar = div.append(newStar);
            $(div).css({"left": star.x_cord+"%", "top": star.y_cord+"%"});
          });
        });

     }
  }

  paintStarsInTheSky();

});
