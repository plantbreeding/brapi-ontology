ClassModel = (function() {

    function ClassModel(classDef) {
        this.className = classDef.className;
        this.attributes = classDef.attributes;
        this.pk = classDef.pk;
        this.links = classDef.links;
        this.x = classDef.x;
        this.y = classDef.y;
        this.moduleName = classDef.moduleName;
        this.width = 150;
        this.height = 0;
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


    return ClassModel;
})();

PathLegModel = (function() {

    function PathLegModel(startPoint, isHorizantal, endPoint) {
        this.x1 = startPoint.x;
        this.y1 = startPoint.y;
        this.x2 = endPoint ? endPoint.x : startPoint.x;
        this.y2 = endPoint ? endPoint.y : startPoint.y;
        this.isHorizantal = isHorizantal;
    }

    PathLegModel.prototype.start = function() { return { "x": this.x1, "y": this.y1 }; }
    PathLegModel.prototype.end = function() { return { "x": this.x2, "y": this.y2 }; }

    PathLegModel.prototype.isUp = function() { return this.y1 > this.y2; }
    PathLegModel.prototype.isDown = function() { return this.y1 < this.y2; }
    PathLegModel.prototype.isRight = function() { return this.x1 > this.x2; }
    PathLegModel.prototype.isLeft = function() { return this.x1 < this.x2; }

    PathLegModel.prototype.x = function() {
        if (this.isHorizantal) {
            return null;
        } else {
            return this.x1;
        }
    }
    PathLegModel.prototype.y = function() {
        if (this.isHorizantal) {
            return this.y1;
        } else {
            return null;
        }
    }

    PathLegModel.prototype.step = function(number) {
        if (this.isHorizantal) {
            this.x2 = this.x2 + (number * 10);
        } else {
            this.y2 = this.y2 + (number * 10);
        }
    }

    PathLegModel.prototype.equals = function(leg2) {
        return (this.isHorizantal === leg2.isHorizantal) &&
            (this.x1 === leg2.x1) &&
            (this.y1 === leg2.y1) &&
            (this.x2 === leg2.x2) &&
            (this.y2 === leg2.y2);
    }


    return PathLegModel;
})();