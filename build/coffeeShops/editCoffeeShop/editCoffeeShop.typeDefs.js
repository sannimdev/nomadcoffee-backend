"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServerExpress = require("apollo-server-express");

var _templateObject;

var _default = (0, _apolloServerExpress.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n    type EditCoffeeShopResult {\n        ok: Boolean!\n        error: String\n    }\n    type Mutation {\n        editCoffeeShop(\n            id: Int!\n            name: String\n            category: String\n            latitude: String\n            longitude: String\n        ): EditCoffeeShopResult!\n    }\n"])));

exports["default"] = _default;