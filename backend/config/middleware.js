module.exports = {
  settings: {
    cors: {
      origin: ['http://localhost:1337', 'http://192.168.0.104:19006', 'http://localhost:19006', 'https://flutes.herokuapp.com'],
    },
    serveStatic: {
      enabled: true
    }
  }
};