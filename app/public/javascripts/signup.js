$(function() {

  $("#signUpButton").on('click', function(e) {
    if ($('#pwd1').val() != $('#pwd2').val()) {
      e.preventDefault();
      alert('Passwords do not match');
    } else if ($'#signUpName').val() === "") {
      e.preventDefault();
      alert('Username is blank');
    } else if ($'#signUpEmail').val() ==="") {
      e.preventDefault();
      alert('Email is blank');
    } else {
      alert("You're all signed up!\nTime to sign in!");
    }
  });
 
});