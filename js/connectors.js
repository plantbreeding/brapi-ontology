function buildConnectors(boxes, modules) {
    var connectors = []
    if (modules.includes('core')) {
        var coreConnectors = [{
                id: "ListDetails-listOwnerPersonDbId",
                points: underBend(
                    boxes.ListDetails.anchor("ListDetails-listOwnerPersonDbId"), boxes.ListDetails,
                    boxes.Person.anchor("Person")),
                markerEnd: 'triangle'
            },
            {
                id: "Location-parentLocationDbId",
                points: underBend(
                    boxes.Location.anchor("Location-parentLocationDbId"), boxes.Location,
                    boxes.Location.anchor("Location")),
                markerEnd: 'triangle'
            },
            {
                id: "Program-commonCropName",
                points: sBend(
                    boxes.Program.anchor("Program-commonCropName"),
                    boxes.CommonCropName.anchor("CommonCropName")),
                markerEnd: 'triangle'
            },
            {
                id: "Program-leadPersonDbId",
                points: sBend(
                    boxes.Program.anchor("Program-leadPersonDbId"),
                    boxes.Person.anchor("Person")),
                markerEnd: 'triangle'
            }, {
                id: "Trial-programDbId",
                points: sBend(
                    boxes.Trial.anchor("Trial-programDbId"),
                    boxes.Program.anchor("Program"), 2),
                markerEnd: 'triangle'
            }, {
                id: "Trial-commonCropName",
                points: sBend(
                    boxes.Trial.anchor("Trial-commonCropName"),
                    boxes.CommonCropName.anchor("CommonCropName")),
                markerEnd: 'triangle'
            },
            {
                id: "Study-seasons",
                points: sBend(
                    boxes.Study.anchor("Study-seasons"),
                    boxes.Season.anchor("Season")),
                markerEnd: 'triangle'
            },
            {
                id: "Study-locationDbId",
                points: sBend(
                    boxes.Study.anchor("Study-locationDbId"),
                    boxes.Location.anchor("Location")),
                markerEnd: 'triangle'
            }, {
                id: "Study-trialDbId",
                points: sBend(
                    boxes.Study.anchor("Study-trialDbId"),
                    boxes.Trial.anchor("Trial"), 2),
                markerEnd: 'triangle'
            },
            {
                id: "Study-commonCropName",
                points: sBend(
                    boxes.Study.anchor("Study-commonCropName"),
                    boxes.CommonCropName.anchor("CommonCropName")),
                markerEnd: 'triangle'
            },
        ];

        connectors = connectors.concat(coreConnectors);
    }

    if (modules.includes('pheno')) {
        var phenoConnectors = [{
            id: "Event-observationUnitDbIds",
            points: sBend(
                boxes.Event.anchor("Event-observationUnitDbIds"),
                boxes.ObservationUnit.anchor("ObservationUnit"), 2),
            markerEnd: 'triangle'
        }, {
            id: "Image-observationUnitDbId",
            points: sBend(
                boxes.Image.anchor("Image-observationUnitDbId"),
                boxes.ObservationUnit.anchor("ObservationUnit")),
            markerEnd: 'triangle'
        }, {
            id: "Image-observationDbIds",
            points: sBend(
                boxes.Image.anchor("Image-observationDbIds"),
                boxes.Observation.anchor("Observation")),
            markerEnd: 'triangle'
        }, {
            id: "Observation-observationUnitDbId",
            points: underBend(
                boxes.Observation.anchor("Observation-observationUnitDbId"), boxes.Observation,
                boxes.ObservationUnit.anchor("ObservationUnit"), 1, 3, 2),
            markerEnd: 'triangle'
        }, {
            id: "Observation-observationVariableDbId",
            points: sBend(
                boxes.Observation.anchor("Observation-observationVariableDbId"),
                boxes.ObservationVariable.anchor("ObservationVariable"), 2),
            markerEnd: 'triangle'
        }, {
            id: "ObservationUnit-observations",
            points: overBend(
                boxes.ObservationUnit.anchor("ObservationUnit-observations"), boxes.ObservationUnit,
                boxes.Observation.anchor("Observation"), 2, 4, 2),
            markerEnd: 'triangle'
        }, {
            id: "ObservationVariable-method",
            points: sBend(
                boxes.ObservationVariable.anchor("ObservationVariable-method"),
                boxes.Method.anchor("Method"), 2),
            markerEnd: 'triangle'
        }, {
            id: "ObservationVariable-scale",
            points: sBend(
                boxes.ObservationVariable.anchor("ObservationVariable-scale"),
                boxes.Scale.anchor("Scale")),
            markerEnd: 'triangle'
        }, {
            id: "ObservationVariable-trait",
            points: sBend(
                boxes.ObservationVariable.anchor("ObservationVariable-trait"),
                boxes.Trait.anchor("Trait")),
            markerEnd: 'triangle'
        }, {
            id: "ObservationVariable-ontologyReference",
            points: sBend(
                boxes.ObservationVariable.anchor("ObservationVariable-ontologyReference"),
                boxes.Ontology.anchor("Ontology")),
            markerEnd: 'triangle'
        }, {
            id: "Method-ontologyReference",
            points: sBend(
                boxes.Method.anchor("Method-ontologyReference"),
                boxes.Ontology.anchor("Ontology")),
            markerEnd: 'triangle'
        }, {
            id: "Scale-ontologyReference",
            points: sBend(
                boxes.Scale.anchor("Scale-ontologyReference"),
                boxes.Ontology.anchor("Ontology"), 2),
            markerEnd: 'triangle'
        }, {
            id: "Trait-ontologyReference",
            points: sBend(
                boxes.Trait.anchor("Trait-ontologyReference"),
                boxes.Ontology.anchor("Ontology"), 3),
            markerEnd: 'triangle'
        }, ];

        connectors = connectors.concat(phenoConnectors);
    }

    if (modules.includes('geno')) {
        var genoConnectors = [{
            id: "Call-callSetDbId",
            points: sBend(
                boxes.Call.anchor("Call-callSetDbId"),
                boxes.CallSet.anchor("CallSet")),
            markerEnd: 'triangle'
        }, {
            id: "Call-variantDbId",
            points: sBend(
                boxes.Call.anchor("Call-variantDbId"),
                boxes.Variant.anchor("Variant"), 2),
            markerEnd: 'triangle'
        }, {
            id: "Call-variantSetDbId",
            points: overBend(
                boxes.Call.anchor("Call-variantSetDbId"), boxes.Variant,
                boxes.VariantSet.anchor("VariantSet"), 3, 2, 4),
            markerEnd: 'triangle'
        }, {
            id: "CallSet-sampleDbId",
            points: sBend(
                boxes.CallSet.anchor("CallSet-sampleDbId"),
                boxes.Sample.anchor("Sample"),
                1),
            markerEnd: 'triangle'
        }, {
            id: "CallSet-variantSetDbIds",
            points: sBend(
                boxes.CallSet.anchor("CallSet-variantSetDbIds"),
                boxes.VariantSet.anchor("VariantSet"), 2),
            markerEnd: 'triangle'
        }, {
            id: "MarkerPosition-mapDbId",
            points: underBend(
                boxes.MarkerPosition.anchor("MarkerPosition-mapDbId"), boxes.MarkerPosition,
                boxes.GenomeMap.anchor("GenomeMap")),
            markerEnd: 'triangle'
        }, {
            id: "MarkerPosition-variantDbId",
            points: sBend(
                boxes.MarkerPosition.anchor("MarkerPosition-variantDbId"),
                boxes.Variant.anchor("Variant"), 3),
            markerEnd: 'triangle'
        }, {
            id: "Reference-referenceSetDbId",
            points: overBend(
                boxes.Reference.anchor("Reference-referenceSetDbId"), boxes.Reference,
                boxes.ReferenceSet.anchor("ReferenceSet"), 1, 1, 2),
            markerEnd: 'triangle'
        }, {
            id: "Sample-plateDbId",
            points: sBend(
                boxes.Sample.anchor("Sample-plateDbId"),
                boxes.Plate.anchor("Plate"),
                1),
            markerEnd: 'triangle'
        }, {
            id: "Variant-referenceDbId",
            points: underBend(
                boxes.Variant.anchor("Variant-referenceDbId"), boxes.VariantSet,
                boxes.Reference.anchor("Reference"), 2, 2, 2),
            markerEnd: 'triangle'
        }, {
            id: "Variant-referenceSetDbId",
            points: underBend(
                boxes.Variant.anchor("Variant-referenceSetDbId"), boxes.VariantSet,
                boxes.ReferenceSet.anchor("ReferenceSet"), 1, 1, 3),
            markerEnd: 'triangle'
        }, {
            id: "Variant-variantSetDbId",
            points: sBend(
                boxes.Variant.anchor("Variant-variantSetDbId"),
                boxes.VariantSet.anchor("VariantSet"), 3),
            markerEnd: 'triangle'
        }, {
            id: "VariantSet-referenceSetDbId",
            points: sBend(
                boxes.VariantSet.anchor("VariantSet-referenceSetDbId"),
                boxes.ReferenceSet.anchor("ReferenceSet"), 1),
            markerEnd: 'triangle'
        }, ];

        connectors = connectors.concat(genoConnectors);
    }

    if (modules.includes('germ')) {
        var germConnectors = [{
            id: "Cross-crossingProjectDbId",
            points: sBend(
                boxes.Cross.anchor("Cross-crossingProjectDbId"),
                boxes.CrossingProject.anchor("CrossingProject")),
            markerEnd: 'triangle'
        }, {
            id: "Cross-parent1",
            points: sBend(
                boxes.Cross.anchor("Cross-parent1"),
                boxes.CrossParent.anchor("CrossParent"), 4.5),
            markerEnd: 'triangle'
        }, {
            id: "Cross-parent2",
            points: sBend(
                boxes.Cross.anchor("Cross-parent2"),
                boxes.CrossParent.anchor("CrossParent"), 3.5),
            markerEnd: 'triangle'
        }, {
            id: "Cross-plannedCrossDbId",
            points: underBend(
                boxes.Cross.anchor("Cross-plannedCrossDbId"), boxes.Cross,
                boxes.PlannedCross.anchor("PlannedCross"), 1, 1, 2),
            markerEnd: 'triangle'
        }, {
            id: "CrossParent-germplasmDbId",
            points: overBend(
                boxes.CrossParent.anchor("CrossParent-germplasmDbId"), boxes.GermplasmAttribute,
                boxes.Germplasm.anchor("Germplasm"), 3, 1, 4),
            markerEnd: 'triangle'
        }, {
            id: "CrossingProject-potentialParents",
            points: overBend(
                boxes.CrossingProject.anchor("CrossingProject-potentialParents"), boxes.CrossParent,
                boxes.CrossParent.anchor("CrossParent"), 1, 1, 1.5),
            markerEnd: 'triangle'
        }, {
            id: "Germplasm-breedingMethodDbId",
            points: underBend(
                boxes.Germplasm.anchor("Germplasm-breedingMethodDbId"), boxes.BreedingMethod,
                boxes.BreedingMethod.anchor("BreedingMethod"), 1, 1, 1.5),
            markerEnd: 'triangle'
        }, {
            id: "GermplasmAttributeValue-attributeDbId",
            points: overBend(
                boxes.GermplasmAttributeValue.anchor("GermplasmAttributeValue-attributeDbId"), boxes.GermplasmAttributeValue,
                boxes.GermplasmAttribute.anchor("GermplasmAttribute"), 1, 1, 2),
            markerEnd: 'triangle'
        }, {
            id: "GermplasmAttributeValue-germplasmDbId",
            points: sBend(
                boxes.GermplasmAttributeValue.anchor("GermplasmAttributeValue-germplasmDbId"),
                boxes.Germplasm.anchor("Germplasm"), 4),
            markerEnd: 'triangle'
        }, {
            id: "PedigreeNode-breedingMethodDbId",
            points: overBend(
                boxes.PedigreeNode.anchor("PedigreeNode-breedingMethodDbId"), boxes.GermplasmAttribute,
                boxes.BreedingMethod.anchor("BreedingMethod"), 6, 2, 2),
            markerEnd: 'triangle'
        }, {
            id: "PedigreeNode-crossingProjectDbId",
            points: underBend(
                boxes.PedigreeNode.anchor("PedigreeNode-crossingProjectDbId"), boxes.PedigreeNode,
                boxes.CrossingProject.anchor("CrossingProject"), 5, 5, 2),
            markerEnd: 'triangle'
        }, {
            id: "PedigreeNode-germplasmDbId",
            points: sBend(
                boxes.PedigreeNode.anchor("PedigreeNode-germplasmDbId"),
                boxes.Germplasm.anchor("Germplasm"), 8),
            markerEnd: 'triangle'
        }, {
            id: "PedigreeNode-parents",
            points: underBend(
                boxes.PedigreeNode.anchor("PedigreeNode-parents"), boxes.PedigreeNode,
                boxes.PedigreeNode.anchor("PedigreeNode"), 4, 3, 4),
            markerEnd: 'triangle'
        }, {
            id: "PedigreeNode-progeny",
            points: underBend(
                boxes.PedigreeNode.anchor("PedigreeNode-progeny"), boxes.PedigreeNode,
                boxes.PedigreeNode.anchor("PedigreeNode"), 3, 2, 3),
            markerEnd: 'triangle'
        }, {
            id: "PedigreeNode-siblings",
            points: underBend(
                boxes.PedigreeNode.anchor("PedigreeNode-siblings"), boxes.PedigreeNode,
                boxes.PedigreeNode.anchor("PedigreeNode"), 2, 1, 2),
            markerEnd: 'triangle'
        }, {
            id: "PlannedCross-crossingProjectDbId",
            points: sBend(
                boxes.PlannedCross.anchor("PlannedCross-crossingProjectDbId"),
                boxes.CrossingProject.anchor("CrossingProject"), 2),
            markerEnd: 'triangle'
        }, {
            id: "PlannedCross-parent1",
            points: sBend(
                boxes.PlannedCross.anchor("PlannedCross-parent1"),
                boxes.CrossParent.anchor("CrossParent"), 4),
            markerEnd: 'triangle'
        }, {
            id: "PlannedCross-parent2",
            points: sBend(
                boxes.PlannedCross.anchor("PlannedCross-parent2"),
                boxes.CrossParent.anchor("CrossParent"), 5),
            markerEnd: 'triangle'
        }, {
            id: "SeedLot-contentMixture",
            points: sBend(
                boxes.SeedLot.anchor("SeedLot-contentMixture"),
                boxes.Germplasm.anchor("Germplasm")),
            markerEnd: 'triangle'
        }, {
            id: "SeedLot-contentMixture",
            points: underBend(
                boxes.SeedLot.anchor("SeedLot-contentMixture"), boxes.SeedLot,
                boxes.Cross.anchor("Cross"), 2, 1, 2),
            markerEnd: 'triangle'
        }, ];

        connectors = connectors.concat(germConnectors);
    }

    if (modules.includes('core') && modules.includes('pheno')) {
        var coreXphenoConnectors = [{
            id: "Event-studyDbId",
            points: underBend(
                boxes.Event.anchor("Event-studyDbId"), boxes.Trait,
                boxes.Study.anchor("Study"), 1, 7, 9),
            markerEnd: 'triangle'
        }, {
            id: "Observation-studyDbId",
            points: underBend(
                boxes.Observation.anchor("Observation-studyDbId"), boxes.Trait,
                boxes.Study.anchor("Study"), 5, 2, 11),
            markerEnd: 'triangle'
        }, {
            id: "Observation-season",
            points: underBend(
                boxes.Observation.anchor("Observation-season"), boxes.Trait,
                boxes.Season.anchor("Season"), 6, 1, 2),
            markerEnd: 'triangle'
        }, {
            id: "ObservationUnit-locationDbId",
            points: underBend(
                boxes.ObservationUnit.anchor("ObservationUnit-locationDbId"), boxes.Trait,
                boxes.Location.anchor("Location"), 4, 3, 2),
            markerEnd: 'triangle'
        }, {
            id: "ObservationUnit-programDbId",
            points: underBend(
                boxes.ObservationUnit.anchor("ObservationUnit-programDbId"), boxes.Trait,
                boxes.Program.anchor("Program"), 3, 4, 3),
            markerEnd: 'triangle'
        }, {
            id: "ObservationUnit-trialDbId",
            points: underBend(
                boxes.ObservationUnit.anchor("ObservationUnit-trialDbId"), boxes.Trait,
                boxes.Trial.anchor("Trial"), 1, 6, 3),
            markerEnd: 'triangle'
        }, {
            id: "ObservationUnit-studyDbId",
            points: underBend(
                boxes.ObservationUnit.anchor("ObservationUnit-studyDbId"), boxes.Trait,
                boxes.Study.anchor("Study"), 2, 5, 10),
            markerEnd: 'triangle'
        }, {
            id: "ObservationVariable-commonCropName",
            points: sBend(
                boxes.ObservationVariable.anchor("ObservationVariable-commonCropName"),
                boxes.CommonCropName.anchor("CommonCropName"), 1),
            markerEnd: 'triangle'
        }, ];

        connectors = connectors.concat(coreXphenoConnectors);
    }

    if (modules.includes('core') && modules.includes('geno')) {
        var coreXgenoConnectors = [{
            id: "CallSet-studyDbId",
            points: overBend(
                boxes.CallSet.anchor("CallSet-studyDbId"), boxes.Plate,
                boxes.Study.anchor("Study"), 2, 10, 8),
            markerEnd: 'triangle'
        }, {
            id: "Plate-programDbId",
            points: overBend(
                boxes.Plate.anchor("Plate-programDbId"), boxes.Plate,
                boxes.Program.anchor("Program"), 3, 3, 4),
            markerEnd: 'triangle'
        }, {
            id: "Plate-trialDbId",
            points: overBend(
                boxes.Plate.anchor("Plate-trialDbId"), boxes.Plate,
                boxes.Trial.anchor("Trial"), 2, 4, 4),
            markerEnd: 'triangle'
        }, {
            id: "Plate-studyDbId",
            points: overBend(
                boxes.Plate.anchor("Plate-studyDbId"), boxes.Plate,
                boxes.Study.anchor("Study"), 1, 5, 2),
            markerEnd: 'triangle'
        }, {
            id: "Reference-commonCropName",
            points: overBend(
                boxes.Reference.anchor("Reference-commonCropName"), boxes.Plate,
                boxes.CommonCropName.anchor("CommonCropName"), 6, 6, 79),
            markerEnd: 'triangle'
        }, {
            id: "ReferenceSet-commonCropName",
            points: overBend(
                boxes.ReferenceSet.anchor("ReferenceSet-commonCropName"), boxes.Plate,
                boxes.CommonCropName.anchor("CommonCropName"), 5, 7, 80),
            markerEnd: 'triangle'
        }, {
            id: "Sample-programDbId",
            points: overBend(
                boxes.Sample.anchor("Sample-programDbId"), boxes.Plate,
                boxes.Program.anchor("Program"), 3, 10, 5),
            markerEnd: 'triangle'
        }, {
            id: "Sample-trialDbId",
            points: overBend(
                boxes.Sample.anchor("Sample-trialDbId"), boxes.Plate,
                boxes.Trial.anchor("Trial"), 5, 9, 5),
            markerEnd: 'triangle'
        }, {
            id: "Sample-studyDbId",
            points: overBend(
                boxes.Sample.anchor("Sample-studyDbId"), boxes.Plate,
                boxes.Study.anchor("Study"), 4, 8, 4),
            markerEnd: 'triangle'
        }, {
            id: "VariantSet-studyDbId",
            points: overBend(
                boxes.VariantSet.anchor("VariantSet-studyDbId"), boxes.Plate,
                boxes.Study.anchor("Study"), 3, 12, 5),
            markerEnd: 'triangle'
        }, ];

        connectors = connectors.concat(coreXgenoConnectors);
    }

    if (modules.includes('core') && modules.includes('germ')) {
        var coreXgermConnectors = [{
            id: "CrossingProject-commonCropName",
            points: sBend(
                boxes.CrossingProject.anchor("CrossingProject-commonCropName"),
                boxes.CommonCropName.anchor("CommonCropName"),
                1),
            markerEnd: 'triangle'
        }, {
            id: "CrossingProject-programDbId",
            points: sBend(
                boxes.CrossingProject.anchor("CrossingProject-programDbId"),
                boxes.Program.anchor("Program"),
                1),
            markerEnd: 'triangle'
        }, {
            id: "Germplasm-commonCropName",
            points: sBend(
                boxes.Germplasm.anchor("Germplasm-commonCropName"),
                boxes.CommonCropName.anchor("CommonCropName"),
                1),
            markerEnd: 'triangle'
        }, {
            id: "GermplasmAttribute-commonCropName",
            points: sBend(
                boxes.GermplasmAttribute.anchor("GermplasmAttribute-commonCropName"),
                boxes.CommonCropName.anchor("CommonCropName"),
                1),
            markerEnd: 'triangle'
        }, {
            id: "SeedLot-locationDbId",
            points: sBend(
                boxes.SeedLot.anchor("SeedLot-locationDbId"),
                boxes.Location.anchor("Location"),
                1),
            markerEnd: 'triangle'
        }, {
            id: "SeedLot-programDbId",
            points: sBend(
                boxes.SeedLot.anchor("SeedLot-programDbId"),
                boxes.Program.anchor("Program"),
                1),
            markerEnd: 'triangle'
        }, ];

        connectors = connectors.concat(coreXgermConnectors);
    }

    if (modules.includes('pheno') && modules.includes('geno')) {
        var phenoXgenoConnectors = [{
            id: "Sample-observationUnitDbId",
            points: overBend(
                boxes.Sample.anchor("Sample-observationUnitDbId"), boxes.Plate,
                boxes.ObservationUnit.anchor("ObservationUnit"), 1, 12, 4),
            markerEnd: 'triangle'
        }, ];

        connectors = connectors.concat(phenoXgenoConnectors);
    }

    if (modules.includes('pheno') && modules.includes('germ')) {
        var phenoXgermConnectors = [{
            id: "Observation-germplasmDbId",
            points: sBend(
                boxes.Observation.anchor("Observation-germplasmDbId"),
                boxes.Germplasm.anchor("Germplasm"),
                1),
            markerEnd: 'triangle'
        }, {
            id: "ObservationUnit-crossDbId",
            points: sBend(
                boxes.ObservationUnit.anchor("ObservationUnit-crossDbId"),
                boxes.Cross.anchor("Cross"),
                1),
            markerEnd: 'triangle'
        }, {
            id: "ObservationUnit-germplasmDbId",
            points: sBend(
                boxes.ObservationUnit.anchor("ObservationUnit-germplasmDbId"),
                boxes.Germplasm.anchor("Germplasm"),
                1),
            markerEnd: 'triangle'
        }, {
            id: "ObservationUnit-seedLotDbId",
            points: sBend(
                boxes.ObservationUnit.anchor("ObservationUnit-seedLotDbId"),
                boxes.SeedLot.anchor("SeedLot"),
                1),
            markerEnd: 'triangle'
        }, {
            id: "CrossParent-observationUnitDbId",
            points: sBend(
                boxes.CrossParent.anchor("CrossParent-observationUnitDbId"),
                boxes.ObservationUnit.anchor("ObservationUnit"),
                1),
            markerEnd: 'triangle'
        }, {
            id: "GermplasmAttribute-method",
            points: sBend(
                boxes.GermplasmAttribute.anchor("GermplasmAttribute-method"),
                boxes.Method.anchor("Method"),
                1),
            markerEnd: 'triangle'
        }, {
            id: "GermplasmAttribute-scale",
            points: sBend(
                boxes.GermplasmAttribute.anchor("GermplasmAttribute-scale"),
                boxes.Scale.anchor("Scale"),
                1),
            markerEnd: 'triangle'
        }, {
            id: "GermplasmAttribute-trait",
            points: sBend(
                boxes.GermplasmAttribute.anchor("GermplasmAttribute-trait"),
                boxes.Trait.anchor("Trait"),
                1),
            markerEnd: 'triangle'
        }, {
            id: "GermplasmAttribute-ontologyReference",
            points: sBend(
                boxes.GermplasmAttribute.anchor("GermplasmAttribute-ontologyReference"),
                boxes.Ontology.anchor("Ontology"),
                1),
            markerEnd: 'triangle'
        }, ];

        connectors = connectors.concat(phenoXgermConnectors);
    }

    if (modules.includes('geno') && modules.includes('germ')) {
        var genoXgermConnectors = [{
            id: "Reference-sourceGermplasm",
            points: sBend(
                boxes.Reference.anchor("Reference-sourceGermplasm"),
                boxes.Germplasm.anchor("Germplasm"),
                1),
            markerEnd: 'triangle'
        }, {
            id: "ReferenceSet-sourceGermplasm",
            points: sBend(
                boxes.ReferenceSet.anchor("ReferenceSet-sourceGermplasm"),
                boxes.Germplasm.anchor("Germplasm"),
                1),
            markerEnd: 'triangle'
        }, {
            id: "Sample-germplasmDbId",
            points: sBend(
                boxes.Sample.anchor("Sample-germplasmDbId"),
                boxes.Germplasm.anchor("Germplasm"),
                1),
            markerEnd: 'triangle'
        }, ];

        connectors = connectors.concat(genoXgermConnectors);
    }

    return connectors;
}

