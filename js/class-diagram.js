d3.classDiagram = (function() {

    function createClassTitle(classObj, classNameG) {

        var classNameRect = classNameG.append("rect")
            .attr("id", classObj.className + "-className")
            .attr("width", classObj.width)
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", 1)

        var classNameText = classNameG.append('text')
            .attr("id", classObj.className + "-classNameText")
            .attr("font-size", 12)
            .attr('text-anchor', 'left')
            .attr('fill', 'black');
        if (typeof window.showDataType === 'function') { 
          classNameText.attr('onclick', "showDataType('" + classObj.className + "');");
        }

        classNameText.append('tspan')
            .attr('x', '0.5em')
            .attr('y', '1.3em')
            .text(classObj.className);

        classNameRect.attr("height", getBBox(classNameText).height + 8);

    }

    function createClassAttributes(classObj, classAttributesG) {
        var attributesRects = classAttributesG.append("rect")
            .attr("width", classObj.width)
            .attr("fill", "#b4ffb4")
            .attr("stroke", "black")
            .attr("stroke-width", 1)

        var attributesTexts = classAttributesG
            .call(d3.multilineText()
                .text(classObj.attributes)
                .className(classObj.className)
                .width(classObj.width)
                .height(classObj.height)
                .verticalAlign("top")
                .horizontalAlign("left")
                .paddingTop(4)
                .paddingLeft(4));

        attributesRects.attr("height", getBBox(attributesTexts).height + 8);
    }

    function createClassAnchors(classObj, classG) {
        var bbox = getBBox(classG),
            anchors = {};

        classObj.attributes.forEach((attribute, i) => {
            var id = classObj.className + "-" + attribute;
            var classNameBBox = getBBox(classG.select("#" + classObj.className + "-className"));
            var attributeBBox = getBBox(classG.select("#" + id));
            anchors[id] = { x: classObj.x + bbox.width, y: classObj.y + classNameBBox.height + attributeBBox.y + 8 }
        });

        anchors[classObj.className] = { x: classObj.x, y: classObj.y + 11 }

        classObj.anchors = anchors;
    }

    function createClass(classObj, classG) {

        var classRect = classG.append("rect")
            .attr("width", classObj.width)
            .attr("fill", "#6ed26e")
            .attr("stroke", "black")
            .attr("stroke-width", 1)

        var classNameG = classG.append("g")
            .attr("class", "className");

        createClassTitle(classObj, classNameG);

        var classAttributesG = classG.append("g")
            .attr("class", "attributes")
            .attr("transform", function(d) {
                var height = getBBox(classNameG).height;
                return "translate(0," + height + ")";
            });

        createClassAttributes(classObj, classAttributesG);

        createClassAnchors(classObj, classG);

        classObj.height = getBBox(classNameG).height + getBBox(classAttributesG).height;
        classRect.attr("height", classObj.height);

    }

    function createClasses(classes, classContainer) {

        classesMap = {};
        classes.forEach(classObj => {
            var classG = classContainer.append("g")
                .attr("id", classObj.className + "Class")
                .attr("class", "class")
                .attr("transform", "translate(" + classObj.x + "," + classObj.y + ")")
                // .data(classObj)
                .on("click", function(d) {
                    console.log("Test");
                    console.log(d);
                })

            createClass(classObj, classG);
            classObj.classG = classG;

            classesMap[classObj.className] = classObj;
        });

        // adjustHeight(classNameRects.nodes(), classNameTexts.nodes(), 4, 4);
        // adjustHeight(attributesRects.nodes(), attributesTexts.nodes(), 4, 4);

        // classContainer.selectAll("g.class")
        //     .each(function(d, i) {
        //         var classG = d3.select(this),
        //             classRect = classG.node().firstChild,
        //             classNameG = d3.select(classRect.nextSibling),
        //             attributesG = d3.select(classNameG.nextSibling),
        //             // methodsG = d3.select(attributesG.nextSibling),
        //             height =
        //             getBBox(classNameG).height +
        //             getBBox(attributesG).height;
        //         // getBBox(methodsG).height;
        //         d3.select(classRect).attr("height", height);
        //     });


        return classesMap;
    }

    function createConnectors(connectors, svg) {
        var line = d3.line()
            .x(function(d) { return d.x; })
            .y(function(d) { return d.y; });

        svg.selectAll("path.connector")
            .data(connectors).enter().append("path")
            .each(function(d, i) {
                var path = d3.select(this);
                path.attr("class", "connector")
                    .attr("id", d.id)
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

    return {
        addMarkers: addMarkers,
        createClasses: createClasses,
        createConnectors: createConnectors
    };
})();