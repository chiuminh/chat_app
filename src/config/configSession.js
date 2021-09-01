import session from "express-session";
import MongoStore from "connect-mongo";

let url = `${process.env.DB_CONNECTION}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
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
