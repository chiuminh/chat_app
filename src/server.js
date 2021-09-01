import express from "express";
import path from "path";
import flash from "connect-flash";
import connectDB from "./config/connectDB";
import configSession from "./config/configSession";
import initRoutes from "./routes/index";
import passport from "passport";

const app = express();

// Connect db
connectDB();

// Config session
configSession(app);

// Enable post data for request
app.use(express.urlencoded({ extended: true }));

// Config view engine
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Enable flash message
app.use(flash());

// init passport
app.use(passport.initialize());
app.use(passport.session());

// init all routes
app.use(express.json());
initRoutes(app);

app.listen(process.env.APP_PORT, () =>
  console.log(`App listening at http://localhost:${process.env.APP_PORT}`)
);

/**
 * 
import https from "https";
import pem from "pem";
pem.createCertificate({ days: 1, selfSigned: true }, (err, keys) => {
  if (err) throw err;
  const app = express();

  // Connect db
  connectDB();

  // Config session
  configSession(app);

  // Enable post data for request
  app.use(express.urlencoded({ extended: true }));

  // Config view engine
  app.use(express.static(path.join(__dirname, "public")));
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "pug");

  // Enable flash message
  app.use(flash());

  // init passport
  app.use(passport.initialize());
  app.use(passport.session());

  // init all routes
  app.use(express.json());
  initRoutes(app);
  https
    .createServer({ key: keys.serviceKey, cert: keys.certificate }, app)
    .listen(process.env.APP_PORT);
});
*/
