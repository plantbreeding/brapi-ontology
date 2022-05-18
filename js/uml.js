// var activeModules = ['pheno', 'core', 'geno', 'germ'];
var activeModules = [];
// var activeModules = ['core'];

window.addEventListener("load", () => {
    redrawDiagram();
});

function redrawDiagram() {
    var allCB = document.getElementById("all-checkbox");
    var coreCB = document.getElementById("core-checkbox");
    var phenoCB = document.getElementById("pheno-checkbox");
    var genoCB = document.getElementById("geno-checkbox");
    var germCB = document.getElementById("germ-checkbox");

    if (allCB.checked) {
        activeModules = ['core', 'pheno', 'geno', 'germ'];
        coreCB.disabled = true;
        phenoCB.disabled = true;
        genoCB.disabled = true;
        germCB.disabled = true;
    } else {
        activeModules = [];
        coreCB.disabled = false;
        phenoCB.disabled = false;
        genoCB.disabled = false;
        germCB.disabled = false;
        if (coreCB.checked)
            activeModules.push(coreCB.value)
        if (phenoCB.checked)
            activeModules.push(phenoCB.value)
        if (genoCB.checked)
            activeModules.push(genoCB.value)
        if (germCB.checked)
            activeModules.push(germCB.value)
    }

    activeModules.sort((a, b) => {
        var orderedModules = ['core', 'pheno', 'geno', 'germ'];
        var aI = orderedModules.indexOf(a);
        var bI = orderedModules.indexOf(b);
        return aI - bI;
    })
    startingZoom = 0.12;

    document.getElementById("mynetwork").innerHTML = '';
    d3.select("#mynetwork")
        .append(chart);
}

function chart() {
    EventsService.setLS("selectedClassAttributes", []);
    const svg = d3.create("svg")
        .attr("viewBox", [-5, -5, 300, 2000])
        .attr("class", "svg-content")
        .call(
            d3.zoom()
            .on('zoom', handleZoom))
        .on("click", EventsService.onClickClass);

    const holder = svg.append("g")
        .attr("id", "classesHolder")
        .attr("class", "classesHolder")
        .attr("transform", "scale(" + startingZoom + ")");

    ConnectorsService.drawMarkers(holder.append("defs"));

    var classes = ClassService.buildClassModels(activeModules);
    var classesMap = ClassService.drawClasses(classes, holder);

    holder.selectAll('text')
        .attr('font-family', 'Noto Sans Japanese');

    var connectors = ConnectorsService.buildConnectorModels(classesMap, activeModules);
    ConnectorsService.drawConnectors(connectors, holder);

    return svg.node();
};

var startingZoom = 0.12;

function handleZoom(e) {
    e.transform.k = e.transform.k * startingZoom;
    startingZoom = 1;
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