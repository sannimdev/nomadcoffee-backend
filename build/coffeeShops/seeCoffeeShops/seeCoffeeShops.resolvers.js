"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _client = _interopRequireDefault(require("../../client"));

var _coffeeShops = require("../coffeeShops.utils");

var _default = {
  Query: {
    seeCoffeeShops: function () {
      var _seeCoffeeShops = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref) {
        var _ref$page, page, _getPagination, take, skip;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _ref$page = _ref.page, page = _ref$page === void 0 ? 1 : _ref$page;
                _getPagination = (0, _coffeeShops.getPagination)(page), take = _getPagination.take, skip = _getPagination.skip;
                return _context.abrupt("return", _client["default"].coffeeShop.findMany({
                  take: take,
                  skip: skip
                }));

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function seeCoffeeShops(_x, _x2) {
        return _seeCoffeeShops.apply(this, arguments);
      }

      return seeCoffeeShops;
    }()
  }
};
exports["default"] = _default;