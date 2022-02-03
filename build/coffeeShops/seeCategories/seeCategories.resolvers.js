"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _client = _interopRequireDefault(require("../../client"));

var _default = {
  Query: {
    seeCategories: function () {
      var _seeCategories = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref) {
        var _ref$page, page, take, skip;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _ref$page = _ref.page, page = _ref$page === void 0 ? 1 : _ref$page;
                take = 5;
                skip = (page - 1) * take;
                return _context.abrupt("return", _client["default"].category.findMany({
                  take: take,
                  skip: skip
                }));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function seeCategories(_x, _x2) {
        return _seeCategories.apply(this, arguments);
      }

      return seeCategories;
    }()
  }
};
exports["default"] = _default;