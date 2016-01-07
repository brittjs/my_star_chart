
  $(document).ready(function() {
    // Execute some code here

    $.ajaxSetup({ cache: true });
    $.getScript('http://connect.facebook.net/en_US/sdk.js', function(){

      FB.init({
        appId      : '154766431560901',
        xfbml      : true,
        version    : 'v2.5',
        redirect_uri : 'http://localhost:3000'
      });

      // put your code here
      // Any code that you want to run after the SDK is loaded should be placed
      // within this function and after the call to FB.init.
      // Any kind of JavaScript can be used here, but any SDK functions must be called after FB.init.

      // FB.ui({
      //   method: 'feed',
      //   link: 'https://developers.facebook.com/docs/',
      //   caption: 'An example caption',
      // }, function(response){
      //   // Debug response (optional)
      //   console.log(response);
      //   // Note that response.error_message will appear only
      //   // if someone using your app has authenciated your app with Facebook Login.
      // });

      // FB.ui({
      //   display: 'popup',
      //   method: 'share',
      //   href: 'https://developers.facebook.com/docs/',
      // }, function(response){
      //   // Debug response (optional)
      //   console.log(response);
      //   // Note that response.error_message will appear only
      //   // if someone using your app has authenciated your app with Facebook Login.
      // });

     //  required in FB.ui  when using method: 'share'
     // href: 'https://developers.facebook.com/docs/',

     });

  });

