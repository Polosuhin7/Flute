module.exports = ({ env }) => ({
    host: env('HOST', '0.0.0.0'),
    port: env('PORT', 80),
    url: env('https://flute-service.herokuapp.com/'),
  });
   