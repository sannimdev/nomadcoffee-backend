"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _client = _interopRequireDefault(require("../../client"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var _default = {
  User: {
    followers: function followers(_ref, _ref2) {
      var id = _ref.id;
      var followerLastId = _ref2.followerLastId;
      return _client["default"].user.findUnique({
        where: {
          id: id
        }
      }).followers(_objectSpread({
        take: 5,
        skip: !!followerLastId * 1
      }, followerLastId && {
        cursor: {
          id: followerLastId
        }
      }));
    },
    following: function following(_ref3, _ref4) {
      var id = _ref3.id;
      var followingLastId = _ref4.followingLastId;
      return _client["default"].user.findUnique({
        where: {
          id: id
        }
      }).following(_objectSpread({
        take: 5,
        skip: !!followingLastId * 1
      }, followingLastId && {
        cursor: {
          id: followingLastId
        }
      }));
    },
    totalFollowers: function totalFollowers(_ref5) {
      var id = _ref5.id;
      return _client["default"].user.count({
        where: {
          following: {
            some: {
              id: id
            }
          }
        }
      });
    },
    totalFollowing: function totalFollowing(_ref6) {
      var id = _ref6.id;
      return _client["default"].user.count({
        where: {
          followers: {
            some: {
              id: id
            }
          }
        }
      });
    }
  },
  Query: {
    seeProfile: function seeProfile(_, _ref7) {
      var username = _ref7.username;
      return _client["default"].user.findUnique({
        where: {
          username: username
        }
      });
    }
  }
};
exports["default"] = _default;