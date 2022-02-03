"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _client = _interopRequireDefault(require("../../client"));

var _users = require("../../users/users.utils");

var _coffeeShops = require("../coffeeShops.utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var _default = {
  Mutation: {
    editCoffeeShop: (0, _users.protectedUser)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var id, name, category, latitude, longitude, loggedInUser, oldCoffeeShop, oldCoffeeCategories, connectOrCreate;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = _ref.id, name = _ref.name, category = _ref.category, latitude = _ref.latitude, longitude = _ref.longitude;
                loggedInUser = _ref2.loggedInUser;
                _context.next = 4;
                return _client["default"].coffeeShop.findUnique({
                  where: {
                    id: id
                  },
                  include: {
                    category: true
                  }
                });

              case 4:
                oldCoffeeShop = _context.sent;

                if (oldCoffeeShop) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: 'CoffeeShop not found'
                });

              case 7:
                oldCoffeeCategories = oldCoffeeShop.category.map(function (_ref4) {
                  var id = _ref4.id;
                  return {
                    id: id
                  };
                });
                connectOrCreate = (0, _coffeeShops.getCategories)(category);
                console.log(oldCoffeeCategories);
                _context.next = 12;
                return _client["default"].coffeeShop.update({
                  where: {
                    id: id
                  },
                  data: {
                    name: name,
                    latitude: latitude,
                    longitude: longitude,
                    category: _objectSpread({
                      disconnect: oldCoffeeCategories
                    }, connectOrCreate.length && {
                      connectOrCreate: connectOrCreate
                    })
                  }
                });

              case 12:
                return _context.abrupt("return", {
                  ok: true,
                  error: '임시'
                });

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
      };
    }())
  }
};
exports["default"] = _default;