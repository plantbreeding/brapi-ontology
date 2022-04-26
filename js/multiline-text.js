d3.multilineText = function() {
    var lineHeight = 1.4;
    var horizontalAlign = 'center'; // 'left', 'center', or 'right'
    var verticalAlign = 'center'; // 'top', 'center', or 'bottom'
    var paddingTop = 10;
    var paddingBottom = 10;
    var paddingLeft = 10;
    var paddingRight = 10;
    var className = 'className';
    var textAnchorsByHorizontalAlign = {
        'center': 'middle',
        'left': 'start',
        'right': 'end'
    };
    var text = function(d) { return d.text; };
    var width = function(d) { return d.width; };
    var height = function(d) { return d.height; };

    function my(selection) {
        selection.each(function(d, i) {
            var textElem = d3.select(this),
                lines,
                lineCount,
                lineI,
                line;

            lines = result(d, text);
            if (typeof lines === 'string') {
                lines = lines.split(/\n/);
            }
            if (lines === undefined) {
                return;
            }
            lineCount = lines.length;

            for (lineI = 0; lineI < lineCount; lineI++) {
                line = lines[lineI];

                var lineG = textElem.append("g")
                    .attr("id", className + "-" + line);

                var lineText = lineG.append('text')
                    .attr("font-size", 12)
                    .attr('text-anchor', textAnchorsByHorizontalAlign[horizontalAlign])
                    .attr('fill', 'black')
                    .attr('transform', function(d) {
                        return 'translate(' + translateX(d) + ',' + translateY(d) + ')';
                    });

                lineText.append('tspan')
                    .attr('x', 0)
                    .attr('y', lineTspanY(lineI, lineCount))
                    .attr('dy', lineTspanAttrs())
                    .text(line);

                var lineBBox = getBBox(lineText);
                if (lineBBox.y > 2) {
                    var dividerY = lineBBox.y + 3;
                    lineG.append("path")
                        .attr('d', 'M0,' + dividerY + 'L' + width + ',' + dividerY + 'Z')
                        .attr("fill", "none")
                        .attr("stroke", "#b5c9b5")
                        .attr("stroke-width", 1)
                }
            }
        });
    }

    function translateX(d) {
        var w = result(d, width);
        switch (horizontalAlign) {
            case 'center':
                return w / 2;
            case 'left':
                return paddingLeft;
            case 'right':
                return w - paddingRight;
        }
    }

    function translateY(d) {
        var h = result(d, height);
        switch (verticalAlign) {
            case 'center':
                return h / 2;
            case 'top':
                return paddingTop;
            case 'bottom':
                return h - paddingBottom;
        }
    }

    function lineTspanY(lineI, lineCount) {
        var y;
        switch (verticalAlign) {
            case 'center':
                y = (lineI - (lineCount - 1) / 2) * lineHeight;
                break;
            case 'top':
                y = lineI * lineHeight;
                break;
            case 'bottom':
                y = -((lineCount - 1) - lineI) * lineHeight;
                break;
        }
        return y ? y + 'em' : 0;
    }

    function lineTspanAttrs() {
        switch (verticalAlign) {
            case 'center':
                return '.35em'
            case 'top':
                return '1em'
            case 'bottom':
                return 0
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

    function result(d, property) {
        return typeof property === 'function' ? property(d) : property;
    }

    my.className = function(value) {
        if (!arguments.length) return className;
        className = value;
        return my;
    };

    my.lineHeight = function(value) {
        if (!arguments.length) return lineHeight;
        lineHeight = value;
        return my;
    };

    my.horizontalAlign = function(value) {
        if (!arguments.length) return horizontalAlign;
        horizontalAlign = value;
        return my;
    };

    my.verticalAlign = function(value) {
        if (!arguments.length) return verticalAlign;
        verticalAlign = value;
        return my;
    };

    my.paddingTop = function(value) {
        if (!arguments.length) return paddingTop;
        paddingTop = value;
        return my;
    };

    my.paddingRight = function(value) {
        if (!arguments.length) return paddingRight;
        paddingRight = value;
        return my;
    };

    my.paddingBottom = function(value) {
        if (!arguments.length) return paddingBottom;
        paddingBottom = value;
        return my;
    };

    my.paddingLeft = function(value) {
        if (!arguments.length) return paddingLeft;
        paddingLeft = value;
        return my;
    };

    my.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        return my;
    };

    my.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        return my;
    };

    my.text = function(value) {
        if (!arguments.length) return text;
        text = value;
        return my;
    };

    return my;
}