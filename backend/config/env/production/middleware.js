module.exports = {
  settings: {
    cors: {
      enabled: true,
      origin: ['https://flutes.herokuapp.com', 'https://flute-service.herokuapp.com', 'https://flute-mobile.herokuapp.com'],
    },
    serveStatic: {
      enabled: true
    }
  }
};