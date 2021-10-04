const logger = (req, res, next) => {
  console.log(`${req.protocol}://${req.get("host")}${req.originalUrl}`.underline.bold.cyan)
  next()
}
export default logger