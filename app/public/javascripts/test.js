$(document).ready(function(){
  $(".submit").on("click", function(){
    var randomNum = function(min, max) { return min + Math.floor(Math.random() * max); };
    var positionX;
    var positionY;

    var stars = [
      { positionX: 50, positionY: 50 },
      { positionX: 100, positionY: 100 },
      { positionX: 200, positionY: 200 }
    ];

    // $('body').append(stars.map(function(star){
    //   return $("<div/>").addClass("box").css({"left": star.positionX, "top": star.positionY}).addClass("changes");
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
      $(box).css({left: stars[index].positionX , top: stars[index].positionY}).addClass("changes");
      });
    },1000)

    // eachBox.addClass("changes");




    // $("#box1").css({"left": stars[0].positionX + "px", "top": stars[0].positionY + "px"});

    // $("#box2").css({"left": stars[1].positionX + "px", "top": stars[1].positionY + "px"});

    // $("#box3").css({"left": stars[2].positionX + "px", "top": stars[2].positionY + "px"});

    // $(".box").addClass("changes");
  });
});
