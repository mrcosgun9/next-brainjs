const express = require("express");
const next = require("next");
const compression = require("compression");
const port = parseInt(process.env.PORT, 10) || 3001;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
app.prepare().then(() => {
  const server = express();
  server.use(compression());

  server.use(function (req, res, next) {
    req.url = req.originalUrl.replace("/nextjs_custom_server/_next", "/_next");
    next(); // be sure to let the next middleware handle the modified request.
  });

  server.get("/_next/*", (req, res) => {
    handle(req, res);
  });
  server.get("/listUsers", function (req, res) {
    res.status(200).json({
      data: "Merhaba dünya",
    });
  });
  server.all("*", (req, res) => {
    handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server ready on ${port}`);
  });
});
