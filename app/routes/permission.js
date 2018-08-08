// middleware for doing role-based permissions
const Boom = require('boom');

module.exports = (...allowed) => {
  const isAllowed = (clearanceLevels) => {
    const intersection = new Set([...allowed].filter(x => clearanceLevels.includes(x)));
    return intersection.size > 0;
  };
  // return a middleware
  return (req, res, next) => {
    if (req.user && isAllowed(req.user.clearanceLevels)) {
      next(); // role is allowed, so continue on the next middleware
    } else {
      throw Boom.forbidden('missing required access'); // user is forbidden
    }
  };
};
