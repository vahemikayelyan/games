/*const extractJWT: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    verify(token, config.token.secret, (error, decoded) => {
      if (error) {
        return res.status(401).json(error.message);
      }

      res.locals.jwt = decoded;
      next();
    });
  } else {
    return res.status(401).json("Unauthorized");
  }
};

export default extractJWT;*/
