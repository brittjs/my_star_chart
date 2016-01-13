$(function() {

  $("#signUpButton").on('click', function(e) {
    if (
      $('#signUpName').val() === ""
      ) {
      e.preventDefault();
      alert('Username is blank');
    } else if (
      $('#signUpEmail').val() ===""
      ) {
      e.preventDefault();
      alert('Email is blank');
    } else if (
      $('#pwd1').val() ===""
      ) {
      e.preventDefault();
      alert('Password is blank');
    } else if (
      $('#pwd1').val().length < 8
      ) {
      e.preventDefault();
      alert('Password must be at least 8 characters');
    } else if (
      $('#pwd1').val() != $('#pwd2').val()
      ) {
      e.preventDefault();
      alert('Passwords do not match');
    } else{
      alert("You're all signed up!\nTime to sign in!");
    }
  });
 
// this is not the best way to do this.

});