//import { hash, compare } from "bcryptjs";

/*export const login: RequestHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  UserSchema.findOne({ where: { email } })
    .then((user) => {
      if (user) {
        compare(password, user.get().password, (_error, success) => {
          if (success) {
            signJWT(user, (error, token) => {
              if (error) {
                return res.status(401).json("Unable to authenticate");
              } else {
                return res.status(200).json({
                  message: "Successfully authenticated",
                  token,
                  user,
                  statusCode: res.statusCode,
                });
              }
            });
          } else {
            return res.status(401).json("Password didn't match");
          }
        });
      } else {
        return res.status(404).json("User not found");
      }
    })
    .catch((error) => {
      return res.status(500).json(error.message);
    });
};

export const register: RequestHandler = (req, res) => {
  const { email, password }: { email: string; password: string } = req.body;

  hash(password, 10, async (error, hash) => {
    if (error) {
      return res.status(500).json(error.message);
    }
    if (password.trim()) {
      UserSchema.create({ email, password: hash })
        .then((data) => {
          signJWT(data, (_error, token) => {
            return res
              .status(200)
              .json({ message: "User successfully created", token });
          });
        })
        .catch((error) => {
          return res.status(500).json(error.message);
        });
    } else {
      return res.status(500).json("Please enter the password");
    }
  });
};

export const getUsers: RequestHandler = (_req, res) => {
  UserSchema.findAll()
    .then((data) => {
      return res
        .status(200)
        .json({ message: "Users successfully fetched", data: data });
    })
    .catch(() => {
      return res.status(500).json("Something went wrong");
    });
};*/
