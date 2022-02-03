"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protectedUser = exports.getUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _client = _interopRequireDefault(require("../client"));

var getUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(token) {
    var SECRET_KEY, _jwt$verify, userId, user;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            SECRET_KEY = process.env.SECRET_KEY;

            if (token) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", null);

          case 4:
            _jwt$verify = _jsonwebtoken["default"].verify(token, SECRET_KEY), userId = _jwt$verify.id;

            if (!userId) {
              _context.next = 10;
              break;
            }

            _context.next = 8;
            return _client["default"].user.findUnique({
              where: {
                id: userId
              }
            });

          case 8:
            user = _context.sent;
            return _context.abrupt("return", user);

          case 10:
            _context.next = 16;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            console.error('getUser:', _context.t0);
            return _context.abrupt("return", null);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));

  return function getUser(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.getUser = getUser;

var protectedUser = function protectedUser(resolver) {
  return function (root, args, context, info) {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: 'Please log in to perform this action.'
      };
    }

    return resolver(root, args, context, info);
  };
};

exports.protectedUser = protectedUser;