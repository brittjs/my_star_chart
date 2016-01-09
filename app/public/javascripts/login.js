$(function(){
  $("#login-box-link").on("click", function(){
    $(this).addClass("active");
    $("#signup-box-link").removeClass("active");
    $(".login-container").css("visibility", "visible");
    $(".signup-container").css("visibility", "hidden");
    // $(".signup-container").toggle();
  });

  $("#signup-box-link").on("click", function(){
    $(this).addClass("active");
    $("#login-box-link").removeClass("active");
    $(".signup-container").css("visibility", "visible");
    $(".login-container").css("visibility", "hidden");
     // $(".login-container").toggle();
  });
});