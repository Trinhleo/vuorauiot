'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Gardens Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/gardens',
      permissions: '*'
    }, {
      resources: '/api/gardens/:gardenId',
      permissions: '*'
    },
    {
      resources: '/api/gardens/:gardenId/approve',
      permissions: '*'
    }]
  },{
    roles: ['user'],
    allows: [{
      resources: '/api/gardens',
      permissions: '*'
    }, {
      resources: '/api/gardens/:gardenId',
      permissions: '*'
    }]
  }]);
};

/**
 * Check If Gardens Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Garden is being processed and the current user created it then allow any manipulation
  if (req.garden && req.user && req.garden.user && req.garden.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Lỗi xác thực!');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'Người dùng không được xác thực'
        });
      }
    }
  });
};
