
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

    $.ajax({
      url: '/api/users',
      type: 'POST',
      data: $form.serialize()
    })
    .done(response => {
      console.log(response)
    })
  })
}


$(function() {
  submitHandler()

})
