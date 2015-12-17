$(document).ready(function(){
   var userId = 2;

   $.get('users/' + userId + '/stars', function(stars){
    console.log(stars);
   }); 


  $(".submit").on("click", function(){
    var randomNum = function(min, max) { return min + Math.floor(Math.random() * max); };
    var x_cord;
    var y_cord;

    var stars = [
      { x_cord: 50, y_cord: 50 },
      { x_cord: 100, y_cord: 100 },
      { x_cord: 200, y_cord: 200 }
    ];

  //   var div = $("<div>").addClass("box").css({"left": randomNum(10, 1000), "top": randomNum(10, 400)});
  //   var addDiv = $("#basebox").append(div);

  //   setTimeout(function(){
  //     var eachBox = $(".box").each(function(index, box){
  //     $(box).css({left: stars[index].x_cord , top: stars[index].y_cord}).addClass("changes");
  //     });
  //   },1000)
  // });

  // $("#star").on("click", function(){
  //   $("#star-container").addClass("move");
  // });

    var div = $("<div>").addClass("star-container").css({"left": randomNum(10, 1000), "top": randomNum(10, 400)});
    var addDiv = $("#basebox").append(div);
    var newStar = $("<div>").addClass("star");
    var addStar = div.append(newStar);

    setTimeout(function(){
      var eachStar = $(".star-container").each(function(index, star){
      $(this).css({"left": stars[index].x_cord, "top": stars[index].y_cord}).addClass("move");
      });
    },1000)
  });
   
});
