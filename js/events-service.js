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
        var targetObj = d3.select(event.target);
        var targetArr = [{ "className": targetObj.attr('data-class-name'), "attrName": targetObj.attr('data-class-attribute-name') }];

        if (targetObj.attr('data-class-name') && targetObj.attr('data-class-attribute-name')) {
            //is a clickable thing
            if (!event.shiftKey) {
                newSelectedArr = targetArr;
            } else {
                targetArr.forEach(element => {
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
        d3.select('#' + attrName + '.connector')
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
        d3.select('#' + attrName + '.connector')
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