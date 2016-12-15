import {Edge} from "libshapes/lib/Edge";

export default class Projector {

  constructor({boundsOriginal = [[0,0], [100,100]], boundsProjected = [[0,0], [100,100]], reflectX = false} = {}) {
    this.boundsOriginal(boundsOriginal);
    this.boundsProjected(boundsProjected);
    this.reflectX = reflectX;
  }

  boundsOriginal(bounds) {
    if (bounds !== undefined) {
      this._ob = new Edge(bounds);
    }
    return [
      [this._ob.left().x, this._ob.left().y],
      [this._ob.right().x, this._ob.right().y],
    ];
  }

  boundsProjected(bounds) {
    if (bounds !== undefined) {
      this._pb = new Edge(bounds);
    }
    return [
      [this._pb.left().x, this._pb.left().y],
      [this._pb.right().x, this._pb.right().y],
    ];
  }

  project(point) {
    let xp = point[0], yp = point[1];

    const scaleX = edgeHeight(this._pb) / edgeHeight(this._ob);
    xp = ((xp - this._ob.midpoint().x) * scaleX) + this._pb.midpoint().x;

    const scaleY = edgeWidth(this._pb) / edgeWidth(this._ob);
    yp = ((yp - this._ob.midpoint().y) * scaleY) + this._pb.midpoint().y;
    
    return (this.reflectX) ? [xp, -yp] : [xp, yp];
  }

}

function edgeHeight(edge) {
  return edge.right().x - edge.left().x;
}

function edgeWidth(edge) {
  return edge.top().y - edge.bottom().y;
}
