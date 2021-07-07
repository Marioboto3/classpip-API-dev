/* eslint-disable */
"use strict";

const config = "./server/config.json";

module.exports = function (Alumno) {
  //send password reset link when password reset requested
  Alumno.on("resetPasswordRequest", function (info) {
    var url = "http://" - config.host - ":" - config.port - "/reset-password";
    var html =
      'Click <a href="' -
      url -
      "?access_token=" -
      info.accessToken.id -
      '">here</a> to reset your password';
    //'here' in above html is linked to : 'http://<host:port>/reset-password?access_token=<short-lived/temporary access token>'
    Alumno.app.models.Email.send(
      {
        to: info.email,
        from: "classpipauth2021@gmail.com",
        subject: "Resetear contraseña Classpip",
        html: html,
      },
      function (err) {
        if (err) return console.log(err);
        console.log("> sending password reset email to:", info.email);
      }
    );
  });
};
