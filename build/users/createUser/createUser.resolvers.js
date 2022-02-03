"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _client = _interopRequireDefault(require("../../client"));

var _default = {
  Mutation: {
    createUser: function () {
      var _createUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref) {
        var username, email, name, location, password, avatarURL, githubUsername, existedUser, encryptedPassword;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                username = _ref.username, email = _ref.email, name = _ref.name, location = _ref.location, password = _ref.password, avatarURL = _ref.avatarURL, githubUsername = _ref.githubUsername;
                _context.prev = 1;
                _context.next = 4;
                return _client["default"].user.findFirst({
                  where: {
                    OR: [{
                      username: username
                    }, {
                      email: email
                    }]
                  }
                });

              case 4:
                existedUser = _context.sent;

                if (!existedUser) {
                  _context.next = 7;
                  break;
                }

                throw new Error('The username or email is already taken.');

              case 7:
                _context.next = 9;
                return _bcrypt["default"].hash(password, 10);

              case 9:
                encryptedPassword = _context.sent;
                _context.next = 12;
                return _client["default"].user.create({
                  data: {
                    username: username,
                    email: email,
                    name: name,
                    location: location,
                    password: encryptedPassword,
                    avatarURL: avatarURL,
                    githubUsername: githubUsername
                  }
                });

              case 12:
                return _context.abrupt("return", {
                  ok: true
                });

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](1);
                return _context.abrupt("return", {
                  ok: false,
                  error: _context.t0
                });

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 15]]);
      }));

      function createUser(_x, _x2) {
        return _createUser.apply(this, arguments);
      }

      return createUser;
    }()
  }
};
exports["default"] = _default;