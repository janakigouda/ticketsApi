const User = require("../users/user.model");

const authMiddleWare = async (req, res, next) => {
    let token = req.headers.token;
    if (token) {
      let [id, email, password] = token.split(":");
      let user = await User.findById(id);
      if (user.email === email && user.password === password) {
        req.userId = id;
        next();
      } else {
        res
          .status(401)
          .send("Operation not allowed");
      }
    } else {
      res.status(401).send("Cannot perform this operation, missing permissions");
    }
  };

module.exports=authMiddleWare;