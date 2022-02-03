"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _client = _interopRequireDefault(require("../../client"));

var _coffeeShops = require("../coffeeShops.utils");

var _default = {
  Query: {
    seeCategory: function seeCategory(_, _ref) {
      var id = _ref.id,
          page = _ref.page;

      var _getPagination = (0, _coffeeShops.getPagination)(page),
          take = _getPagination.take,
          skip = _getPagination.skip;

      return _client["default"].coffeeShop.findMany({
        where: {
          category: {
            some: {
              id: id
            }
          }
        },
        take: take,
        skip: skip
      });
    }
  }
};
exports["default"] = _default;