$(document).ready(function(){
  $(".submit").on("click", function(){
    var randomNum = function(min, max) { return min + Math.floor(Math.random() * max); };
    var x_cord;
    var y_cord;

    var stars = [
      { x_cord: 50, y_cord: 50 },
      { x_cord: 100, y_cord: 100 },
      { x_cord: 200, y_cord: 200 }
    ];

    // $('body').append(stars.map(function(star){
    //   return $("<div/>").addClass("box").css({"left": star.x_cord, "top": star.y_cord}).addClass("changes");
    //   ;
    // }));

    var div = $("<div>").addClass("box").css({"left": randomNum(10, 1000), "top": randomNum(10, 400)});
    var addDiv = $("#basebox").append(div);
    // var addBox = $("#basebox").addClass("box");


    // .css({"left": randomNum(10,1254), "top": randomNum(10, 490)});
    // console.log(addBox); 


    setTimeout(function(){
      var eachBox = $(".box").each(function(index, box){
      // debugger
      $(box).css({left: stars[index].x_cord , top: stars[index].y_cord}).addClass("changes");
      });
    },1000)

    // eachBox.addClass("changes");




    // $("#box1").css({"left": stars[0].x_cord + "px", "top": stars[0].y_cord + "px"});

    // $("#box2").css({"left": stars[1].x_cord + "px", "top": stars[1].y_cord + "px"});

    // $("#box3").css({"left": stars[2].x_cord + "px", "top": stars[2].y_cord + "px"});

    // $(".box").addClass("changes");
  });
});
