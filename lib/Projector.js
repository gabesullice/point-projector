"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Edge = require("libshapes/lib/Edge");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Projector = function () {
  function Projector() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$boundsOriginal = _ref.boundsOriginal,
        boundsOriginal = _ref$boundsOriginal === undefined ? [[0, 0], [100, 100]] : _ref$boundsOriginal,
        _ref$boundsProjected = _ref.boundsProjected,
        boundsProjected = _ref$boundsProjected === undefined ? [[0, 0], [100, 100]] : _ref$boundsProjected,
        _ref$reflectX = _ref.reflectX,
        reflectX = _ref$reflectX === undefined ? false : _ref$reflectX;

    _classCallCheck(this, Projector);

    this.boundsOriginal(boundsOriginal);
    this.boundsProjected(boundsProjected);
    this.reflectX = reflectX;
  }

  _createClass(Projector, [{
    key: "boundsOriginal",
    value: function boundsOriginal(bounds) {
      if (bounds !== undefined) {
        this._ob = new _Edge.Edge(bounds);
      }
      return [[this._ob.left().x, this._ob.left().y], [this._ob.right().x, this._ob.right().y]];
    }
  }, {
    key: "boundsProjected",
    value: function boundsProjected(bounds) {
      if (bounds !== undefined) {
        this._pb = new _Edge.Edge(bounds);
      }
      return [[this._pb.left().x, this._pb.left().y], [this._pb.right().x, this._pb.right().y]];
    }
  }, {
    key: "project",
    value: function project(point) {
      var xp = point[0],
          yp = point[1];

      var scaleX = edgeHeight(this._pb) / edgeHeight(this._ob);
      xp = (xp - this._ob.midpoint().x) * scaleX + this._pb.midpoint().x;

      var scaleY = edgeWidth(this._pb) / edgeWidth(this._ob);
      yp = (yp - this._ob.midpoint().y) * scaleY + this._pb.midpoint().y;

      return this.reflectX ? [xp, -yp] : [xp, yp];
    }
  }]);

  return Projector;
}();

exports.default = Projector;


function edgeHeight(edge) {
  return edge.right().x - edge.left().x;
}

function edgeWidth(edge) {
  return edge.top().y - edge.bottom().y;
}