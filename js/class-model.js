function ClassModel(className, attributes, links, x, y, width, height) {
    this.className = className;
    this.attributes = attributes;
    this.links = links;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.classG;
}
ClassModel.prototype.leftX = function() { return this.x; };
ClassModel.prototype.midX = function() { return this.x + this.width / 2; };
ClassModel.prototype.rightX = function() { return this.x + this.width; }
ClassModel.prototype.topY = function() { return this.y; }
ClassModel.prototype.midY = function() { return this.y + this.height / 2; }
ClassModel.prototype.bottomY = function() { return this.y + this.height; }

ClassModel.prototype.anchor = function(anchorId) {
    if (anchorId in this.anchors)
        return this.anchors[anchorId];
    throw 'anchorId is not found: ' + anchorId
}
ClassModel.prototype.anchorX = function(anchorId) {
    if (anchorId in this.anchors)
        return this.anchors[anchorId].x;
    throw 'anchorId is not found: ' + anchorId
}
ClassModel.prototype.anchorY = function(anchorId) {
    if (anchorId in this.anchors)
        return this.anchors[anchorId].y;
    throw 'anchorId is not found: ' + anchorId
}