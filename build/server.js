"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _apolloServerExpress = require("apollo-server-express");

var _graphqlUpload = require("graphql-upload");

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _schema = require("./schema");

var _users = require("./users/users.utils");

require('dotenv').config();

var PORT = process.env.PORT || 4000;

var startServer = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var server, app;
    return _regenerator["default"].wrap(function _callee2$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            server = new _apolloServerExpress.ApolloServer({
              typeDefs: _schema.typeDefs,
              resolvers: _schema.resolvers,
              context: function () {
                var _context = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref2) {
                  var req;
                  return _regenerator["default"].wrap(function _callee$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          req = _ref2.req;
                          _context2.next = 3;
                          return (0, _users.getUser)(req.headers.token);

                        case 3:
                          _context2.t0 = _context2.sent;
                          return _context2.abrupt("return", {
                            loggedInUser: _context2.t0
                          });

                        case 5:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee);
                }));

                function context(_x) {
                  return _context.apply(this, arguments);
                }

                return context;
              }()
            });
            _context3.next = 3;
            return server.start();

          case 3:
            app = (0, _express["default"])();
            app.use((0, _morgan["default"])('tiny'));
            app.use('/static', _express["default"]["static"]('uploads'));
            app.use((0, _graphqlUpload.graphqlUploadExpress)());
            server.applyMiddleware({
              app: app
            });
            _context3.next = 10;
            return new Promise(function (func) {
              return app.listen({
                port: PORT
              }, func);
            });

          case 10:
            console.log("\uD83E\uDD64 Server is running on http://localhost:".concat(PORT, "/graphql"));

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee2);
  }));

  return function startServer() {
    return _ref.apply(this, arguments);
  };
}();

startServer();