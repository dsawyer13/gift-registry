
'use strict';



  // function handleSignupSubmit() {
  //
  //   $('.signup-form').submit(function(e) {
  //     e.preventDefault();
  //     createAccount({
  //       username: $(e.currentTarget).find('.username').val(),
  //       password: $(e.currentTarget).find('.password').val(),
  //       firstName: $(e.currentTarget).find('.firstName').val(),
  //       lastName: $(e.currentTarget).find('.lastName').val()
  //     });
  //   });
  // }
  //
  // function createAccount(userInfo) {
  //
  //   console.log(userInfo);
  //
  //   $.ajax({
  //     method: 'POST',
  //     url: '/api/users',
  //     data: JSON.stringify(data),
  //     success: function(data) {
  //       console.log(data)
  //     },
  //     dataType: 'json',
  //     contentType: 'application/json'
  //   })
  //   });)
  // }

  function submitHandler() {
    $('.signup-form').on('submit', '.signup-button', function(event) {

    event.preventDefault();

    console.log($('.username').val());

    // let formData = {
    //   username: $('.username').val(),
    //   password: $('.password').val(),
    //   firstName: $('.firstName').val(),
    //   lastName: $('.lastName').val()
    // }
    //
    // $.ajax({
    //   url: 'https://powerful-mountain-84317.herokuapp.com/api/users',
    //   method: 'POST',
    //   data: formData,
    //   contentType: 'application/json',
    //   success: function(data) {
    //     console.log(JSON.stringify(data));
    //   }
    })
  })
}


$(function() {
  submitHandler()

})
