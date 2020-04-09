const proxy = require("http-proxy-middleware");
const { igcallbackURL } = require("../../config/keys");
module.exports = function(app) {
  app.use(proxy("/auth/google", { target: "http://localhost:5000" }));
  app.use(proxy("/auth/instagram", { target: "http://localhost:5000" }));
  app.use(
    proxy("/auth/instagram/refresh/", { target: "http://localhost:5000" })
  );
  app.use(proxy("/api/**", { target: "http://localhost:5000" }));
};
