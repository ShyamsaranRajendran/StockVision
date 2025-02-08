const jwt = require("jsonwebtoken");

module.exports = {
  decodeToken: (token) => {
    try {
      const decoded = jwt.decode(token, { complete: true });
      return decoded; 
    } catch (error) {
      return { error: "Invalid token" };
    }
  },
};
