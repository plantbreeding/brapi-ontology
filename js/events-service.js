EventsService = (function() {

    function classGlowMouseOver(d, i) {
        mouseOverObj = { "className": d3.select(this).attr('data-class-name'), "attrName": d3.select(this).attr('data-class-attribute-name') };
        glow(mouseOverObj.className, mouseOverObj.attrName);
    }

    function classGlowMouseOut(d, i) {
        mouseOverObj = { "className": d3.select(this).attr('data-class-name'), "attrName": d3.select(this).attr('data-class-attribute-name') };
        unglow(mouseOverObj.className, mouseOverObj.attrName);

        getLS("selectedClassAttributes").forEach(element => {
            glow(element.className, element.attrName);
        });
    }

    function getLS(propName) {
        return JSON.parse(window.localStorage.getItem(propName));
    }

    function setLS(propName, obj) {
        window.localStorage.setItem(propName, JSON.stringify(obj));
    }

    function onClickClass(event) {
        var oldSelectedArr = getLS("selectedClassAttributes");
        var newSelectedArr = getLS("selectedClassAttributes");
        var targetObjClassName = d3.select(event.target).attr('data-class-name');
        var targetObjAttrName = d3.select(event.target).attr('data-class-attribute-name');
        var targetObjPK = d3.select(event.target).attr('data-class-pk');
        var targetArr = {};

        if (targetObjClassName && targetObjAttrName) {


            if (targetObjAttrName.endsWith('-className')) {
                //the class name was clicked
                d3.selectAll('[id$=",' + targetObjClassName + '"].connector').nodes().forEach(element => {
                    var elementClassName = element.id.split(',')[0].split('-')[0];
                    var elementAttrName = element.id.split(',')[0];
                    targetArr[elementClassName + elementAttrName] = { "className": elementClassName, "attrName": elementAttrName };
                });
                d3.selectAll('[id^="' + targetObjClassName + '-"].connector').nodes().forEach(element => {
                    var elementClassName = element.id.split(',')[0].split('-')[0];
                    var elementAttrName = element.id.split(',')[0];
                    targetArr[elementClassName + elementAttrName] = { "className": elementClassName, "attrName": elementAttrName };
                });
                var pkAttrName = d3.select('[data-class-pk="true"][data-class-name="' + targetObjClassName + '"]').attr('data-class-attribute-name');
                targetArr[targetObjClassName + pkAttrName] = { "className": targetObjClassName, "attrName": pkAttrName };
            } else if (targetObjPK) {
                //the class name was clicked
                d3.selectAll('[id$=",' + targetObjClassName + '"].connector').nodes().forEach(element => {
                    var elementClassName = element.id.split(',')[0].split('-')[0];
                    var elementAttrName = element.id.split(',')[0];
                    targetArr[elementClassName + elementAttrName] = { "className": elementClassName, "attrName": elementAttrName };
                });
                targetArr[targetObjClassName + targetObjAttrName] = { "className": targetObjClassName, "attrName": targetObjAttrName };
            } else {
                // normal field clicked
                targetArr[targetObjClassName + targetObjAttrName] = { "className": targetObjClassName, "attrName": targetObjAttrName };
            }

            //is a clickable thing
            if (!event.shiftKey) {
                newSelectedArr = Object.values(targetArr);
            } else {
                Object.values(targetArr).forEach(element => {
                    var index = newSelectedArr.findIndex(e => { return e.className === element.className && e.attrName === element.attrName; });
                    if (index < 0) {
                        newSelectedArr.push(element);
                    } else {
                        newSelectedArr.splice(index, 1);
                    }
                });
            }
        } else {
            //is background
            newSelectedArr = [];
        }

        oldSelectedArr.forEach(element => {
            unglow(element.className, element.attrName);
        });

        newSelectedArr.forEach(element => {
            glow(element.className, element.attrName);
        });

        setLS("selectedClassAttributes", newSelectedArr);

        event.stopPropagation();
    }

    function glow(className, attrName) {
        d3.select('#' + className + ' rect')
            .transition()
            .duration('50')
            .attr("stroke-width", 4);
        d3.select('#' + attrName + ' rect')
            .transition()
            .duration('50')
            .attr("opacity", ".5");
        d3.select('[id^="' + attrName + ',"].connector')
            .transition()
            .duration('50')
            .attr("stroke-width", 4);
    }

    function unglow(className, attrName) {
        d3.select('#' + className + ' rect')
            .transition()
            .duration('50')
            .attr("stroke-width", 1);
        d3.select('#' + attrName + ' rect')
            .transition()
            .duration('50')
            .attr("opacity", "0");
        d3.select('[id^="' + attrName + ',"].connector')
            .transition()
            .duration('50')
            .attr("stroke-width", 1);
    }
    return {
        onClickClass: onClickClass,
        classGlowMouseOver: classGlowMouseOver,
        classGlowMouseOut: classGlowMouseOut,
        getLS: getLS,
        setLS: setLS
    };
})();