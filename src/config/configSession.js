import session from "express-session";
import MongoStore from "connect-mongo";

const dbConnection = process.env.DB_CONNECTION
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const dbHost = process.env.DB_HOST
const dbPort = process.env.DB_PORT
const dbName = process.env.DB_NAME
// let url = `${dbConnection}://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`;
let url = `${dbConnection}://${dbHost}:${dbPort}/${dbName}`
let sessionStore = MongoStore.create({
  mongoUrl: url,
  autoRemove: "native",
});
const configSession = app => {
  app.use(
    session({
      secret: "keyboard cat",
      store: sessionStore,
      resave: true,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 86400 seconds = 1 day
      },
    })
  );
};

export default configSession;
