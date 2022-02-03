"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fs = require("fs");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _graphqlUpload = require("graphql-upload");

var _client = _interopRequireDefault(require("../../client"));

var _users = require("../users.utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var _default = {
  Upload: _graphqlUpload.GraphQLUpload,
  Mutation: {
    editProfile: (0, _users.protectedUser)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var name, location, newPassword, githubUsername, avatar, loggedInUser, avatarURL, _yield$avatar, filename, createReadStream, savedPath, newFilename, readStream, writeStream, oldFilename, encryptedPassword;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                name = _ref.name, location = _ref.location, newPassword = _ref.password, githubUsername = _ref.githubUsername, avatar = _ref.avatar;
                loggedInUser = _ref2.loggedInUser;
                _context.prev = 2;
                avatarURL = loggedInUser.avatarURL || null;

                if (!avatar) {
                  _context.next = 18;
                  break;
                }

                _context.next = 7;
                return avatar;

              case 7:
                _yield$avatar = _context.sent;
                filename = _yield$avatar.filename;
                createReadStream = _yield$avatar.createReadStream;
                savedPath = process.cwd() + '/uploads/' + loggedInUser.id;
                newFilename = "".concat(Date.now()).concat(filename);
                readStream = createReadStream();
                writeStream = (0, _fs.createWriteStream)(savedPath + '/' + newFilename);

                if (avatarURL) {
                  oldFilename = avatarURL.substring(avatarURL.lastIndexOf('/'));
                  (0, _fs.unlink)(savedPath + oldFilename, function () {});
                }

                if (!(0, _fs.existsSync)(savedPath)) (0, _fs.mkdirSync)(savedPath);
                readStream.pipe(writeStream);
                avatarURL = "http://localhost:4000/static/".concat(newFilename);

              case 18:
                encryptedPassword = null;

                if (!newPassword) {
                  _context.next = 23;
                  break;
                }

                _context.next = 22;
                return _bcrypt["default"].hash(newPassword, 10);

              case 22:
                encryptedPassword = _context.sent;

              case 23:
                _context.next = 25;
                return _client["default"].user.update({
                  where: {
                    id: loggedInUser.id
                  },
                  data: _objectSpread(_objectSpread({
                    name: name,
                    location: location,
                    githubUsername: githubUsername
                  }, newPassword && {
                    password: encryptedPassword
                  }), {}, {
                    avatarURL: avatarURL
                  })
                });

              case 25:
                return _context.abrupt("return", {
                  ok: true
                });

              case 28:
                _context.prev = 28;
                _context.t0 = _context["catch"](2);
                return _context.abrupt("return", {
                  ok: false,
                  error: _context.t0
                });

              case 31:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 28]]);
      }));

      return function (_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
      };
    }())
  }
};
exports["default"] = _default;