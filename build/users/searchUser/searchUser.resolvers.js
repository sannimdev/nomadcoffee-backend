"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _client = _interopRequireDefault(require("../../client"));

var _default = {
  Query: {
    searchUsers: function searchUsers(_, _ref) {
      var keyword = _ref.keyword;
      return _client["default"].user.findMany({
        where: {
          username: {
            startsWith: keyword.toLowerCase()
          }
        }
      });
    }
  }
};
exports["default"] = _default;