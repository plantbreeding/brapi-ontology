ClassService = (function() {

    function buildClassModels(modules) {

        var moduleData = UMLInputClasses;

        var classes = []
        if (modules.includes("core")) {
            classes = classes.concat(translateModules(modules, "core", moduleData["BrAPI-Core"]));
        }
        if (modules.includes('pheno')) {
            classes = classes.concat(translateModules(modules, "pheno", moduleData["BrAPI-Phenotyping"]));
        }
        if (modules.includes('geno')) {
            classes = classes.concat(translateModules(modules, "geno", moduleData["BrAPI-Genotyping"]));
        }
        if (modules.includes('germ')) {
            classes = classes.concat(translateModules(modules, "germ", moduleData["BrAPI-Germplasm"]));
        }
        return classes;
    }

    function translateModules(modules, moduleName, moduleData) {
        var dx = 0,
            dy = 0;

        if (modules.indexOf(moduleName) == 1) {
            dx = 1200
            dy = 0
        }
        if (modules.indexOf(moduleName) == 2) {
            dx = 0
            dy = 900
        }
        if (modules.indexOf(moduleName) == 3) {
            dx = 1200
            dy = 900
        }

        var classArr = [];
        moduleData.forEach(classDef => {
            // classDef.x = (Math.random() * 4000) | 0;
            // classDef.y = (Math.random() * 4000) | 0;
            var classObj = new ClassModel(classDef);
            classObj.x = classObj.x + dx;
            classObj.y = classObj.y + dy;
            classObj.moduleName = moduleName;

            classArr.push(classObj);

        });

        return classArr;
    }

    function createClassTitle(classObj, classNameG) {
        var classNameText = classNameG.append('text')
            .attr("id", classObj.className + "-classNameText")
            .attr("font-size", 12)
            .attr('text-anchor', 'left')
            .attr('fill', 'black')
            .on('mouseover', EventsService.classGlowMouseOver)
            .on('mouseout', EventsService.classGlowMouseOut);

        classNameText.append('tspan')
            .attr('x', '0.5em')
            .attr('y', '1.3em')
            .text(classObj.className);

        var classNameRect = classNameG.append("rect")
            .attr("width", classObj.width)
            .attr("fill", "yellow")
            .attr("opacity", "0")
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            .attr("height", d3.getBBox(classNameText).height + 8)
            .attr('data-class-name', classObj.className)
            .attr('data-class-attribute-name', classObj.className + "-className")
            .on('mouseover', EventsService.classGlowMouseOver)
            .on('mouseout', EventsService.classGlowMouseOut);

        if (typeof window.showDataType === 'function') {
            classNameRect.attr('onclick', "showDataType('" + classObj.className + "');");
        }

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
                .classPK(classObj.pk)
                .width(classObj.width)
                .height(classObj.height)
                .verticalAlign("top")
                .horizontalAlign("left")
                .paddingTop(0)
                .paddingLeft(4));

        attributesRects.attr("height", d3.getBBox(attributesTexts).height + 1);
    }

    function createClassAnchors(classObj, classG) {
        var bbox = d3.getBBox(classG),
            anchors = {};

        var classNameBBox = d3.getBBox(classG.select("#" + classObj.className + "-className"));
        classObj.attributes.forEach((attribute, i) => {
            var id = classObj.className + "-" + attribute;
            var attributeBBox = d3.getBBox(classG.select("#" + id));
            var x = Math.round(classObj.x + bbox.width);
            var y = Math.round(classObj.y + classNameBBox.height + attributeBBox.y + 8);
            anchors[id] = { x: x, y: y }
        });

        var pkText = classG.select("#" + classObj.className + "-" + classObj.pk);
        if (pkText.node()) {
            var pkBBox = d3.getBBox(pkText);
            var x = Math.round(classObj.x);
            var y = Math.round(classObj.y + classNameBBox.height + pkBBox.y + 8);
            anchors[classObj.className] = { x: x, y: y }
        } else {
            var x = Math.round(classObj.x);
            var y = Math.round(classObj.y + 11);
            anchors[classObj.className] = { x: x, y: y }
        }

        classObj.anchors = anchors;
    }

    function createClass(classObj, classG) {

        var classRect = classG.append("rect")
            .attr("width", classObj.width)
            .attr("fill", "#6ed26e")
            .attr("stroke", "black")
            .attr("stroke-width", 1)

        var classNameG = classG.append("g")
            .attr("id", classObj.className + "-className")
            .attr("class", "className");

        createClassTitle(classObj, classNameG);


        var attributeOffsetY = d3.getBBox(classNameG).height;
        var classAttributesG = classG.append("g")
            .attr("class", "attributes")
            .attr("transform", "translate(0," + attributeOffsetY + ")");

        createClassAttributes(classObj, classAttributesG);

        createClassAnchors(classObj, classG);

        classObj.height = d3.getBBox(classNameG).height + d3.getBBox(classAttributesG).height;
        classRect.attr("height", classObj.height);

    }

    function drawClasses(classes, classContainer) {

        classesMap = {};
        classes.forEach(classObj => {
            var classG = classContainer.append("g")
                .attr("id", classObj.className)
                .attr("class", "class")
                .attr("transform", "translate(" + classObj.x + "," + classObj.y + ")")
                .on("click", EventsService.onClickClass);

            createClass(classObj, classG);
            classObj.classG = classG;

            classesMap[classObj.className] = classObj;
        });

        return classesMap;
    }

    return {
        buildClassModels: buildClassModels,
        drawClasses: drawClasses
    };
})();