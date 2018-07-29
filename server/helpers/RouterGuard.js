const httpStatus = require('http-status');
const APIError = require('./APIError');


module.exports.permissions = () => {
  return ['ADMIN', 'USER', 'MANAGER'];
};

module.exports.checkPermission = (routerPermissions) => {

  const _middleware = (req,res,next) => {
    if (routerPermissions.indexOf(req.user.role) < 0) {
      return next(new APIError('Insufficient Permissions', httpStatus.UNAUTHORIZED, true));
    }
    return next();
  };
  return _middleware;
};