const lineBufferPX = 10;

function sBend(start, end, xShift = 1) {
    points = [
        start,
        { x: start.x + (xShift * lineBufferPX), y: start.y },
        { x: start.x + (xShift * lineBufferPX), y: end.y },
        end
    ]
    return points;
}

function underBend(start, startBox, end, xShift1 = 1, yShift = 1, xShift2 = 1) {
    points = [
        start,
        { x: start.x + (xShift1 * lineBufferPX), y: start.y },
        { x: start.x + (xShift1 * lineBufferPX), y: startBox.bottomY() + (yShift * lineBufferPX) },
        { x: end.x - (xShift2 * lineBufferPX), y: startBox.bottomY() + (yShift * lineBufferPX) },
        { x: end.x - (xShift2 * lineBufferPX), y: end.y },
        end
    ]
    return points;
}

function overBend(start, startBox, end, xShift1 = 1, yShift = 1, xShift2 = 1) {
    points = [
        start,
        { x: start.x + (xShift1 * lineBufferPX), y: start.y },
        { x: start.x + (xShift1 * lineBufferPX), y: startBox.topY() - (yShift * lineBufferPX) },
        { x: end.x - (xShift2 * lineBufferPX), y: startBox.topY() - (yShift * lineBufferPX) },
        { x: end.x - (xShift2 * lineBufferPX), y: end.y },
        end
    ]
    return points;
}

function bypassOver(start, bypassBox, end, xShift1 = 1, yShift = 1, xShift2 = 1) {
    points = [
        start,
        { x: start.x + (xShift1 * lineBufferPX), y: start.y },
        { x: start.x + (xShift1 * lineBufferPX), y: startBox.topY() - (yShift * lineBufferPX) },
        { x: end.x - (xShift2 * lineBufferPX), y: startBox.topY() - (yShift * lineBufferPX) },
        { x: end.x - (xShift2 * lineBufferPX), y: end.y },
        end
    ]
    return points;
}