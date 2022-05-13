ConnectorsService = (function() {

    legsMap = {
        "horizantal": {},
        "vertical": {}
    }

    function getFromLegsMap(legsMap, orrientation, value) {
        return legsMap[orrientation][value | 0] ? legsMap[orrientation][value | 0] : [];
    }

    function addToLegMap(legsMap, leg) {
        if (leg.isHorizantal) {
            var value = leg.y() | 0
            if (!legsMap.horizantal[value]) {
                legsMap.horizantal[value] = [];
            }
            legsMap.horizantal[value].push({ "start": leg.x1, "end": leg.x2 });
        } else {
            var value = leg.x() | 0
            if (!legsMap.vertical[value]) {
                legsMap.vertical[value] = [];
            }
            legsMap.vertical[value].push({ "start": leg.y1, "end": leg.y2 });
        }
    }

    function isBetween(test, lower, upper) {
        if (lower < upper)
            return test >= lower && test <= upper
        else
            return test >= upper && test <= lower
    }

    function buildPath(classMap, legsMap, startingClass, startingAnchor, endingAnchor) {

        // first Leg
        var firstLeg = new PathLegModel(startingAnchor, true);
        firstLeg.step(1);
        makeTurn(classMap, legsMap, firstLeg, endingAnchor);

        addToLegMap(legsMap, firstLeg);

        var nextLeg = new PathLegModel(firstLeg.end(), !firstLeg.isHorizantal);

        var nextY = endingAnchor.y;
        if (firstLeg.end().y > endingAnchor.y) {
            // go up
            nextY = Math.max(startingClass.topY() - 10, endingAnchor.y)
        } else {
            //go down
            nextY = Math.min(startingClass.bottomY() + 10, endingAnchor.y)
        }
        nextLeg.y2 = nextY;
        var collisionResult = detectBoxCollision(classMap, nextLeg);
        nextLeg = collisionResult.leg;
        makeTurn(classMap, legsMap, nextLeg, endingAnchor);

        addToLegMap(legsMap, nextLeg);

        maxPathLength = 20;
        var pathPoints = [
            firstLeg.start(),
            firstLeg.end(),
            nextLeg.end()
        ]

        while (maxPathLength > 0) {
            maxPathLength--;

            var thirdLeg = new PathLegModel(nextLeg.end(), !nextLeg.isHorizantal);

            if (isBetween(thirdLeg.y(), endingAnchor.y - 1, endingAnchor.y + 1)) {
                thirdLeg.x2 = endingAnchor.x - 1;
                var collisionResult = detectBoxCollision(classMap, thirdLeg);
                thirdLeg = collisionResult.leg;
                if (thirdLeg.x2 == endingAnchor.x - 1) {
                    pathEnded = true;
                    pathPoints.push(endingAnchor);
                    break;
                }
            }

            if (nextLeg.end().x == endingAnchor.x - 20) {
                thirdLeg.x2 = endingAnchor.x - 30;
            } else {
                thirdLeg.x2 = endingAnchor.x - 20;
            }
            var collisionResult = detectBoxCollision(classMap, thirdLeg);
            thirdLeg = collisionResult.leg;
            var collisionBox = collisionResult.collisionBox;
            makeTurn(classMap, legsMap, thirdLeg, endingAnchor);

            addToLegMap(legsMap, thirdLeg);
            pathPoints.push(thirdLeg.end());

            var fourthLeg = new PathLegModel(thirdLeg.end(), !thirdLeg.isHorizantal);

            var nextY = endingAnchor.y;
            if (collisionBox) {
                averageY = (fourthLeg.y2 + endingAnchor.y) / 2;
                if (averageY < collisionBox.midY()) {
                    // go up and over
                    nextY = collisionBox.topY() - 10;
                } else {
                    // go down and under
                    nextY = collisionBox.bottomY() + 10;
                }
            }

            fourthLeg.y2 = nextY
            var collisionResult = detectBoxCollision(classMap, fourthLeg);
            fourthLeg = collisionResult.leg;
            makeTurn(classMap, legsMap, fourthLeg, endingAnchor);

            addToLegMap(legsMap, fourthLeg);
            pathPoints.push(fourthLeg.end());
            nextLeg = fourthLeg;
        }

        if (maxPathLength <= 0) {
            console.error("max path length reached");
        }

        cleanUpPath(pathPoints);
        return pathPoints;
    }

    function detectBoxCollision(classMap, originalLeg) {
        var leg = new PathLegModel(originalLeg.start(), originalLeg.isHorizantal, originalLeg.end());
        var collisionBox;
        var edge;
        for (const classBox of Object.values(classMap)) {
            //ckeck if the leg crosses any edge of a box
            if (leg.isHorizantal) {
                if (isBetween(leg.y(), classBox.topY(), classBox.bottomY())) {
                    // is on the same row as the box
                    if (isBetween(classBox.leftX(), leg.x1, leg.x2) && leg.x1 <= leg.x2) {
                        leg.x2 = classBox.leftX() - 30;
                        collisionBox = classBox;
                        edge = "left";

                    }
                    if (isBetween(classBox.rightX(), leg.x1, leg.x2) && leg.x1 >= leg.x2) {
                        leg.x2 = classBox.rightX() + 10;
                        collisionBox = classBox;
                        edge = "right";
                    }
                }
            } else {
                if (isBetween(leg.x(), classBox.leftX(), classBox.rightX())) {
                    // is in the same column as the box
                    if (isBetween(classBox.topY(), leg.y1, leg.y2) && leg.y1 <= leg.y2) {
                        leg.y2 = classBox.topY();
                        collisionBox = classBox;
                        edge = "top";
                    }
                    if (isBetween(classBox.bottomY(), leg.y1, leg.y2) && leg.y1 >= leg.y2) {
                        leg.y2 = classBox.bottomY();
                        collisionBox = classBox;
                        edge = "bottom";
                    }
                }
            }

            //check if the leg is inside a box
            if (!collisionBox) {
                if (isBetween(leg.start().x, classBox.leftX(), classBox.rightX()) &&
                    isBetween(leg.end().x, classBox.leftX(), classBox.rightX()) &&
                    isBetween(leg.start().y, classBox.topY(), classBox.bottomY()) &&
                    isBetween(leg.end().y, classBox.topY(), classBox.bottomY())) {
                    leg.x2 = leg.x1;
                    leg.y2 = leg.y1;
                    collisionBox = classBox;
                }
            }
        }

        return { collisionBox, leg };
    }

    function makeTurn(classMap, legsMap, leg, targetPoint) {
        testLeg = new PathLegModel(leg.end(), !leg.isHorizantal);
        if (testLeg.isHorizantal) {
            if (targetPoint.x > leg.end().x) {
                //turn right
                testLeg.x2 = testLeg.x2 + 10;
            } else {
                //turn left
                testLeg.x2 = testLeg.x2 - 10;
            }
        } else {
            if (targetPoint.y > leg.end().y) {
                //turn down
                testLeg.y2 = testLeg.y2 + 10;
            } else {
                //turn up
                testLeg.y2 = testLeg.y2 - 10;
            }
        }


        var collisionDetected = true;
        var count = 2;

        while (count < 50) {
            var possibleCollisions,
                endValue;

            // get the set of existing legs in line with the test leg
            if (testLeg.isHorizantal) {
                possibleCollisions = getFromLegsMap(legsMap, "horizantal", testLeg.y());
                endValue = testLeg.end().x
            } else {
                possibleCollisions = getFromLegsMap(legsMap, "vertical", testLeg.x());
                endValue = testLeg.end().y
            }
            // test for collisions with existing legs
            collisionDetected = false;
            for (const element of possibleCollisions) {
                if (isBetween(endValue, element.start, element.end)) {
                    collisionDetected = true;
                    break;
                }
            }

            // test to make sure the original leg is not reduced to 0 length
            if (leg.x1 == testLeg.x() || leg.y1 == testLeg.y()) {
                collisionDetected = true;
            }

            var collisionResult = detectBoxCollision(classMap, testLeg);

            adjustmentValue = ((((count % 2) * 2) - 1) * ((count / 2) | 0) * 10);
            if (collisionResult.collisionBox || collisionDetected) {
                //adjust test leg and loop to test again
                if (testLeg.isHorizantal) {
                    var newY = leg.end().y + adjustmentValue;
                    testLeg.y1 = newY;
                    testLeg.y2 = newY;
                } else {
                    var newX = leg.end().x + adjustmentValue;
                    testLeg.x1 = newX;
                    testLeg.x2 = newX;
                }
            } else {
                if (leg.isHorizantal) {
                    leg.x2 = testLeg.x();
                } else {
                    leg.y2 = testLeg.y();
                }
                break;
            }
            count++;
        }

        if (count >= 50) {
            console.error("path is stuck")
        }

        return leg;
    }

    function cleanUpPath(pathPoints) {
        //check for loops
        forwardLoop: for (let forwardIndex = 1; forwardIndex < pathPoints.length; forwardIndex++) {
            for (let backwardIndex = pathPoints.length - 2; backwardIndex > forwardIndex; backwardIndex--) {
                if (doIntersect(pathPoints[forwardIndex - 1], pathPoints[forwardIndex], pathPoints[backwardIndex], pathPoints[backwardIndex + 1])) {
                    var newPointX, newPointY;
                    if (pathPoints[forwardIndex - 1].x == pathPoints[forwardIndex].x) {
                        newPointX = pathPoints[forwardIndex].x;
                        newPointY = pathPoints[backwardIndex].y;
                    } else {
                        newPointX = pathPoints[backwardIndex].x;
                        newPointY = pathPoints[forwardIndex].y;
                    }

                    pathPoints.splice(forwardIndex, backwardIndex + 1 - forwardIndex, { 'x': newPointX, 'y': newPointY })

                    break forwardLoop;
                }
            }

        }
    }

    // Given three collinear points p, q, r, the function checks if
    // point q lies on line segment 'pr'
    function onSegment(p, q, r) {
        if (q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) &&
            q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y))
            return true;

        return false;
    }

    // To find orientation of ordered triplet (p, q, r).
    // The function returns following values
    // 0 --> p, q and r are collinear
    // 1 --> Clockwise
    // 2 --> Counterclockwise
    function orientation(p, q, r) {

        // See https://www.geeksforgeeks.org/orientation-3-ordered-points/
        // for details of below formula.
        let val = (q.y - p.y) * (r.x - q.x) -
            (q.x - p.x) * (r.y - q.y);

        if (val == 0) return 0; // collinear

        return (val > 0) ? 1 : 2; // clock or counterclock wise
    }

    // The main function that returns true if line segment 'p1q1'
    // and 'p2q2' intersect.
    function doIntersect(p1, q1, p2, q2) {

        // Find the four orientations needed for general and
        // special cases
        let o1 = orientation(p1, q1, p2);
        let o2 = orientation(p1, q1, q2);
        let o3 = orientation(p2, q2, p1);
        let o4 = orientation(p2, q2, q1);

        // General case
        if (o1 != o2 && o3 != o4)
            return true;

        // Special Cases
        // p1, q1 and p2 are collinear and p2 lies on segment p1q1
        if (o1 == 0 && onSegment(p1, p2, q1)) return true;

        // p1, q1 and q2 are collinear and q2 lies on segment p1q1
        if (o2 == 0 && onSegment(p1, q2, q1)) return true;

        // p2, q2 and p1 are collinear and p1 lies on segment p2q2
        if (o3 == 0 && onSegment(p2, p1, q2)) return true;

        // p2, q2 and q1 are collinear and q1 lies on segment p2q2
        if (o4 == 0 && onSegment(p2, q1, q2)) return true;

        return false; // Doesn't fall in any of the above cases
    }

    function buildConnectorModels(classMap) {
        var connectors = {};

        var links = []
        for (const classObj of Object.values(classMap)) {
            for (const link of classObj.links) {
                if (link.end in classMap) {
                    link.classObj = classObj;
                    link.startingAnchor = classObj.anchor(link.start);
                    link.endingAnchor = classMap[link.end].anchor(link.end);
                    links.push(link);
                }
            }
        }

        links.sort((a, b) => {
            var distanceA = Math.sqrt(Math.pow((a.startingAnchor.x - a.endingAnchor.x), 2) + Math.pow((a.startingAnchor.y - a.endingAnchor.y), 2));
            var distanceB = Math.sqrt(Math.pow((b.startingAnchor.x - b.endingAnchor.x), 2) + Math.pow((b.startingAnchor.y - b.endingAnchor.y), 2));

            return distanceA - distanceB;
        })

        for (const link of links) {
            console.log(link.start + ' => ' + link.end);
            if (link.start == 'Reference-commonCropName') {
                console.log('breakpoint')
            }

            var points = buildPath(classMap, legsMap, link.classObj, link.startingAnchor, link.endingAnchor);

            var connector = {
                id: link.start,
                points: points,
                markerEnd: 'filledTraiangle'
            }
            connectors[link.start] = connector;
        }

        return connectors;
    }

    function drawConnectors(connectorsMap, svg) {
        var line = d3.line()
            .x(function(d) { return d.x; })
            .y(function(d) { return d.y; });

        svg.selectAll("path.connector")
            .data(Object.values(connectorsMap)).enter().append("path")
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

    function drawMarkers(defs) {

        markers = [{
            "id": "filledTraiangle",
            "d": "M10 5 0 0 0 10Z",
            "width": 10
        }, {
            "id": "triangle",
            "d": "M10 5 0 0 0 10 Z M8 5 1 8.4 1 1.6Z",
            "width": 10
        }, {
            "id": "arrowhead",
            "d": "M10 5 0 10 0 8.7 6.8 5.5 0 5.5 0 4.5 6.8 4.5 0 1.3 0 0Z",
            "width": 10
        }, {
            "id": "diamond",
            "d": "M-1 5 7.5 0 16 5 7.5 10Z M1.3 5 7.5 8.7 14 5 7.5 1.3Z",
            "width": 16
        }, {
            "id": "filledDiamond",
            "d": "M-1 5 7.5 0 16 5 7.5 10Z",
            "width": 16
        }]

        markers.forEach(marker => {
            defs.append("marker")
                .attr("id", marker.id)
                .attr("viewBox", "0 0 " + marker.width + " 10")
                .attr("refX", marker.width)
                .attr("refY", 5)
                .attr("markerWidth", marker.width)
                .attr("markerHeight", 10)
                .attr("orient", "auto")
                .attr("markerUnits", "userSpaceOnUse")

            .append("path")
                .attr("d", marker.d)
                .attr("fill-rule", "evenodd")
                .attr("stroke", "none")
                .attr("fill", "black");
        });

    }

    return {
        buildConnectorModels: buildConnectorModels,
        drawConnectors: drawConnectors,
        drawMarkers: drawMarkers,
        buildPath: buildPath
    };
})();