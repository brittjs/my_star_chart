$(function(){
  $("#login-box-link").on("click", function(){
    $(this).addClass("active");
    $("#signup-box-link").removeClass("active");
    $(".login-container").addClass("show-container").removeClass("hide-container");
    $(".signup-container").addClass("hide-container").removeClass("show-container");
  });

  $("#signup-box-link").on("click", function(){
    $(this).addClass("active");
    $("#login-box-link").removeClass("active");
    $(".signup-container").addClass("show-container").removeClass("hide-container");
    $(".login-container").addClass("hide-container").removeClass("show-container");
  });
});
