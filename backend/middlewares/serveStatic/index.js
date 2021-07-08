'use strict';
const fs = require('fs');
const path = require('path');
const serve = require('koa-static');

/**
 * Serve react hook
 */

module.exports = strapi => {

  return {
    async initialize() {
        const {maxAge, path: publicPath} = strapi.config.middleware.settings.public;
        const staticDir = path.resolve(strapi.dir, publicPath || strapi.config.paths.static);
        const webDir = path.resolve(strapi.dir, publicPath || strapi.config.paths.static, 'web');
        strapi.app.use(serve(staticDir));
        // strapi.app.use(serve(webDir));
    }
  };
};