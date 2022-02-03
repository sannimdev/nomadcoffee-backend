"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _client = _interopRequireDefault(require("../../client"));

var _default = {
  Mutation: {
    login: function () {
      var _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref) {
        var username, password, getLoginResult, user, isVerified, SECRET_KEY, token;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                username = _ref.username, password = _ref.password;
                _context.prev = 1;

                getLoginResult = function getLoginResult() {
                  var ok = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
                  var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
                  var token = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
                  return {
                    ok: ok,
                    error: error,
                    token: token
                  };
                };

                _context.next = 5;
                return _client["default"].user.findFirst({
                  where: {
                    username: username
                  }
                });

              case 5:
                user = _context.sent;

                if (user) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", getLoginResult(false, 'Not found username'));

              case 8:
                _context.next = 10;
                return _bcrypt["default"].compare(password, user.password);

              case 10:
                isVerified = _context.sent;

                if (isVerified) {
                  _context.next = 13;
                  break;
                }

                return _context.abrupt("return", getLoginResult(false, 'Incorrect Password'));

              case 13:
                SECRET_KEY = process.env.SECRET_KEY;
                token = _jsonwebtoken["default"].sign({
                  id: user.id
                }, SECRET_KEY);
                return _context.abrupt("return", getLoginResult(true, null, token));

              case 18:
                _context.prev = 18;
                _context.t0 = _context["catch"](1);
                console.error(_context.t0);

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 18]]);
      }));

      function login(_x, _x2) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }
};
exports["default"] = _default;