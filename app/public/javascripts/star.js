$(document).ready(function(){

  // var userId = $('div#userId').attr('data-id');
  // console.log("$('div#userId').attr('data-id')");
  // console.log(userId);

  // $.get('users/' + userId + '/stars', function(stars){
  //   stars.forEach(function(star){
  //     // console.log(star);
  //     // var x_cord;
  //     // var y_cord;
  //     var div = $("<div>").addClass("star-container");
  //     $("#basebox").append(div);
  //     $("<div>").addClass("star").appendTo(div);
  //     // var addStar = div.append(newStar);
  //     $(div).css({"left": star.x_cord+"%", "top": star.y_cord+"%"});
  //   });
  // });


  //test code 1 - on click star animation starts -> animation working

  // $(".submit").on("click", function(){
  //   var x_cord;
  //   var y_cord;

  //   var stars = [
  //     { x_cord: 150, y_cord: 150 },
  //     { x_cord: 200, y_cord: 200 },
  //     { x_cord: 300, y_cord: 300 },
  //     { x_cord: 242, y_cord: 350}
  //   ];

  //   var div = $("<div>").addClass("new-star-container");
  //   var addDiv = $("#basebox").append(div);
  //   var newStar = $("<div>").addClass("new-star");
  //   var addStar = div.append(newStar);

  //   setTimeout(function(){
  //     var eachStar = $(".new-star-container").each(function(index, star){
  //       // console.log(star);
  //       $(star).css({"left": stars[index].x_cord, "top": stars[index].y_cord});
  //     });  
  //   }, 1000)

  //   setTimeout(function(){
  //     $(".new-star").each(function(index, astar){
  //       // console.log(astar);
  //       $(astar).addClass("star-changes");
  //     });  
  //   }, 1500)
  // });

  //-------------- comment out above for now  --------------

  //end test code 1

  //test code 4 - when checkbox clicked want to generate star and move it to x and y positions specified in database;


  // testing for "hello" below - works if have form on page but not yet with newly created task

  // $(".complete").on("change",function(){
  //   if($(this).prop('checked')){
  //     console.log("Hello");
  //   }
  // });

  //animation for user having task id 25 with test x and y cords
  
  // $(".tasks li #25.complete").on("change",function(){
  //   if($(".tasks li #25.complete").prop('checked')){
  //     //want to perform a get request for star with that specific task id
  //     //users/userId/tasks/taskId/stars
  //     //eg. users/6/tasks/25/stars
  //     //still have to find out how to get taskId
  //     $.get('users/' + userId + '/tasks' + taskId + '/stars', function(stars){
  //       var x_cord;
  //       var y_cord;

  //       var stars = [
  //         { x_cord: 150, y_cord: 150 },
  //         { x_cord: 200, y_cord: 200 },
  //         { x_cord: 300, y_cord: 300 },
  //         { x_cord: 242, y_cord: 350}
  //       ];

  //       var div = $("<div>").addClass("new-star-container");
  //       var addDiv = $("#basebox").append(div);
  //       var newStar = $("<div>").addClass("new-star");
  //       var addStar = div.append(newStar);

  //       setTimeout(function(){
  //         var eachStar = $(".new-star-container").each(function(index, star){
  //           // console.log(star);
  //           $(star).css({"left": stars[index].x_cord, "top": stars[index].y_cord});
  //         });  
  //       }, 1000)

  //       setTimeout(function(){
  //         $(".new-star").each(function(index, astar){
  //           // console.log(astar);
  //           $(astar).addClass("star-changes");
  //         });  
  //       }, 1500)
  //     });
  //   }
  // });


  //end test code 4

  //test code 2 - changes into a red circle and expands 

  // $("#test-two").on("click", function(){
    // var div = $("<div>").addClass("test-star-container");
    // var addDiv = $("#basebox").append(div);
    // var testStar = $("<div>").addClass("test-star");
    // var addStar = div.append(testStar);

    // setTimeout(function(){
    //   var eachStar = $(".test-star").each(function(index, star){
    //     $(star).addClass("test-star-expand");
    //   });  
    // }, 1000)

  //   var testStar = $("<div>").addClass("test-star");
  //   var addTestStar = $("#basebox").append(testStar);

  //   setTimeout(function(){
  //     testStar.addClass("expand")
  //   }, 1000); 
  //     var eachStar = $(".star-container").each(function(index, star){
  //       $(star).css({"left": stars[index].x_cord, "top": stars[index].y_cord}).addClass("move");
  //     });
  //   }, 1000)

  // });

  //end test code 2


  //good code

  // $(".submit").on("click", function(){
  //   var randomNum = function(min, max) { return min + Math.floor(Math.random() * max); };
  //   var x_cord;
  //   var y_cord;

   //end of good code

    // var stars = [
    //   { x_cord: 50, y_cord: 50 },
    //   { x_cord: 100, y_cord: 100 },
    //   { x_cord: 200, y_cord: 200 }
    // ];

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

  //more good code

  //   var div = $("<div>").addClass("star-container").css({"left": randomNum(10, 1000), "top": randomNum(10, 400)});
  //   var addDiv = $("#basebox").append(div);
  //   var newStar = $("<div>").addClass("star");
  //   var addStar = div.append(newStar);

  //   setTimeout(function(){
  //     var eachStar = $(".star-container").each(function(index, star){
  //     $(this).css({"left": stars[index].x_cord, "top": stars[index].y_cord}).addClass("move");
  //     });
  //   },1000)
  // });

  //end good code

  //test code 3 - rotations, keyframe animations
  // $("#test-three").on("click", function(){
  //   var x_cord;
  //   var y_cord;

  //   var stars = [
  //     { x_cord: 150, y_cord: 150 },
  //     { x_cord: 200, y_cord: 200 },
  //     { x_cord: 300, y_cord: 300 },
  //     { x_cord: 242, y_cord: 350}
  //   ];
    
  //   var div = $("<div>").addClass("test-star-container");
  //   var addDiv = $("#basebox").append(div);
  //   var testStar = $("<div>").addClass("test-star");
  //   var addStar = div.append(testStar); 

  //   setTimeout(function(){
  //     var eachStar = $(".test-star-container").each(function(index, star){
  //       // console.log(star);
  //       $(star).css({"left": stars[index].x_cord, "top": stars[index].y_cord});
  //     });  
  //   }, 1000)
    
  //   setTimeout(function(){
  //     var eachStar = $(".test-star").each(function(index, star){
  //       $(star).addClass("changes");
  //     });  
  //   }, 1000)
  // }); 

// ---------------------------------------------------------

//after merge conflicts - from master:

  var str = window.location.pathname;

  var usersPage = str.match(/^\/view$/);

  var homePage = str.match(/^\/$/);


  if (usersPage || homePage) {



      var userId = $('div#userId').data('id');
      console.log("$('div#userId').data('id')");
      console.log(userId);

      $.get('users/' + userId + '/stars', function(stars){
        stars.forEach(function(star){
          var div = $("<div>").addClass("star-container");
          $("#basebox").append(div);
          $("<div>").addClass("star").appendTo(div);
          // var addStar = div.append(newStar);
          $(div).css({"left": star.x_cord+"%", "top": star.y_cord+"%"});
        });
      });


      //test code 1

      // $(".submit").on("click", function(){
      //   var x_cord;
      //   var y_cord;

      //   var stars = [
      //     { x_cord: 150, y_cord: 150 },
      //     { x_cord: 200, y_cord: 200 },
      //     { x_cord: 300, y_cord: 300 },
      //     { x_cord: 242, y_cord: 350}
      //   ];

      //   var div = $("<div>").addClass("new-star-container");
      //   var addDiv = $("#basebox").append(div);
      //   var newStar = $("<div>").addClass("new-star");
      //   var addStar = div.append(newStar);

      //   setTimeout(function(){
      //     var eachStar = $(".new-star-container").each(function(index, star){
      //       // console.log(star);
      //       $(star).css({"left": stars[index].x_cord, "top": stars[index].y_cord});
      //     });
      //   }, 1000)

      //   setTimeout(function(){
      //     $(".new-star").each(function(index, astar){
      //       // console.log(astar);
      //       $(astar).addClass("star-changes");
      //     });
      //   }, 1500)
      // });

   }
});
