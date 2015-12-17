$(document).ready(function(){
  $(".submit").on("click", function(){
    var randomNum = function(min, max) { return min + Math.floor(Math.random() * max); };
    var positionX;
    var positionY;

    // var stars = [
    //   { positionX: randomNum(10, 1254), positionY: randomNum(10, 490) },
    //   { positionX: randomNum(10, 1254), positionY: randomNum(10, 490) },
    //   { positionX: randomNum(10, 1254), positionY: randomNum(10, 490) }
    // ];

    // $('body').append(stars.map(function(star){
    //   return $("<div/>").addClass("box").css({"left": star.positionX, "top": star.positionY}).addClass("changes");
    //   ;
    // }));

    var div = $("<div>").addClass("box").css({"left": randomNum(10, 1000), "top": randomNum(10, 400)});
    var addDiv = $("#basebox").append(div);
    // var addBox = $("#basebox").addClass("box");


    // .css({"left": randomNum(10,1254), "top": randomNum(10, 490)});
    // console.log(addBox); 


    var eachBox = $(".box").each(function(index, box){
      $(box).css({left: randomNum(10, 1000), top: randomNum(10, 400)})
    });

    eachBox.addClass("changes");




    // $("#box1").css({"left": stars[0].positionX + "px", "top": stars[0].positionY + "px"});

    // $("#box2").css({"left": stars[1].positionX + "px", "top": stars[1].positionY + "px"});

    // $("#box3").css({"left": stars[2].positionX + "px", "top": stars[2].positionY + "px"});

    // $(".box").addClass("changes");
  });
});