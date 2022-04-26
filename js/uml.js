window.addEventListener("load", () => {
    d3.select("#mynetwork")
        .append(chart);
    // chart();
});

function chart() {
    const svg = d3.create("svg")
        .attr("viewBox", [-30, -5, 2500, 2500])
        .style("font", "12px sans-serif")
        .call(
            d3.zoom()
            .on('zoom', handleZoom));

    const holder = svg.append("g")
        .attr("class", "classesHolder");

    d3.classDiagram.addMarkers(holder.append("defs"));

    var activeModules = ['pheno', 'core', 'geno', 'germ'];
    // var activeModules = ['pheno', 'core'];

    var classes = buildClasses(activeModules);
    var classesMap = d3.classDiagram.createClasses(classes, holder);
    holder.selectAll('text').attr('font-family', 'Noto Sans Japanese');

    var connectors = buildConnectors(classesMap, activeModules);

    d3.classDiagram.createConnectors(connectors, holder);

    return svg.node();
};

function handleZoom(e) {
    d3.select('g.classesHolder')
        .attr('transform', e.transform);
}