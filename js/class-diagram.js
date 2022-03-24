d3.classDiagram = (function() {
    function addMarkers(defs) {

        defs.append("marker")
            .attr("id", "filledTraiangle")
            .attr("viewBox", "0 0 10 10")
            .attr("refX", 10)
            .attr("refY", 5)
            .attr("markerWidth", 10)
            .attr("markerHeight", 10)
            .attr("orient", "auto")

        .append("path")
            .attr("d", "M10 5 0 0 0 10Z")
            .attr("fill-rule", "evenodd")
            .attr("stroke", "none")
            .attr("fill", "black");

        defs.append("marker")
            .attr("id", "triangle")
            .attr("viewBox", "0 0 10 10")
            .attr("refX", 10)
            .attr("refY", 5)
            .attr("markerWidth", 10)
            .attr("markerHeight", 10)
            .attr("orient", "auto")

        .append("path")
            .attr("d", "M10 5 0 0 0 10 Z M8 5 1 8.4 1 1.6Z")
            .attr("fill-rule", "evenodd")
            .attr("stroke", "none")
            .attr("fill", "black")


        defs.append("marker")
            .attr("id", "arrowhead")
            .attr("viewBox", "0 0 10 10")
            .attr("refX", 10)
            .attr("refY", 5)
            .attr("markerWidth", 10)
            .attr("markerHeight", 10)
            .attr("orient", "auto")

        .append("path")
            .attr("d", "M10 5 0 10 0 8.7 6.8 5.5 0 5.5 0 4.5 6.8 4.5 0 1.3 0 0Z")
            .attr("stroke", "none")
            .attr("fill", "black")

        defs.append("marker")
            .attr("id", "diamond")
            .attr("viewBox", "0 0 16 10")
            .attr("refX", 16)
            .attr("refY", 5)
            .attr("markerWidth", 16)
            .attr("markerHeight", 10)
            .attr("orient", "auto")

        .append("path")
            .attr("d", "M-1 5 7.5 0 16 5 7.5 10Z M1.3 5 7.5 8.7 14 5 7.5 1.3Z")
            .attr("fill-rule", "evenodd")
            .attr("stroke", "none")
            .attr("fill", "black")

        defs.append("marker")
            .attr("id", "filledDiamond")
            .attr("viewBox", "0 0 16 10")
            .attr("refX", 16)
            .attr("refY", 5)
            .attr("markerWidth", 16)
            .attr("markerHeight", 10)
            .attr("orient", "auto")

        .append("path")
            .attr("d", "M-1 5 7.5 0 16 5 7.5 10Z")
            .attr("stroke", "none")
            .attr("fill", "black")

    }

    function createClasses(classes, svg) {
        var g = svg.selectAll("g.class")
            .data(classes).enter()

        .append("g")
            .attr("id", function(d) { return d.classname + ")Class"; })
            .attr("class", "class")
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")" })


        g.append("rect")
            .attr("width", function(d) { return d.width; })
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", 1)

        var classNameG = g.append("g")
            .attr("class", "classname");
        var classNameRects = classNameG.append("rect")
            .attr("width", function(d) { return d.width; })
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", 1)

        var classNameTexts = classNameG.append("text")
            .attr("font-size", 12)
            .call(d3.multilineText()
                .verticalAlign("top")
                .paddingTop(4)
                .paddingBottom(4)
                .text(function(d) { return d.classname; }));

        adjustHeight(classNameRects.nodes(), classNameTexts.nodes(), 4, 4);

        function adjustHeight(rects, texts, paddingTop, paddingBottom) {
            var i,
                n = rects.length,
                rect,
                text,
                height;
            for (i = 0; i < n; i++) {
                rect = rects[i];
                text = texts[i];
                height = getBBox(d3.select(text)).height + paddingTop + paddingBottom;
                d3.select(rect).attr("height", height);
            }
        }

        var attributesG = g.append("g")
            .attr("class", "attributes")
            .attr("transform", function(d) {
                var classNameG = d3.select(this.previousSibling),
                    height = getBBox(classNameG).height;
                return "translate(0," + height + ")";
            })

        var attributesRects = attributesG.append("rect")
            .attr("width", function(d) { return d.width; })
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", 1)

        var attributesTexts = attributesG.append("text")
            .attr("font-size", 12)
            .call(d3.multilineText()
                .text(function(d) { return d.attributes; })
                .verticalAlign("top")
                .horizontalAlign("left")
                .paddingTop(4)
                .paddingLeft(4));

        adjustHeight(attributesRects.nodes(), attributesTexts.nodes(), 4, 4);

        var methodsG = g.append("g")
            .attr("class", "methods")
            .attr("transform", function(d) {
                var attributesG = d3.select(this.previousSibling),
                    attributesBBox = getBBox(attributesG),
                    classNameText = d3.select(this.previousSibling.previousSibling),
                    classNameBBox = getBBox(classNameText);
                return "translate(0," + (classNameBBox.height + attributesBBox.height) + ")";
            });

        var methodsRects = methodsG.append("rect")
            .attr("width", function(d) { return d.width; })
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", 1)

        var methodsTexts = methodsG.append("text")
            .attr("font-size", 12)
            .call(d3.multilineText()
                .text(function(d) { return d.methods; })
                .verticalAlign("top")
                .horizontalAlign("left")
                .paddingTop(4)
                .paddingLeft(4));

        adjustHeight(methodsRects.nodes(), methodsTexts.nodes(), 4, 4);

        svg.selectAll("g.class")
            .each(function(d, i) {
                var classG = d3.select(this),
                    classRect = classG.node().firstChild,
                    classNameG = d3.select(classRect.nextSibling),
                    attributesG = d3.select(classNameG.nextSibling),
                    methodsG = d3.select(attributesG.nextSibling),
                    height =
                    getBBox(classNameG).height +
                    getBBox(attributesG).height +
                    getBBox(methodsG).height;
                d3.select(classRect).attr("height", height);
            });

        var boxes = {};
        svg.selectAll("g.class")
            .each(function(d, i) {
                var classG = d3.select(this),
                    bbox = getBBox(classG);
                boxes[d.classname] = new d3.classDiagram.Box(d.x, d.y, bbox.width, bbox.height);
            });

        return boxes;
    }

    function Box(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    Box.prototype.leftX = function() { return this.x; };
    Box.prototype.midX = function() { return this.x + this.width / 2; };
    Box.prototype.rightX = function() { return this.x + this.width; }
    Box.prototype.topY = function() { return this.y; }
    Box.prototype.midY = function() { return this.y + this.height / 2; }
    Box.prototype.bottomY = function() { return this.y + this.height; }

    function createConnectors(connectors, svg) {
        var line = d3.line()
            .x(function(d) { return d.x; })
            .y(function(d) { return d.y; });

        svg.selectAll("path.connector")
            .data(connectors).enter().append("path")
            .each(function(d, i) {
                var path = d3.select(this);
                path.attr("class", "connector")
                    .attr("d", line(d.points))
                    .attr("stroke", "black")
                    .attr("stroke-width", 1)
                    .attr("fill", "none")
                if (d.markerEnd) {
                    path.attr("marker-end", "url(#" + d.markerEnd + ")");
                }
            });

        svg.selectAll("path.connector")

        .attr("stroke-dasharray", function(d) {
                var path = d3.select(this),
                    totalLength = path.node().getTotalLength(),
                    marker = svg.select("#" + d["markerEnd"]).node(),
                    markerWidth = marker.markerWidth.baseVal.value;
                return "" + (totalLength - markerWidth) + " " + markerWidth;
            })
            .attr("stroke-dashoffset", 0)

    }

    function getBBox(elt) {
        if (elt.node()) {
            const clonedElt = elt.clone(true);
            const svg = d3.create('svg');
            svg.node().appendChild(clonedElt.node());
            document.body.appendChild(svg.node());
            const { x, y, width, height } = clonedElt.node().getBBox();
            document.body.removeChild(svg.node());
            return { x, y, width, height };
        } else {
            return { x: 0, y: 0, width: 0, height: 0 };
        }
    }

    return {
        Box: Box,
        addMarkers: addMarkers,
        createClasses: createClasses,
        createConnectors: createConnectors
    };
})();