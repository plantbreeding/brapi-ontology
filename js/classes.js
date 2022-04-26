function buildClasses(modules) {

    var moduleData = {
        "BrAPI-Core": [
            new ClassModel(
                "CommonCropName",
                attributes = ["commonCropName"],
                links = [],
                x = 720,
                y = 0,
                width = 150,
                height = 0
            ),
            new ClassModel(
                "ListDetails",
                attributes = [
                    "additionalInfo",
                    "data",
                    "dateCreated",
                    "dateModified",
                    "externalReferences",
                    "listDbId",
                    "listDescription",
                    "listName",
                    "listOwnerName",
                    "listOwnerPersonDbId",
                    "listSize",
                    "listSource",
                    "listType"
                ],
                links = [],
                x = 720,
                y = 100,
                width = 150,
                height = 0
            ),
            new ClassModel(
                "Location",
                attributes = [
                    "abbreviation",
                    "additionalInfo",
                    "coordinateDescription",
                    "coordinateUncertainty",
                    "coordinates",
                    "countryCode",
                    "countryName",
                    "documentationURL",
                    "environmentType",
                    "exposure",
                    "externalReferences",
                    "instituteAddress",
                    "instituteName",
                    "locationDbId",
                    "locationName",
                    "locationType",
                    "parentLocationDbId",
                    "parentLocationName",
                    "siteStatus",
                    "slope",
                    "topography"
                ],
                links = [],
                x = 480,
                y = 400,
                width = 150,
                height = 0
            ),
            new ClassModel(
                "Person",
                attributes = [
                    "additionalInfo",
                    "description",
                    "emailAddress",
                    "externalReferences",
                    "firstName",
                    "lastName",
                    "mailingAddress",
                    "middleName",
                    "personDbId",
                    "phoneNumber",
                    "userID"
                ],
                links = [],
                x = 720,
                y = 400,
                width = 150,
                height = 0
            ),
            new ClassModel(
                "Program",
                attributes = [
                    "abbreviation",
                    "additionalInfo",
                    "commonCropName",
                    "documentationURL",
                    "externalReferences",
                    "fundingInformation",
                    "leadPersonDbId",
                    "leadPersonName",
                    "objective",
                    "programDbId",
                    "programName",
                    "programType"
                ],
                links = [],
                x = 480,
                y = 100,
                width = 150,
                height = 0
            ),
            new ClassModel(
                "Season",
                attributes = [
                    "seasonDbId",
                    "seasonName",
                    "year"
                ],
                links = [],
                x = 240,
                y = 500,
                width = 150,
                height = 0
            ),
            new ClassModel(
                "Study",
                attributes = [
                    "active",
                    "additionalInfo",
                    "commonCropName",
                    "contacts",
                    "culturalPractices",
                    "dataLinks",
                    "documentationURL",
                    "endDate",
                    "environmentParameters",
                    "experimentalDesign",
                    "externalReferences",
                    "growthFacility",
                    "lastUpdate",
                    "license",
                    "locationDbId",
                    "locationName",
                    "observationLevels",
                    "observationUnitsDescription",
                    "observationVariableDbIds",
                    "seasons",
                    "startDate",
                    "studyCode",
                    "studyDbId",
                    "studyDescription",
                    "studyName",
                    "studyPUI",
                    "studyType",
                    "trialDbId",
                    "trialName"
                ],
                links = [],
                x = 0,
                y = 100,
                width = 150,
                height = 0
            ),
            new ClassModel(
                "Trial",
                attributes = [
                    "active",
                    "additionalInfo",
                    "commonCropName",
                    "contacts",
                    "datasetAuthorships",
                    "documentationURL",
                    "endDate",
                    "externalReferences",
                    "programDbId",
                    "programName",
                    "publications",
                    "startDate",
                    "trialDbId",
                    "trialDescription",
                    "trialName",
                    "trialPUI"
                ],
                links = [],
                x = 240,
                y = 100,
                width = 150,
                height = 0
            )
        ],
        "BrAPI-Genotyping": [
            new ClassModel(
                "Call",
                attributes = [
                    "additionalInfo",
                    "callSetDbId",
                    "callSetName",
                    "genotype",
                    "genotype_likelihood",
                    "phaseSet",
                    "variantDbId",
                    "variantName",
                    "variantSetDbId",
                    "variantSetName"
                ],
                links = [],
                x = 0,
                y = 100,
                width = 150,
                height = 0
            ),
            new ClassModel(
                "CallSet",
                attributes = [
                    "additionalInfo",
                    "callSetDbId",
                    "callSetName",
                    "created",
                    "externalReferences",
                    "sampleDbId",
                    "studyDbId",
                    "updated",
                    "variantSetDbIds"
                ],
                links = [],
                x = 240,
                y = 100,
                width = 150,
                height = 0
            ),
            new ClassModel(
                "GenomeMap",
                attributes = [
                    "additionalInfo",
                    "comments",
                    "commonCropName",
                    "documentationURL",
                    "linkageGroupCount",
                    "mapDbId",
                    "mapName",
                    "mapPUI",
                    "markerCount",
                    "publishedDate",
                    "scientificName",
                    "type",
                    "unit"
                ],
                links = [],
                x = 0,
                y = 550,
                width = 150,
                height = 0
            ),
            new ClassModel(
                "MarkerPosition",
                attributes = [
                    "additionalInfo",
                    "linkageGroupName",
                    "mapDbId",
                    "mapName",
                    "position",
                    "variantDbId",
                    "variantName"
                ],
                links = [],
                x = 0,
                y = 350,
                width = 150,
                height = 0
            ),
            new ClassModel(
                "Plate",
                attributes = [
                    "additionalInfo",
                    "externalReferences",
                    "plateBarcode",
                    "plateDbId",
                    "plateFormat",
                    "plateName",
                    "programDbId",
                    "sampleType",
                    "studyDbId",
                    "trialDbId"
                ],
                links = [],
                x = 720,
                y = 100,
                width = 150,
                height = 0
            ),
            new ClassModel(
                "Reference",
                attributes = [
                    "additionalInfo",
                    "commonCropName",
                    "externalReferences",
                    "isDerived",
                    "length",
                    "md5checksum",
                    "referenceDbId",
                    "referenceName",
                    "referenceSetDbId",
                    "referenceSetName",
                    "sourceAccessions",
                    "sourceDivergence",
                    "sourceGermplasm",
                    "sourceURI",
                    "species"
                ],
                links = [],
                x = 720,
                y = 600,
                width = 150,
                height = 0
            ),
            new ClassModel(
                "ReferenceSet",
                attributes = [
                    "additionalInfo",
                    "assemblyPUI",
                    "commonCropName",
                    "description",
                    "externalReferences",
                    "isDerived",
                    "md5checksum",
                    "referenceSetDbId",
                    "referenceSetName",
                    "sourceAccessions",
                    "sourceGermplasm",
                    "sourceURI",
                    "species"
                ],
                links = [],
                x = 720,
                y = 330,
                width = 150,
                height = 0
            ),
            new ClassModel(
                "Sample",
                attributes = [
                    "additionalInfo",
                    "column",
                    "externalReferences",
                    "germplasmDbId",
                    "observationUnitDbId",
                    "plateDbId",
                    "plateName",
                    "programDbId",
                    "row",
                    "sampleBarcode",
                    "sampleDbId",
                    "sampleDescription",
                    "sampleGroupDbId",
                    "sampleName",
                    "samplePUI",
                    "sampleTimestamp",
                    "sampleType",
                    "studyDbId",
                    "takenBy",
                    "tissueType",
                    "trialDbId",
                    "well"
                ],
                links = [],
                x = 480,
                y = 100,
                width = 150,
                height = 0
            ),
            new ClassModel(
                "Variant",
                attributes = [
                    "additionalInfo",
                    "alternate_bases",
                    "ciend",
                    "cipos",
                    "created",
                    "end",
                    "externalReferences",
                    "filtersApplied",
                    "filtersFailed",
                    "filtersPassed",
                    "referenceBases",
                    "referenceDbId",
                    "referenceName",
                    "referenceSetDbId",
                    "referenceSetName",
                    "start",
                    "svlen",
                    "updated",
                    "variantDbId",
                    "variantNames",
                    "variantSetDbId",
                    "variantType"
                ],
                links = [],
                x = 240,
                y = 400,
                width = 150,
                height = 0
            ),
            new ClassModel(
                "VariantSet",
                attributes = [
                    "additionalInfo",
                    "analysis",
                    "availableFormats",
                    "callSetCount",
                    "externalReferences",
                    "referenceSetDbId",
                    "studyDbId",
                    "variantCount",
                    "variantSetDbId",
                    "variantSetName"
                ],
                links = [],
                x = 480,
                y = 520,
                width = 150,
                height = 0
            )
        ],
        "BrAPI-Germplasm": [
            new ClassModel(
                "BreedingMethod",
                attributes = [
                    "abbreviation",
                    "breedingMethodDbId",
                    "breedingMethodName",
                    "description"
                ],
                links = [],
                x = 480,
                y = 700,
                width = 150,
                height = 0
            ), new ClassModel(
                "Cross",
                attributes = [
                    "additionalInfo",
                    "crossAttributes",
                    "crossDbId",
                    "crossName",
                    "crossType",
                    "crossingProjectDbId",
                    "crossingProjectName",
                    "externalReferences",
                    "parent1",
                    "parent2",
                    "plannedCrossDbId",
                    "plannedCrossName",
                    "pollinationEvents",
                    "pollinationTimeStamp"
                ],
                links = [],
                x = 0,
                y = 450,
                width = 150,
                height = 0
            ),
            new ClassModel(
                "CrossParent",
                attributes = [
                    "germplasmDbId",
                    "germplasmName",
                    "observationUnitDbId",
                    "observationUnitName",
                    "parentType"
                ],
                links = [],
                x = 240,
                y = 700,
                width = 150,
                height = 0
            ),
            new ClassModel(
                "CrossingProject",
                attributes = [
                    "additionalInfo",
                    "commonCropName",
                    "crossingProjectDbId",
                    "crossingProjectDescription",
                    "crossingProjectName",
                    "externalReferences",
                    "potentialParents",
                    "programDbId",
                    "programName"
                ],
                links = [],
                x = 240,
                y = 450,
                width = 150,
                height = 0
            ),
            new ClassModel(
                "Germplasm",
                attributes = [
                    "accessionNumber",
                    "acquisitionDate",
                    "additionalInfo",
                    "biologicalStatusOfAccessionCode",
                    "biologicalStatusOfAccessionDescription",
                    "breedingMethodDbId",
                    "breedingMethodName",
                    "collection",
                    "commonCropName",
                    "countryOfOriginCode",
                    "defaultDisplayName",
                    "documentationURL",
                    "donors",
                    "externalReferences",
                    "genus",
                    "germplasmDbId",
                    "germplasmName",
                    "germplasmOrigin",
                    "germplasmPUI",
                    "germplasmPreprocessing",
                    "instituteCode",
                    "instituteName",
                    "pedigree",
                    "seedSource",
                    "seedSourceDescription",
                    "species",
                    "speciesAuthority",
                    "storageTypes",
                    "subtaxa",
                    "subtaxaAuthority",
                    "synonyms",
                    "taxonIds"
                ],
                links = [],
                x = 480,
                y = 50,
                width = 200,
                height = 0
            ),
            new ClassModel(
                "GermplasmAttribute",
                attributes = [
                    "additionalInfo",
                    "attributeCategory",
                    "attributeDbId",
                    "attributeDescription",
                    "attributeName",
                    "attributePUI",
                    "commonCropName",
                    "contextOfUse",
                    "defaultValue",
                    "documentationURL",
                    "externalReferences",
                    "growthStage",
                    "institution",
                    "language",
                    "method",
                    "ontologyReference",
                    "scale",
                    "scientist",
                    "status",
                    "submissionTimestamp",
                    "synonyms",
                    "trait"
                ],
                links = [],
                x = 760,
                y = 100,
                width = 150,
                height = 0
            ),
            new ClassModel(
                "GermplasmAttributeValue",
                attributes = [
                    "additionalInfo",
                    "attributeDbId",
                    "attributeName",
                    "attributeValueDbId",
                    "determinedDate",
                    "externalReferences",
                    "germplasmDbId",
                    "germplasmName",
                    "value"
                ],
                links = [],
                x = 760,
                y = 520,
                width = 150,
                height = 0
            ),
            new ClassModel(
                "PedigreeNode",
                attributes = [
                    "additionalInfo",
                    "breedingMethodDbId",
                    "breedingMethodName",
                    "crossingProjectDbId",
                    "crossingYear",
                    "defaultDisplayName",
                    "externalReferences",
                    "familyCode",
                    "germplasmDbId",
                    "germplasmName",
                    "germplasmPUI",
                    "parents",
                    "pedigreeString",
                    "progeny",
                    "siblings"
                ],
                links = [],
                x = 240,
                y = 100,
                width = 150,
                height = 0
            ),
            new ClassModel(
                "PlannedCross",
                attributes = [
                    "additionalInfo",
                    "crossType",
                    "crossingProjectDbId",
                    "crossingProjectName",
                    "externalReferences",
                    "parent1",
                    "parent2",
                    "plannedCrossDbId",
                    "plannedCrossName",
                    "status"
                ],
                links = [],
                x = 0,
                y = 750,
                width = 150,
                height = 0
            ),
            new ClassModel(
                "SeedLot",
                attributes = [
                    "additionalInfo",
                    "amount",
                    "contentMixture",
                    "createdDate",
                    "externalReferences",
                    "lastUpdated",
                    "locationDbId",
                    "locationName",
                    "programDbId",
                    "programName",
                    "seedLotDbId",
                    "seedLotDescription",
                    "seedLotName",
                    "sourceCollection",
                    "storageLocation",
                    "units"
                ],
                links = [],
                x = 0,
                y = 100,
                width = 150,
                height = 0
            ),
        ],
        "BrAPI-Phenotyping": [
            new ClassModel(
                "Event",
                attributes = [
                    "additionalInfo",
                    "date",
                    "eventDbId",
                    "eventDescription",
                    "eventParameters",
                    "eventType",
                    "eventTypeDbId",
                    "observationUnitDbIds",
                    "studyDbId"
                ],
                links = [],
                x = 0,
                y = 500,
                width = 150,
                height = 0
            ),
            new ClassModel(
                "Image",
                attributes = [
                    "additionalInfo",
                    "copyright",
                    "description",
                    "descriptiveOntologyTerms",
                    "externalReferences",
                    "imageDbId",
                    "imageFileName",
                    "imageFileSize",
                    "imageHeight",
                    "imageLocation",
                    "imageName",
                    "imageTimeStamp",
                    "imageURL",
                    "imageWidth",
                    "mimeType",
                    "observationDbIds",
                    "observationUnitDbId"
                ],
                links = [],
                x = 0,
                y = 100,
                width = 150,
                height = 0
            ),
            new ClassModel(
                "Method",
                attributes = [
                    "additionalInfo",
                    "bibliographicalReference",
                    "description",
                    "externalReferences",
                    "formula",
                    "methodClass",
                    "methodDbId",
                    "methodName",
                    "methodPUI",
                    "ontologyReference"
                ],
                links = [],
                x = 720,
                y = 100,
                width = 150,
                height = 0
            ),
            new ClassModel(
                "Observation",
                attributes = [
                    "additionalInfo",
                    "collector",
                    "externalReferences",
                    "geoCoordinates",
                    "germplasmDbId",
                    "germplasmName",
                    "observationDbId",
                    "observationTimeStamp",
                    "observationUnitDbId",
                    "observationUnitName",
                    "observationVariableDbId",
                    "observationVariableName",
                    "season",
                    "studyDbId",
                    "uploadedBy",
                    "value"
                ],
                links = [],
                x = 240,
                y = 100,
                width = 150,
                height = 0
            ),
            new ClassModel(
                "ObservationUnit",
                attributes = [
                    "additionalInfo",
                    "crossDbId",
                    "crossName",
                    "externalReferences",
                    "germplasmDbId",
                    "germplasmName",
                    "locationDbId",
                    "locationName",
                    "observationUnitDbId",
                    "observationUnitName",
                    "observationUnitPUI",
                    "observationUnitPosition",
                    "observations",
                    "programDbId",
                    "programName",
                    "seedLotDbId",
                    "seedLotName",
                    "studyDbId",
                    "studyName",
                    "treatments",
                    "trialDbId",
                    "trialName"
                ],
                links = [],
                x = 240,
                y = 450,
                width = 150,
                height = 0
            ),
            new ClassModel(
                "ObservationVariable",
                attributes = [
                    "additionalInfo",
                    "commonCropName",
                    "contextOfUse",
                    "defaultValue",
                    "documentationURL",
                    "externalReferences",
                    "growthStage",
                    "institution",
                    "language",
                    "method",
                    "observationVariableDbId",
                    "observationVariableName",
                    "ontologyReference",
                    "scale",
                    "scientist",
                    "status",
                    "submissionTimestamp",
                    "synonyms",
                    "trait"
                ],
                links = [],
                x = 480,
                y = 100,
                width = 150,
                height = 0
            ),
            new ClassModel(
                "Ontology",
                attributes = [
                    "additionalInfo",
                    "authors",
                    "copyright",
                    "description",
                    "documentationURL",
                    "licence",
                    "ontologyDbId",
                    "ontologyName",
                    "version"
                ],
                links = [],
                x = 960,
                y = 300,
                width = 150,
                height = 0
            ),
            new ClassModel(
                "Scale",
                attributes = [
                    "additionalInfo",
                    "dataType",
                    "decimalPlaces",
                    "externalReferences",
                    "ontologyReference",
                    "scaleDbId",
                    "scaleName",
                    "scalePUI",
                    "units",
                    "validValues"
                ],
                links = [],
                x = 720,
                y = 350,
                width = 150,
                height = 0
            ),
            new ClassModel(
                "Trait",
                attributes = [
                    "additionalInfo",
                    "alternativeAbbreviations",
                    "attribute",
                    "attributePUI",
                    "entity",
                    "entityPUI",
                    "externalReferences",
                    "mainAbbreviation",
                    "ontologyReference",
                    "status",
                    "synonyms",
                    "traitClass",
                    "traitDbId",
                    "traitDescription",
                    "traitName",
                    "traitPUI"
                ],
                links = [],
                x = 720,
                y = 600,
                width = 150,
                height = 0
            )
        ]
    };

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

    if (modules.indexOf(moduleName) == 1)
        dx = 1400
    if (modules.indexOf(moduleName) == 2)
        dy = 1100
    if (modules.indexOf(moduleName) == 3) {
        dx = 1400
        dy = 1100
    }

    moduleData.forEach(classDef => {
        classDef.x = classDef.x + dx;
        classDef.y = classDef.y + dy;
    });

    return moduleData;
}