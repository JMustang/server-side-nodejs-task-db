const jwt = require("jsonwebtoken");

const checkAuth = (role) => {
  return (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: "Authorization type is empty!" });
    }

    if (authorization.split(" ")[0] !== "Bearer") {
      return res
        .status(401)
        .json({ message: "Authorization type Bearer was not send" });
    }

    const SECRET_KEY = process.env.SECRET_KEY;
    if (!SECRET_KEY) {
      return res
        .status(401)
        .json({ message: "Environment SECRET_KEY is empty!" });
    }

    try {
      const { id, roles } = jwt.verify(authorization.split(" ")[1], SECRET_KEY);
      let isRole = false;
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].role === role) {
          isRole = true;
          break;
        }
      }

      if (!isRole) {
        return res.status(403).json({ error: "Forbidden Role" });
      }
      req.user_id = id;
      next();
    } catch (error) {
      return res.status(401).json(error);
    }
  };
};

module.exports = {
  checkAuth,
};
