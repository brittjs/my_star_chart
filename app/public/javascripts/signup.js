$(function() {

  $("#signUpButton").on('click', function(e) {
    if ($('#pwd1').val() != $('#pwd2').val()) {
      e.preventDefault();
      alert('Passwords do not match');
    } else {
      alert("You're all signed up!\nTime to sign in!");
    }
  });
 
});