"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _client = _interopRequireDefault(require("../client"));

var _default = {
  CoffeeShop: {
    categories: function categories(_ref) {
      var id = _ref.id;
      return _client["default"].category.findMany({
        where: {
          coffeeShops: {
            some: {
              id: id
            }
          }
        }
      });
    }
  },
  Category: {
    totalShops: function totalShops(_ref2) {
      var id = _ref2.id;
      return _client["default"].coffeeShop.count({
        where: {
          category: {
            some: {
              id: id
            }
          }
        }
      });
    }
  }
};
exports["default"] = _default;