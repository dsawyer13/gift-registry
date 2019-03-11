'use strict';


const jwtToken = localStorage.getItem('token');

function createAccount() {
  $('.signup-form').submit('.form-submit', function(e) {
    e.preventDefault();

    //pull data from forms
    const formData = {
      username: $('.username').val(),
      password: $('.password').val(),
      firstName: $('.firstName').val(),
      lastName: $('.lastName').val()
      };
      const loginData = {
        username: $('.username').val(),
        password: $('.password').val()
      };
    //post user info to DB
    $.ajax({
      method: 'POST',
      url: '/api/users',
      data: JSON.stringify(formData),
      success: function(data) {

        const fullName = data.firstName + ' ' + data.lastName;
        localStorage.setItem('fullName', fullName);

        localStorage.setItem('username', data.username)

        getToken(loginData);
      },
      error: function(err) {
        $('.error-message').text(err.responseJSON.message);
      },
      dataType: 'json',
      contentType: 'application/json'
    })
  });
}

//get jwtToken from server
function getToken(loginData) {

  $.ajax({
    method: 'POST',
    url: '/api/auth/login',
    data: JSON.stringify(loginData),
    //set token in localStorage and pass token to next function
    success: function(data) {

      const token = data.authToken;
      localStorage.setItem('token', token);

      authenticateUser(token);
    },
    error: function(err) {
      $('.error-message').text('Incorrect Username or Password');
    },
    dataType: 'json',
    contentType: 'application/json'
  });
}


//use token to access protected endpoint
function authenticateUser(token) {
    const username = localStorage.getItem('username');

    $.ajax({
      method: 'GET',

       url: `/api/gifts/${username}`,
       headers: {
         'Authorization': `Bearer ${jwtToken}`
       },
      success: function(data) {

        window.location.href = '/home';
        localStorage.setItem('gifts', JSON.stringify(data));
      },
      error: function(err) {
        console.log(err);
      },
      dataType: 'json',
      contentType: 'application/json'
  })
}


function goToLogin() {
  $('.access-login').click(function() {
    window.location.href = '/login';
  })
}

function goToRegister() {
  $('.access-register').click(function() {
    window.location.href = '/';
  })
}

//validated user by checking if an empty response sent back
function verifyExistingUser() {
  $('.login-form').submit('.login-submit', function(e) {
    e.preventDefault();
    const username = $('.username').val()
    $.ajax({
      method: 'GET',
      url: `/api/users/verify/${username}`,
      success: function(data) {
        if(data === null) {
          $('.error-message').text('Incorrect username or password')
        } else {
          existingUserLogin()
        }
      }
    })
  })
}

function existingUserLogin() {
   // $('.login-form').submit('.login-submit', function(e) {
   //   e.preventDefault();
     const loginData = {
       username: $('.username').val(),
       password: $('.password').val()
     };
     const username = $('.username').val();
     $.ajax({
       method: 'GET',
       url: `/api/users/${username}`,
       success: function(data) {

         const fullName = data[0].firstName + " " + data[0].lastName;
         localStorage.setItem("fullName", fullName)
         localStorage.setItem("username", data[0].username)
         getToken(loginData);
       },
       error: function(err) {
         console.log(err);
       }
     })
   }
 //}

//if there is a token set in localStorage, verify it is valid
 function checkKey() {
   if(jwtToken) {
     $.ajax({
       method: 'GET',
       url: '/api/protected',
       headers: {
         'Authorization': `Bearer ${jwtToken}`
       },
       success: function(data) {
         window.location.href='/home';
       },
       error: function(err) {
         getRefreshToken(jwtToken);
       },
     })
   }
 }

function getRefreshToken(jwtToken) {
  $.ajax({
    method: 'POST',
    url: '/api/auth/refresh',
    headers: {
      'Authorization': `Bearer ${jwtToken}`
    },
    success: function(data) {
      localStorage.setItem('token',data.authToken);
    }
  })
}



$(function() {
  createAccount();
  goToLogin();
  goToRegister();
  checkKey();
  verifyExistingUser();
});
