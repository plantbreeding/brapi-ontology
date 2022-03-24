window.addEventListener("load", () => {
    d3.select("#mynetwork")
        .append(chart);
    // chart();
});

function chart() {
    const svg = d3.create("svg")
        .attr("viewBox", [0, 0, 1000, 1000])
        .style("font", "12px sans-serif");

    d3.classDiagram.addMarkers(svg.append("defs"));

    var classes = [{
            x: 40,
            y: 400,
            width: 100,
            classname: 'Study',
            attributes: [
                'studyDbId',
                'studyName',
                'trialDbId',
                'trialName',
                'programDbId',
                'programName',
            ]
        },
        {
            x: 40,
            y: 200,
            width: 100,
            classname: 'Trial',
            attributes: [
                'trialDbId',
                'trialName',
                'programDbId',
                'programName',
            ]
        },
        {
            x: 40,
            y: 20,
            width: 100,
            classname: 'Program',
            attributes: [
                'programDbId',
                'programName',
            ]
        }
    ];

    var boxes = d3.classDiagram.createClasses(classes, svg);
    svg.selectAll('text').attr('font-family', 'Noto Sans Japanese');

    var connectors = [{
            points: [
                { x: boxes.Program.midX(), y: boxes.Program.bottomY() },
                { x: boxes.Trial.midX(), y: boxes.Trial.topY() }
            ],
            markerEnd: 'triangle'
        }, {
            points: [
                { x: boxes.Trial.midX(), y: boxes.Trial.bottomY() },
                { x: boxes.Study.midX(), y: boxes.Study.topY() }
            ],
            markerEnd: 'triangle'
        },
        {
            points: [
                { x: boxes.Program.midX(), y: boxes.Program.bottomY() },
                { x: boxes.Program.midX(), y: boxes.Program.bottomY() + 10 },
                { x: boxes.Trial.rightX() + 10, y: boxes.Program.bottomY() + 10 },
                { x: boxes.Trial.rightX() + 10, y: boxes.Study.topY() - 10 },
                { x: boxes.Study.midX(), y: boxes.Study.topY() - 10 },
                { x: boxes.Study.midX(), y: boxes.Study.topY() },
            ],
            markerEnd: 'triangle'
        },
    ];

    d3.classDiagram.createConnectors(connectors, svg);

    return svg.node();
};