import postsApiRoute from "./api/posts";
import userApiRoutes from "./api/users";
import homeRoutes from "./homeRoutes";
import profileRoutes from "./profileRoutes";

export default function (app) {
  app.use("/api/users", userApiRoutes);
  app.use("/api/posts", postsApiRoute);
  app.use("/profile", profileRoutes);

  app.use("/", homeRoutes);
}
