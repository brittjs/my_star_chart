$(function(){
  $("#login-box-link").on("click", function(){
    $(".login-container").css("visibility", "visible");
    $(".signup-container").css("visibility", "hidden");
    // $(".signup-container").toggle();
  });

  $("#signup-box-link").on("click", function(){
    $(".signup-container").css("visibility", "visible");
    $(".login-container").css("visibility", "hidden");
     // $(".login-container").toggle();
  });
});