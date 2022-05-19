UMLInputClasses = {
    "BrAPI-Core": [{
            "className": "CommonCropName",
            "attributes": [
                "commonCropName"
            ],
            "pk": "commonCropName",
            "links": [],
            "x": 740,
            "y": 0,
            "width": 150,
            "height": 0
        },
        {
            "className": "ListDetails",
            "attributes": [
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
            "pk": "listDbId",
            "links": [{
                "start": "ListDetails-listOwnerPersonDbId",
                "end": "Person"
            }],
            "x": 730,
            "y": 100,
            "width": 150,
            "height": 0
        },
        {
            "className": "Location",
            "attributes": [
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
            "pk": "locationDbId",
            "links": [{
                "start": "Location-parentLocationDbId",
                "end": "Location"
            }],
            "x": 490,
            "y": 460,
            "width": 150,
            "height": 0
        },
        {
            "className": "Person",
            "attributes": [
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
            "pk": "personDbId",
            "links": [],
            "x": 730,
            "y": 460,
            "width": 150,
            "height": 0
        },
        {
            "className": "Program",
            "attributes": [
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
            "pk": "programDbId",
            "links": [{
                    "start": "Program-commonCropName",
                    "end": "CommonCropName"
                },
                {
                    "start": "Program-leadPersonDbId",
                    "end": "Person"
                }
            ],
            "x": 490,
            "y": 100,
            "width": 150,
            "height": 0
        },
        {
            "className": "Season",
            "attributes": [
                "seasonDbId",
                "seasonName",
                "year"
            ],
            "pk": "seasonDbId",
            "links": [],
            "x": 250,
            "y": 500,
            "width": 150,
            "height": 0
        },
        {
            "className": "Study",
            "attributes": [
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
            "pk": "studyDbId",
            "links": [{
                    "start": "Study-commonCropName",
                    "end": "CommonCropName"
                },
                {
                    "start": "Study-locationDbId",
                    "end": "Location"
                },
                {
                    "start": "Study-seasons",
                    "end": "Season"
                },
                {
                    "start": "Study-trialDbId",
                    "end": "Trial"
                }
            ],
            "x": 0,
            "y": 100,
            "width": 150,
            "height": 0
        },
        {
            "className": "Trial",
            "attributes": [
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
            "pk": "trialDbId",
            "links": [{
                    "start": "Trial-commonCropName",
                    "end": "CommonCropName"
                },
                {
                    "start": "Trial-programDbId",
                    "end": "Program"
                }
            ],
            "x": 250,
            "y": 100,
            "width": 150,
            "height": 0
        }
    ],
    "BrAPI-Genotyping": [{
            "className": "Call",
            "attributes": [
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
            "pk": "callDbId",
            "links": [{
                    "start": "Call-callSetDbId",
                    "end": "CallSet"
                },
                {
                    "start": "Call-variantDbId",
                    "end": "Variant"
                },
                {
                    "start": "Call-variantSetDbId",
                    "end": "VariantSet"
                }
            ],
            "x": 0,
            "y": 100,
            "width": 150,
            "height": 0
        },
        {
            "className": "CallSet",
            "attributes": [
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
            "pk": "callSetDbId",
            "links": [{
                    "start": "CallSet-sampleDbId",
                    "end": "Sample"
                },
                {
                    "start": "CallSet-studyDbId",
                    "end": "Study"
                },
                {
                    "start": "CallSet-variantSetDbIds",
                    "end": "VariantSet"
                }
            ],
            "x": 240,
            "y": 100,
            "width": 150,
            "height": 0
        },
        {
            "className": "GenomeMap",
            "attributes": [
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
            "pk": "mapDbId",
            "links": [{
                "start": "GenomeMap-commonCropName",
                "end": "CommonCropName"
            }],
            "x": 0,
            "y": 550,
            "width": 150,
            "height": 0
        },
        {
            "className": "MarkerPosition",
            "attributes": [
                "additionalInfo",
                "linkageGroupName",
                "mapDbId",
                "mapName",
                "position",
                "variantDbId",
                "variantName"
            ],
            "pk": "variantDbId",
            "links": [{
                    "start": "MarkerPosition-mapDbId",
                    "end": "GenomeMap"
                },
                {
                    "start": "MarkerPosition-variantDbId",
                    "end": "Variant"
                }
            ],
            "x": 0,
            "y": 350,
            "width": 150,
            "height": 0
        },
        {
            "className": "Plate",
            "attributes": [
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
            "pk": "plateDbId",
            "links": [{
                    "start": "Plate-programDbId",
                    "end": "Program"
                },
                {
                    "start": "Plate-studyDbId",
                    "end": "Study"
                },
                {
                    "start": "Plate-trialDbId",
                    "end": "Trial"
                }
            ],
            "x": 720,
            "y": 100,
            "width": 150,
            "height": 0
        },
        {
            "className": "Reference",
            "attributes": [
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
            "pk": "referenceDbId",
            "links": [{
                    "start": "Reference-commonCropName",
                    "end": "CommonCropName"
                },
                {
                    "start": "Reference-referenceSetDbId",
                    "end": "ReferenceSet"
                },
                {
                    "start": "Reference-sourceGermplasm",
                    "end": "Germplasm"
                }
            ],
            "x": 720,
            "y": 620,
            "width": 150,
            "height": 0
        },
        {
            "className": "ReferenceSet",
            "attributes": [
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
            "pk": "referenceSetDbId",
            "links": [{
                    "start": "ReferenceSet-commonCropName",
                    "end": "CommonCropName"
                },
                {
                    "start": "ReferenceSet-sourceGermplasm",
                    "end": "Germplasm"
                }
            ],
            "x": 720,
            "y": 330,
            "width": 150,
            "height": 0
        },
        {
            "className": "Sample",
            "attributes": [
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
            "pk": "sampleDbId",
            "links": [{
                    "start": "Sample-germplasmDbId",
                    "end": "Germplasm"
                },
                {
                    "start": "Sample-observationUnitDbId",
                    "end": "ObservationUnit"
                },
                {
                    "start": "Sample-plateDbId",
                    "end": "Plate"
                },
                {
                    "start": "Sample-programDbId",
                    "end": "Program"
                },
                {
                    "start": "Sample-studyDbId",
                    "end": "Study"
                },
                {
                    "start": "Sample-trialDbId",
                    "end": "Trial"
                }
            ],
            "x": 480,
            "y": 100,
            "width": 150,
            "height": 0
        },
        {
            "className": "Variant",
            "attributes": [
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
            "pk": "variantDbId",
            "links": [{
                    "start": "Variant-referenceDbId",
                    "end": "Reference"
                },
                {
                    "start": "Variant-referenceSetDbId",
                    "end": "ReferenceSet"
                },
                {
                    "start": "Variant-variantSetDbId",
                    "end": "VariantSet"
                }
            ],
            "x": 240,
            "y": 400,
            "width": 150,
            "height": 0
        },
        {
            "className": "VariantSet",
            "attributes": [
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
            "pk": "variantSetDbId",
            "links": [{
                    "start": "VariantSet-referenceSetDbId",
                    "end": "ReferenceSet"
                },
                {
                    "start": "VariantSet-studyDbId",
                    "end": "Study"
                }
            ],
            "x": 480,
            "y": 580,
            "width": 150,
            "height": 0
        }
    ],
    "BrAPI-Germplasm": [{
            "className": "BreedingMethod",
            "attributes": [
                "abbreviation",
                "breedingMethodDbId",
                "breedingMethodName",
                "description"
            ],
            "pk": "breedingMethodDbId",
            "links": [],
            "x": 800,
            "y": 720,
            "width": 150,
            "height": 0
        },
        {
            "className": "Cross",
            "attributes": [
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
            "pk": "crossDbId",
            "links": [{
                    "start": "Cross-crossingProjectDbId",
                    "end": "CrossingProject"
                },
                {
                    "start": "Cross-parent1",
                    "end": "CrossParent"
                },
                {
                    "start": "Cross-parent2",
                    "end": "CrossParent"
                },
                {
                    "start": "Cross-plannedCrossDbId",
                    "end": "PlannedCross"
                }
            ],
            "x": 0,
            "y": 450,
            "width": 150,
            "height": 0
        },
        {
            "className": "CrossParent",
            "attributes": [
                "germplasmDbId",
                "germplasmName",
                "observationUnitDbId",
                "observationUnitName",
                "parentType"
            ],
            "pk": "crossParentDbId",
            "links": [{
                    "start": "CrossParent-germplasmDbId",
                    "end": "Germplasm"
                },
                {
                    "start": "CrossParent-observationUnitDbId",
                    "end": "ObservationUnit"
                }
            ],
            "x": 310,
            "y": 350,
            "width": 150,
            "height": 0
        },
        {
            "className": "CrossingProject",
            "attributes": [
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
            "pk": "crossingProjectDbId",
            "links": [{
                    "start": "CrossingProject-commonCropName",
                    "end": "CommonCropName"
                },
                {
                    "start": "CrossingProject-potentialParents",
                    "end": "CrossParent"
                },
                {
                    "start": "CrossingProject-programDbId",
                    "end": "Program"
                }
            ],
            "x": 310,
            "y": 100,
            "width": 150,
            "height": 0
        },
        {
            "className": "Germplasm",
            "attributes": [
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
            "pk": "germplasmDbId",
            "links": [{
                    "start": "Germplasm-breedingMethodDbId",
                    "end": "BreedingMethod"
                },
                {
                    "start": "Germplasm-commonCropName",
                    "end": "CommonCropName"
                }
            ],
            "x": 550,
            "y": 200,
            "width": 150,
            "height": 0
        },
        {
            "className": "GermplasmAttribute",
            "attributes": [
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
            "pk": "germplasmAttributeDbId",
            "links": [{
                    "start": "GermplasmAttribute-commonCropName",
                    "end": "CommonCropName"
                },
                {
                    "start": "GermplasmAttribute-method",
                    "end": "Method"
                },
                {
                    "start": "GermplasmAttribute-ontologyReference",
                    "end": "Ontology"
                },
                {
                    "start": "GermplasmAttribute-scale",
                    "end": "Scale"
                },
                {
                    "start": "GermplasmAttribute-trait",
                    "end": "Trait"
                }
            ],
            "x": 800,
            "y": 100,
            "width": 150,
            "height": 0
        },
        {
            "className": "GermplasmAttributeValue",
            "attributes": [
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
            "pk": "germplasmAttributeValueDbId",
            "links": [{
                    "start": "GermplasmAttributeValue-attributeDbId",
                    "end": "GermplasmAttribute"
                },
                {
                    "start": "GermplasmAttributeValue-germplasmDbId",
                    "end": "Germplasm"
                }
            ],
            "x": 800,
            "y": 520,
            "width": 150,
            "height": 0
        },
        {
            "className": "PedigreeNode",
            "attributes": [
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
            "pk": "germplasmDbId",
            "links": [{
                    "start": "PedigreeNode-breedingMethodDbId",
                    "end": "BreedingMethod"
                },
                {
                    "start": "PedigreeNode-crossingProjectDbId",
                    "end": "CrossingProject"
                },
                {
                    "start": "PedigreeNode-germplasmDbId",
                    "end": "Germplasm"
                },
                {
                    "start": "PedigreeNode-parents",
                    "end": "PedigreeNode"
                },
                {
                    "start": "PedigreeNode-progeny",
                    "end": "PedigreeNode"
                },
                {
                    "start": "PedigreeNode-siblings",
                    "end": "PedigreeNode"
                }
            ],
            "x": 310,
            "y": 590,
            "width": 150,
            "height": 0
        },
        {
            "className": "PlannedCross",
            "attributes": [
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
            "pk": "plannedCrossDbId",
            "links": [{
                    "start": "PlannedCross-crossingProjectDbId",
                    "end": "CrossingProject"
                },
                {
                    "start": "PlannedCross-parent1",
                    "end": "CrossParent"
                },
                {
                    "start": "PlannedCross-parent2",
                    "end": "CrossParent"
                }
            ],
            "x": 0,
            "y": 750,
            "width": 150,
            "height": 0
        },
        {
            "className": "SeedLot",
            "attributes": [
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
            "pk": "seedLotDbId",
            "links": [{
                    "start": "SeedLot-contentMixture",
                    "end": "Germplasm"
                },
                {
                    "start": "SeedLot-contentMixture",
                    "end": "Cross"
                },
                {
                    "start": "SeedLot-locationDbId",
                    "end": "Location"
                },
                {
                    "start": "SeedLot-programDbId",
                    "end": "Program"
                }
            ],
            "x": 0,
            "y": 100,
            "width": 150,
            "height": 0
        }
    ],
    "BrAPI-Phenotyping": [{
            "className": "Event",
            "attributes": [
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
            "pk": "eventDbId",
            "links": [{
                    "start": "Event-observationUnitDbIds",
                    "end": "ObservationUnit"
                },
                {
                    "start": "Event-studyDbId",
                    "end": "Study"
                }
            ],
            "x": 0,
            "y": 500,
            "width": 150,
            "height": 0
        },
        {
            "className": "Image",
            "attributes": [
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
            "pk": "imageDbId",
            "links": [{
                    "start": "Image-observationDbIds",
                    "end": "Observation"
                },
                {
                    "start": "Image-observationUnitDbId",
                    "end": "ObservationUnit"
                }
            ],
            "x": 0,
            "y": 100,
            "width": 150,
            "height": 0
        },
        {
            "className": "Method",
            "attributes": [
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
            "pk": "methodDbId",
            "links": [{
                "start": "Method-ontologyReference",
                "end": "Ontology"
            }],
            "x": 720,
            "y": 100,
            "width": 150,
            "height": 0
        },
        {
            "className": "Observation",
            "attributes": [
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
            "pk": "observationDbId",
            "links": [{
                    "start": "Observation-germplasmDbId",
                    "end": "Germplasm"
                },
                {
                    "start": "Observation-observationUnitDbId",
                    "end": "ObservationUnit"
                },
                {
                    "start": "Observation-observationVariableDbId",
                    "end": "ObservationVariable"
                },
                {
                    "start": "Observation-season",
                    "end": "Season"
                },
                {
                    "start": "Observation-studyDbId",
                    "end": "Study"
                }
            ],
            "x": 240,
            "y": 100,
            "width": 150,
            "height": 0
        },
        {
            "className": "ObservationUnit",
            "attributes": [
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
            "pk": "observationUnitDbId",
            "links": [{
                    "start": "ObservationUnit-crossDbId",
                    "end": "Cross"
                },
                {
                    "start": "ObservationUnit-germplasmDbId",
                    "end": "Germplasm"
                },
                {
                    "start": "ObservationUnit-locationDbId",
                    "end": "Location"
                },
                {
                    "start": "ObservationUnit-observations",
                    "end": "Observation"
                },
                {
                    "start": "ObservationUnit-programDbId",
                    "end": "Program"
                },
                {
                    "start": "ObservationUnit-seedLotDbId",
                    "end": "SeedLot"
                },
                {
                    "start": "ObservationUnit-studyDbId",
                    "end": "Study"
                },
                {
                    "start": "ObservationUnit-trialDbId",
                    "end": "Trial"
                }
            ],
            "x": 240,
            "y": 450,
            "width": 150,
            "height": 0
        },
        {
            "className": "ObservationVariable",
            "attributes": [
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
            "pk": "observationVariableDbId",
            "links": [{
                    "start": "ObservationVariable-commonCropName",
                    "end": "CommonCropName"
                },
                {
                    "start": "ObservationVariable-method",
                    "end": "Method"
                },
                {
                    "start": "ObservationVariable-ontologyReference",
                    "end": "Ontology"
                },
                {
                    "start": "ObservationVariable-scale",
                    "end": "Scale"
                },
                {
                    "start": "ObservationVariable-trait",
                    "end": "Trait"
                }
            ],
            "x": 480,
            "y": 100,
            "width": 150,
            "height": 0
        },
        {
            "className": "Ontology",
            "attributes": [
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
            "pk": "ontologyDbId",
            "links": [],
            "x": 960,
            "y": 300,
            "width": 150,
            "height": 0
        },
        {
            "className": "Scale",
            "attributes": [
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
            "pk": "scaleDbId",
            "links": [{
                "start": "Scale-ontologyReference",
                "end": "Ontology"
            }],
            "x": 720,
            "y": 350,
            "width": 150,
            "height": 0
        },
        {
            "className": "Trait",
            "attributes": [
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
            "pk": "traitDbId",
            "links": [{
                "start": "Trait-ontologyReference",
                "end": "Ontology"
            }],
            "x": 720,
            "y": 600,
            "width": 150,
            "height": 0
        }
    ]
}