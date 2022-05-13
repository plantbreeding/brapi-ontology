window.addEventListener("load", () => {
    d3.select("#mynetwork")
        .append(chart);
});

function chart() {
    EventsService.setLS("selectedClassAttributes", []);
    const svg = d3.create("svg")
        .attr("viewBox", [-30, -5, 1500, 1500])
        .style("font", "12px sans-serif")
        .call(
            d3.zoom()
            .on('zoom', handleZoom))
        .on("click", EventsService.onClickClass);

    const holder = svg.append("g")
        .attr("class", "classesHolder");

    ConnectorsService.drawMarkers(holder.append("defs"));

    var activeModules = ['pheno', 'core', 'geno', 'germ'];
    // var activeModules = ['pheno', 'core', 'geno'];

    var classes = ClassService.buildClassModels(activeModules);
    var classesMap = ClassService.drawClasses(classes, holder);

    holder.selectAll('text')
        .attr('font-family', 'Noto Sans Japanese');

    var connectors = ConnectorsService.buildConnectorModels(classesMap, activeModules);
    ConnectorsService.drawConnectors(connectors, holder);

    return svg.node();
};

function handleZoom(e) {
    d3.select('g.classesHolder')
        .attr('transform', e.transform);
}

d3.getBBox = (function() {
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
    return getBBox;
})();