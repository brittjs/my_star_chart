$(document).ready(function(){
  $(".submit").on("click", function(){

    var positionX;
    var positionY;

    var stars = [
      { positionX: 100, positionY: 150 },
      { positionX: 250, positionY: 270 },
      { positionX: 345, positionY: 500 }
    ];

    $("#box1").css({"left": stars[0].positionX + "px", "top": stars[0].positionY + "px"});

    $("#box2").css({"left": stars[1].positionX + "px", "top": stars[1].positionY + "px"});

    $("#box3").css({"left": stars[2].positionX + "px", "top": stars[2].positionY + "px"});

    $(".box").addClass("changes");
  });
});