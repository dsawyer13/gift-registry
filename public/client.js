'use strict';

$(document).ready(function() {

  $('.signup-form').submit(function(event) {
    event.preventDefault();
    ajaxPost();
  });

  function ajaxPost() {

      let username = $('.uname').val();
      let password = $('.pwd').val();
      let firstName = $('.firstName').val();
      let lastName = $('.lastName').val();
      let formData = {'username': username, 'password': password, 'firstName': firstName, 'lastName': lastName};

      $.ajax({
        type: 'POST',
        url: window.location + '/api/users',
        data: JSON.strigify(formData),
        dataType: 'json',
        success: function(data){
          $('.test').html("<p>" +
        data.username + "</p>");
      },
      error: function(e) {
        alert("Error")
        console.log("Error: ", e);
      }
    });
  }

})
