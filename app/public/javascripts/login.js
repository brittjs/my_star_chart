$(function(){
  $("#login-box-link").on("click", function(){
    $(".signup-container").addClass("animated fadeOut");
  });

  $("#signup-box-link").on("click", function(){
    $(".login-container").addClass("animated fadeOut");
  });
});