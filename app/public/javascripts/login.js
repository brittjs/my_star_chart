$(function(){
  $("#login-box-link").on("click", function(){
    $(".login-container").show();
    $(".signup-container").hide();
    // $(".signup-container").toggle();
  });

  $("#signup-box-link").on("click", function(){
    $(".signup-container").show();
    $(".login-container").hide();
     // $(".login-container").toggle();
  });
});