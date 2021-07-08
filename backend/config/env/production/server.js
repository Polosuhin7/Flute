module.exports = ({ env }) => {
  console.log('env', env)
  return {
    host: env('HOST', '0.0.0.0'),
    port: env('$PORT'),
    url: env('https://flute-service.herokuapp.com/'),
  }
};
   