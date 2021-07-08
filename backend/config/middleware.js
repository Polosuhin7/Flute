module.exports = {
  settings: {
    cors: {
      origin: ['http://localhost:1337', 'http://192.168.0.104:19006', 'http://localhost:19006', 'https://example.com', 'https://www.example.com'],
    },
    serveStatic: {
      enabled: true
    }
  }
};