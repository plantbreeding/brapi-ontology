/**
 * BrAPI Data Type Browser
 **************************
 * A user web interface to browse BrAPI modules, categories and data types with
 * their related calls and other related data types.
 */

/**
 * Global vairables 
 *******************
 * Here is a list of global variables (g_*) and their basic structure.
 *
 * - g_brapi_data: data loaded from "data/brapi_data.json" file.
 *   {
 *      "BrAPI-<MODULE NAME1>": {
 *        "<CATEGORY NAME1>": {
 *          "Calls": {
 *            "<API CALL PATH1>": {
 *              "methods": {
 *                "<METHOD1>": {
 *                  "description": "...",
 *                  "parameters": [{
 *                    "description": "...",
 *                    "name": "<FIELD NAME>",
 *                    "schema": {
 *                      "$ref": "#/<PATH>/<DATA TYPE NAME>"
 *                      // or
 *                      "type": "<TYPE>"
 *                    },
 *                    ...
 *                  },
 *                  ...]
 *                },
 *                "<METHOD2>": {
 *                  ...
 *                },
 *                ...
 *              }
 *            },
 *            "<API CALL PATH2>": {
 *              ...
 *            },
 *            ...
 *          },
 *          "Datatypes": {
 *            "<DATA TYPE NAME1>": {
 *              "properties": {
 *                "<FIELD NAME>": {
 *                  "format": "<FORMAT>",
 *                  "type": "<TYPE>",
 *                  "description": "...",
 *                  "example": ...,
 *                },
 *                ...
 *              },
 *              "type": "..."
 *            },
 *            "<DATA TYPE NAME2>": {
 *              ...
 *            },
 *            ...
 *          }
 *        },
 *        "<CATEGORY NAME2>": {
 *          ...
 *        },
 *        ...
 *      },
 *      "BrAPI-<MODULE NAME2>": {
 *        ...
 *      },
 *      ...
 *    };
 * - g_brapi_data_types: contains data type details (calls using it, properties,
 *   ...).
 *   {
 *     "<DATA TYPE NAME1>": {
 *       "_calls": {
 *         // List of calls using this data type.
 *         "<API CALL PATH1>": {
 *           "fields": {<FIELD NAME1>: true, <FIELD NAME2>: true, ...},
 *           "object": <BOOLEAN> // True when the object is provided as
 *                                  // parameter (in POST methods)
 *         },
 *         "<API CALL PATH2>": ...,
 *         ...
 *       },
 *       "_as_field_in": {
 *          "<DATA TYPE NAME1>": true,
 *          "<DATA TYPE NAME2>": true,
 *          ...
 *       },
 *       "_inherits_from": {
 *          "<DATA TYPE NAME1>": true,
 *          "<DATA TYPE NAME2>": true,
 *          ...
 *       },
 *       "_description": '<DESCRIPTION>',
 *       "_ontology_link": '<ONTOLOGY LINK>',
 *       "_ontology": '<ONTOLOGY NAME>',
 *       "_issue": <ISSUE NUMBER>,
 *       "_completed": <BOOLEAN>, // True if all data type fields have been completely loaded.
 *       "_has_menu": <BOOLEAN>, // True if data type has a menu entry.
 *       "<FIELD NAME1>": true,
 *       "<FIELD NAME2>": true,
 *       ...
 *     },
 *     "<DATA TYPE NAME2>": {
 *       ...
 *     },
 *     ...
 *   };
 *  
 * - g_brapi_calls: List of calls with their associated objects.
 *   {
 *     "<API CALL PATH1>": {
 *       "<DATA TYPE NAME1>": {
 *         "object": <BOOLEAN>,
 *         "fields": {
 *           "<FIELD NAME1>": true,
 *           "<FIELD NAME2>": true,
 *           ...
 *         }
 *       }, 
 *     },
 *     "<API CALL PATH2>": {
 *       ...
 *     },
 *     ...
 *   };
 *
 * - g_brapi_fields: List of fields with thier associated data types and calls.
 *   {
 *     "<FIELD NAME1>": {
 *       "calls": {
 *         "API CALL PATH1": true,
 *         "API CALL PATH2": true,
 *         ...
 *       },
 *       "data_types": {
 *         "DATA TYPE NAME1": true,
 *         "DATA TYPE NAME2": true,
 *         ...
 *       },
 *       "ontology": <ONTOLOGY NAME>,
 *       "ontology_link": <ONTOLOGY TERM URL>,
 *       "issue": <ISSUE ID>
 *     },
 *     "<FIELD NAME2>": {
 *       ...
 *     },
 *     ...
 *   };
 *
 * - g_unprocessed_data_types: list of data type names that still need to be
 *   processed.
 *
 * - g_unprocessed_calls: list of API call paths that still need to be
 *   processed.
 *
 * - g_issue_label_cache: hash of issue label data by term issue id.
 */
// Variables are initialized after page loading.
var g_brapi_data = {}; // Contains data_type_browser.json.
// Fields to ignore for relationships.
var g_brapi_generic_fields = {
  "additionalInfo": true,
  "type": true
};
var g_brapi_data_types = {};
var g_brapi_calls = {};
var g_brapi_fields = {};
var g_unprocessed_data_types = [];
var g_unprocessed_calls = [];
var g_issue_label_cache = {};

/**
 * Displays field details popup.
 */
function displayFieldDetailsPopup(field_name) {
  var type_name = '<div><span class="header">Type:</span> <code>'
    + g_brapi_fields[field_name]['type']
    + '</code></div>'
  ;
  var description = (
    g_brapi_fields[field_name]['description']
    ? '<div><span class="header">Description:</span> <i>' + g_brapi_fields[field_name]['description'] + '</i></div>'
    : '<div><span class="header">Description:</span> n/a</div>'
  );
  var examples =
    '<div class="brapi-example"><span class="header">Example(s):</span><br/>'
    + (g_brapi_fields[field_name]['example']
      ? '<code>'
        + g_brapi_fields[field_name]['example']
        + '</code>'
      : 'n/a'
    )
    + '</div>'
  ;
  var ontology = '';
  if (g_brapi_fields[field_name].ontology_link) {
    ontology = '<div><span class="header">Ontology:</span> <a href="'
      + g_brapi_fields[field_name].ontology_link
      + '">'
      + g_brapi_fields[field_name].ontology
      + '</a></div>'
    ;
  }
  else if (g_brapi_fields[field_name].ontology) {
    ontology = '<div><span class="header">Ontology:</span> ' + g_brapi_fields[field_name].ontology + '</div>';
  }
  else {
    ontology = '<div><span class="header">Ontology:</span> n/a</div>';
  }
  var issue_url = '#';
  if (g_brapi_fields[field_name].issue) {
    issue_url = 'https://github.com/plantbreeding/brapi-ontology/issues/' + g_brapi_fields[field_name].issue;
  }
  var issue_link = '<div class="issue-link">Questions, comments, requests: <a href="' + issue_url + '" target="_blank">term discussion</a></div>'

  $('#brapi_popup_content').html(
    '<div class="brapi-data-type-details">'
    + '<h3><i>"' + field_name + '"</i> details</h3>'
    + type_name
    + description
    + ontology
    + examples
    + issue_link
    + '</div>'
  );
  $('#brapi_popup_wrapper').show();
}

/**
 * Displays datat type name details popup.
 */
function displayDataTypeNameDetailsPopup(data_type_name) {
  var description = (
    g_brapi_data_types[data_type_name]['_description']
    ? '<div><span class="header">Description:</span> <i>' + g_brapi_data_types[data_type_name]['_description'] + '</i></div>'
    : '<div><span class="header">Description:</span> n/a</div>'
  );

  var ontology = '';
  if (g_brapi_data_types[data_type_name]['_ontology_link']) {
    ontology = '<div><span class="header">Ontology:</span> <a href="'
      + g_brapi_data_types[data_type_name]['_ontology_link']
      + '">'
      + g_brapi_data_types[data_type_name]['_ontology']
      + '</a></div>'
    ;
  }
  else if (g_brapi_data_types[data_type_name]['_ontology']) {
    ontology = '<div><span class="header">Ontology:</span> ' + g_brapi_data_types[data_type_name]['_ontology'] + '</div>';
  }
  else {
    ontology = '<div><span class="header">Ontology:</span> n/a</div>';
  }
  var issue_url = '#';
  if (g_brapi_data_types[data_type_name]['_issue']) {
    issue_url = 'https://github.com/plantbreeding/brapi-ontology/issues/' + g_brapi_data_types[data_type_name]['_issue'];
  }
  var issue_link = '<div class="issue-link">Questions, comments, requests: <a href="' + issue_url + '" target="_blank">term discussion</a></div>'

  $('#brapi_popup_content').html(
    '<div class="brapi-data-type-details">'
    + '<h3><i>"' + data_type_name + '"</i> details</h3>'
    + description
    + ontology
    + issue_link
    + '</div>'
  );
  $('#brapi_popup_wrapper').show();
}

/**
 * Renders a box with the given data type fields.
 */
function brapiRenderDataType(data_type_name) {
  var data_type_html =
    '<div class="brapi-data-type"><span class="header">'
    + data_type_name
    + '</span><div class="detail-link">[<span class="detail-link" onclick="javascript:displayDataTypeNameDetailsPopup(\''
    + data_type_name
    + '\')">term details</span>]</div>'
  ;

  data_type_html += '<table class="field-table"><thead><tr><th>Field</th><th>Type</th><th>Issues</th><th></th></tr></thead><tbody>';
  // Sort field names.
  var field_names = [];
  for (var field_name in g_brapi_data_types[data_type_name]) {
    if (!field_name.match(/^_/)) {
      field_names.push(field_name);
    }
  }
  field_names = field_names.sort();
  field_names.forEach(function (field_name) {
    // Skip internal members.
    if (!field_name.match(/^_/)) {
      // Generate a random identifier.
      var issue_html_id = Math.floor((Math.random()*0x100000000)).toString(16);
      issue_html_id = 'issue_status_' + '0'.repeat(8 - issue_html_id.length) + issue_html_id;
      
      var field_name_label = field_name;
      // If field is also a data type, link to data type.
      if (g_brapi_data_types[field_name]) {
        field_name_label =
          '<span class="brapi-data-type" onclick="javascript:$(\'#bdb_view\').html(\'<div>\'+brapiRenderDataType(\''
          + field_name
          + '\')+brapiRenderRelatedCalls(\''
          + field_name
          + '\')+brapiRenderRelatedDataTypes(\''
          + field_name
          + '\')+\'</div>\');">' + field_name + '</span>';
      }

      data_type_html += '<tr><td class="field-name"><div title="'
        + g_brapi_fields[field_name]['description'].replace(/"/g, '&quot;')
        + '">'
        + field_name_label
        + '</div></td><td class="type-name">'
        + g_brapi_fields[field_name]['type']
        + '</td><td id="' + issue_html_id + '" class="issue-flags">'
        + '⌛'
        + '</td><td class="detail-link">[<span class="detail-link" onclick="javascript:displayFieldDetailsPopup(\'' + field_name + '\')">view details</span>]</td></tr>'
      ;
      // Get issue status.
      var issue_number = g_brapi_fields[field_name].issue;
      if (!issue_number) {
        console.log('Warning: missing issue number for term "' + field_name + '"');
        data_type_html = data_type_html.replace(
          '<td id="' + issue_html_id + '" class="issue-flags">⌛',
          '<td id="' + issue_html_id + '" class="issue-flags">❌ Missing issue!'
        );
      }
      else if (g_issue_label_cache[issue_number]) {
        // Check if a $.get call returned something and wait otherwise.
        var updateIcons = function(iid, inum) {
          if (g_issue_label_cache[inum].length) {
            $('#' + iid).html(brapiRenderIssueIcons(inum));
          }
          else {
            window.setTimeout(updateIcons, 1000, iid, inum);
          }
        };
        updateIcons(issue_html_id, issue_number);
      }
      else {
        g_issue_label_cache[issue_number] = [];
        $.get(
          'https://api.github.com/repos/plantbreeding/brapi-ontology/issues/' + issue_number + '/labels',
          (function(iid, inum) {
            return function (data) {
              g_issue_label_cache[inum] = data;
              $('#' + iid).html(brapiRenderIssueIcons(inum));
            }
          }
        )(issue_html_id, issue_number))
        .fail((function(iid, inum) {
            return function (jqXHR, textStatus, errorThrown) {
              console.log('Failed to get data from Github: ' + errorThrown);
              g_issue_label_cache[issue_number] = [{
                "id": 0,
                "node_id": '',
                "url": '',
                "name": "BrAPI issue status not available",
                "color": "808080",
                "default": false,
                "description": "Github returned an error. Issue status not available. Symbol: n/a"
              }];
              $('#' + iid).html(brapiRenderIssueIcons(inum));
            }
          }
        )(issue_html_id, issue_number));
      }
    }
  });
  data_type_html += '</tbody></table>';
  data_type_html += '</div>';
  return data_type_html;
}

/**
 * Renders issue icons.
 */
function brapiRenderIssueIcons(issue_number) {

  if (!g_issue_label_cache[issue_number]) {
    return 'n/a';
  }

  var html_output = '';
  var icons = [];
  // console.log(data);
  g_issue_label_cache[issue_number].forEach(function (gh_label) {
    // Only match BrAPI labels.
    if (gh_label.name.match(/^BrAPI /)) {
      // Matches "Symbol: XXX" in definition to extract symbol.
      // The regexp will stop matching from the first dot "." after the
      // symbol, if one, allowing extra comments.
      icon = gh_label.description.match(/^(.*?)\s*Symbol: (.+?)(?:\..*)?$/);
      if (icon) {
        icons.push(
          '<span class="issue-flag" style="color: #'
          + gh_label.color
          + ';" title="'
          + icon[1].replace(/"/g, '&quot;')
          + '">'
          + icon[2]
          + '</span>'
        );
      }
      else {
        icons.push('<span class="issue-flag" title="github label with no symbol - please fix label description">?</span>');
      }
    }
  });
  if (icons.length) {
    html_output = icons.join(' ');
  }
  else {
    html_output = '<span class="issue-flag" style="color: green;" title="OK">✓</span>';
  }
  return html_output;
}

/**
 * Renders a box with calls related to the given data type.
 */
function brapiRenderRelatedCalls(data_type_name) {
  var related_func_html = '<div class="brapi-related"><div class="header">Related calls</div>';
  var object_calls = [];
  var field_calls = [];
  for (var call_name in g_brapi_data_types[data_type_name]._calls) {
    if (g_brapi_data_types[data_type_name]._calls[call_name].object) {
      object_calls.push(call_name);
    }
    else {
      field_calls.push({"call": call_name, "fields": g_brapi_data_types[data_type_name]._calls[call_name].fields});
    }
    // related_func_html += '<div> <span class="call-name">' + call_name + '</span></div>';
  }

  // Sort calls names.
  object_calls = object_calls.sort();
  field_calls = field_calls.sort(function (a, b) {return new Intl.Collator().compare(a.call, b.call);});
  
  object_calls.forEach(function (oc) {
    related_func_html += '<div> <span class="call-name">' + oc + '</span></div>';
  });
  
  field_calls.forEach(function (fc) {
    var field_list = [];
    for (var field in fc.fields) {
      field_list.push(field);
    }
    related_func_html +=
      '<div> <span class="call-name">'
      + fc.call
      + '</span> (through field(s): '
      + field_list.join(', ')
      + ')</div>'
    ;
  });
  
  related_func_html += '</div>';
  return related_func_html;
}

/**
 * Renders a box with other data type related to the given data type.
 */
function brapiRenderRelatedDataTypes(data_type_name) {
  var related_obj_html = '<div class="brapi-related"><div class="header">Related data types</div>';
  // Sort names.
  var other_data_types = [];
  for (var other_data_type in g_brapi_data_types[data_type_name]['_as_field_in']) {
    other_data_types.push(other_data_type);
  }
  other_data_types = other_data_types.sort();

  other_data_types.forEach(function (other_data_type) {
    related_obj_html += '<div> <span class="call-name">' + other_data_type + '</span></div>';
  });
  
  related_obj_html += '</div>';
  return related_obj_html;
}

/**
 * Process a 'properties' object of an object (openAPI format).
 *
 * @return: returns an array of processed field names. It does not include
 *   subfields (ie. field names of objects that are in the given properties).
 */
function brapiProcessFields(properties) {
  var processed_fields = [];
  // Iterate on each field (aka property).
  for (var property_name in properties) {
    var brapi_propery = properties[property_name];
    // Check if the field is already known.
    if (!g_brapi_fields[property_name]) {
      // Add field to known field list.
      g_brapi_fields[property_name] = {
        "calls": {},
        "data_types": {},
        "description": brapi_propery['description'] ?? '',
        "type": brapi_propery['type'],
        "example": brapi_propery['example'] ?? '',
        //+FIXME: get additional data from yaml.
        "issue": 0,
        "ontology": '',
        "ontology_link": ''
      };
      // Recurse on objects.
      if (('object' == brapi_propery['type'])
          && (!g_brapi_data_types[property_name])
      ) {
        // Add field as a data type since it is an object.
        brapiProcessDataType(property_name, brapi_propery);
      }
      // Process arrays.
      if (('array' == brapi_propery['type'])
          && (!g_brapi_data_types[property_name])
      ) {
        if ('object' == brapi_propery['items']['type']) {
          // Add field as a data type since it is an object.
          brapiProcessDataType(property_name, brapi_propery['items']);
        }
        g_brapi_fields[property_name]['type'] =
          'array of '
          + brapi_propery['items']['type']
          + 's' // Plural.
        ;
      }
    }
    processed_fields.push(property_name);
  }

  return processed_fields;
}

/**
 * Process a data type.
 *
 * If there are inheritances and parent objects are not ready, the current
 * data type will be put back into the stack of data types to process
 * g_unprocessed_data_types.
 *
 * @see https://swagger.io/specification/
 */
function brapiProcessDataType(data_type_name, data_type_data) {

  // Add data type to the global registry.
  g_brapi_data_types[data_type_name] = {
    "_calls": {},
    "_as_field_in": {},
    "_inherits_from": {},
    "_description": '',
    "_ontology_link": '',
    "_ontology": '',
    "_issue": 0,
    "_completed": true,
    "_has_menu": false
  };

  if (data_type_data['description']) {
    g_brapi_data_types[data_type_name]["_description"] = data_type_data['description'];
  }

  if (data_type_data['x-ontology']) {
    g_brapi_data_types[data_type_name]["_ontology"] = data_type_data['x-ontology'];
  }

  if (data_type_data['externalDoc']) {
    g_brapi_data_types[data_type_name]["_ontology_link"] = data_type_data['externalDoc'];
  }

  if (data_type_data['x-issue-number']) {
    g_brapi_data_types[data_type_name]["_issue"] = data_type_data['x-issue-number'];
  }

  // Process data type fields.
  var fields = brapiProcessFields(data_type_data['properties']);
  fields.forEach(function (field) {
    g_brapi_data_types[data_type_name][field] = true;
    g_brapi_fields[field].data_types[data_type_name] = true;
  });

  var inheritance = false;
  if (data_type_data['allOf']) {
    inheritance = 'allOf';
  }
  else if (data_type_data['oneOf']) {
    inheritance = 'oneOf';
  }
  else if (data_type_data['anyOf']) {
    inheritance = 'anyOf';
  }
  // Check for inheritance.
  if (inheritance) {
    data_type_data[inheritance].forEach(function(inheritance_data) {
      // Process regular fields.
      var fields = brapiProcessFields(inheritance_data['properties']);
      fields.forEach(function (field) {
        g_brapi_data_types[data_type_name][field] = true;
        g_brapi_fields[field].data_types[data_type_name] = true;
      });

      // Process inheritance if available.
      if (inheritance_data['$ref']) {
        var matches = inheritance_data['$ref'].match(/\/(\w+)$/);
        if (matches && matches[1]) {
          var inherited_data_type = matches[1];
          // Check if we got a parent and if the parent is completed.
          if (g_brapi_data_types[inherited_data_type] && g_brapi_data_types[inherited_data_type]._completed) {
            Object.assign(g_brapi_data_types[data_type_name], g_brapi_data_types[inherited_data_type]);
          }
          else {
            g_brapi_data_types[data_type_name]._completed = false;
          }
          g_brapi_data_types[data_type_name]['_as_field_in'][inherited_data_type] = inheritance;
        }
      }
    });
  }
  //+FIXME handle "additionalProperties"
  // Check data type processing status.
  if (!g_brapi_data_types[data_type_name]._completed) {
    g_unprocessed_data_types.push(data_type);
  }
}

/**
 * Processes a call data.
 */
function brapiFillCall(call_ref) {
  var call_data = g_brapi_data[call_ref.module][call_ref.category]['Calls'][call_ref.call];
  g_brapi_calls[call_ref.call] = {};
  // Processes methods.
  for (var method in call_data.methods) {
    call_data.methods[method]["parameters"].forEach(function (call_parameter) {
      // Check if call parameter uses a known field name.
      if (g_brapi_fields[call_parameter['name']]
          && !g_brapi_generic_fields[call_parameter['name']]) {
        for (var data_type in g_brapi_fields[call_parameter['name']].data_types) {
          if (g_brapi_data_types[data_type]) {
            // Add call to data type related calls.
            if (!g_brapi_data_types[data_type]._calls[call_ref.call]) {
              g_brapi_data_types[data_type]._calls[call_ref.call] = {
                'fields': {},
                'object': false
              };
            }
            g_brapi_data_types[data_type]._calls[call_ref.call].fields[call_parameter['name']] = true;
          }
          else {
            console.log('WARNING: Missing data type "' + data_type + '" for call "' + call_ref.call + '"');
          }
        }
      }
      else if (call_parameter['$ref']) {
        // Process $ref
        var matches = call_parameter['$ref'].match(/\/(\w+)$/);
        if (matches && matches[1]) {
          if ('authorizationHeader' == matches[1]) {
            // +FIXME: add a properties that says call requires authentication.
          }
          //+FIXME: skip page, pageSize, externalReferenceID, externalReferenceSource?
        }
      }
      else if (call_parameter['name'] && !g_brapi_fields[call_parameter['name']]) {
        console.log('WARNING: Unknown field "' + call_parameter['name'] + '" for call "' + call_ref.call + '"');
        g_brapi_fields[call_parameter['name']] = {
          "calls": {},
          "data_types": {},
          "ontology": call_parameter['x-ontology'] ?? '',
          "ontology_link": call_parameter['externalDoc'] ?? '',
          "issue": call_parameter['x-issue-number'] ?? ''
         };
         g_brapi_fields[call_parameter['name']]['calls'][call_ref.call] = true;
      }
    });
    // Process "requestBody".
    if (call_data.methods[method]["requestBody"]
        && call_data.methods[method]["requestBody"]["content"]
        && call_data.methods[method]["requestBody"]["content"]["application/json"]
        && call_data.methods[method]["requestBody"]["content"]["application/json"]["schema"]
        && call_data.methods[method]["requestBody"]["content"]["application/json"]["schema"]["items"]
        && call_data.methods[method]["requestBody"]["content"]["application/json"]["schema"]["items"]["$ref"]
    ) {
      // Process $ref
      var matches = call_data.methods[method]["requestBody"]["content"]["application/json"]["schema"]["items"]["$ref"].match(/\/(\w+)$/);
      if (matches && matches[1]) {
        if (g_brapi_data_types[matches[1]]) {
          // Adds reference to call.
          if (!g_brapi_data_types[matches[1]]._calls[call_ref.call]) {
            g_brapi_data_types[matches[1]]._calls[call_ref.call] = {
              'fields': {},
              'object': true
            };
          }
          else {
            g_brapi_data_types[matches[1]]._calls[call_ref.call].object = true;
          }
        }
      }
    }
  }
}

/**
 * Processes g_brapi_data to generate a menu and populates
 * g_unprocessed_data_types stack.
 */
function brapiPrepareMenu() {
  // Adds menu.
  var $menu = $('#bdb_left_panel');
  var $brapi_module_list = $('<ul id="brapi_module_list"></ul>')
    .appendTo($menu)
  ;
  //+FIXME: add filtering menu.
  //+FIXME: add a menu for fields only used in call parameters
  // Loops on module names.
  for (var brapi_module_name in g_brapi_data) {
    var $brapi_module = $('<li class="brapi-module" title="' + brapi_module_name + ' module">' + brapi_module_name + '</li>').appendTo($brapi_module_list);
    var $brapi_category_list = $('<ul></ul>').appendTo($brapi_module);
    // Sort categories.
    var brapi_module_category_names = [];
    for (var brapi_module_category_name in g_brapi_data[brapi_module_name]) {
      brapi_module_category_names.push(brapi_module_category_name);
    }
    brapi_module_category_names = brapi_module_category_names.sort();

    // Loops on categories.
    brapi_module_category_names.forEach(function (brapi_module_category_name) {
      var $brapi_category = $('<li class="brapi-category" title="' + brapi_module_category_name + ' category">' + brapi_module_category_name + '</li>').appendTo($brapi_category_list);
      var $brapi_data_type_list = $('<ul></ul>').appendTo($brapi_category);
      var brapi_data_type_names = [];

      // Sort data types.
      for (var brapi_data_type_name in g_brapi_data[brapi_module_name][brapi_module_category_name]['Datatypes']) {
        brapi_data_type_names.push(brapi_data_type_name);
      }
      brapi_data_type_names = brapi_data_type_names.sort();
      
      // Loops on data types.
      brapi_data_type_names.forEach(function (brapi_data_type_name) {
        var $brapi_data_type = $('<li class="brapi-data-type" title="' + brapi_data_type_name + ' data type">' + brapi_data_type_name + '</li>')
          .appendTo($brapi_data_type_list)
          .on('click', (function(data_type_name) {
            return function(event) {
              window.scrollTo(0, 0);
              $('#brapi_module_list li:not(:has(ul))').removeClass('active');
              $(this).addClass('active');
              $('#bdb_view').html(
                '<div>'
                + brapiRenderDataType(data_type_name)
                + brapiRenderRelatedCalls(data_type_name)
                + brapiRenderRelatedDataTypes(data_type_name)
                + '</div>'
              );
            }
          })(brapi_data_type_name))
        ;
        g_unprocessed_data_types.push({
          module:   brapi_module_name,
          category: brapi_module_category_name,
          name:     brapi_data_type_name
        });
      });
      
      // Loops on calls.
      for (var brapi_call_path in g_brapi_data[brapi_module_name][brapi_module_category_name]['Calls']) {
        g_unprocessed_calls.push({
          module:   brapi_module_name,
          category: brapi_module_category_name,
          call:     brapi_call_path
        });
      }
    });
  }
}

/**
 * Processes g_unprocessed_data_types populated by brapiPrepareMenu().
 */
function brapiInitDataTypes() {
  var stack_size = 0;
  // Loop while there are elements to process (handles inheritance).
  while (g_unprocessed_data_types.length
    && g_unprocessed_data_types.length != stack_size) {
    // Clone stack.
    var stack = g_unprocessed_data_types;
    // Keep track of stack size to prevent infinite trials.
    stack_size = stack.length;
    // Empty current stack.
    g_unprocessed_data_types = [];
    // Process every element of the stack.
    stack.forEach(function (data_type) {
      brapiProcessDataType(
        data_type.name,
        g_brapi_data[data_type.module][data_type.category]['Datatypes'][data_type.name]
      );
      g_brapi_data_types[data_type.name]._has_menu = true;
    });
  }
}

/**
 * Processes g_unprocessed_calls populated by brapiPrepareMenu().
 */
function brapiInitCalls() {
  // Process every element of the stack.
  g_unprocessed_calls.forEach(function (call_ref) {
    brapiFillCall(call_ref);
  });
}

/**
 * 
 */
function brapiInitDataTypeRelationships() {
  // Process every data type.
  for (var data_type_name in g_brapi_data_types) {
    // If the data type is also a field, it is a sub-object.
    if (g_brapi_fields[data_type_name]) {
      g_brapi_data_types[data_type_name]['_as_field_in'] =
        g_brapi_fields[data_type_name]['data_types'];
    }
  }
}

/**
 * Add menu entries for other data types.
 */
function brapiPrepareOtherMenu() {
  // Process other fields.
  var $orphan = $('<li class="brapi-module" title="Other data types from calls and sub-objects.">Uncategorized data types</li>').appendTo('#brapi_module_list');
  var $brapi_data_type_list = $('<ul id="other_data_type_list"></ul>').appendTo($orphan);
  var other_data_types = [];
  for (var brapi_data_type_name in g_brapi_data_types) {
    if (!g_brapi_data_types[brapi_data_type_name]._has_menu) {
      other_data_types.push(brapi_data_type_name);
    }
  }
  other_data_types = other_data_types.sort();
  other_data_types.forEach(function(brapi_data_type_name) {
    // Add menu entry.
    var $brapi_data_type = $('<li class="brapi-data-type" title="' + brapi_data_type_name + ' data type">' + brapi_data_type_name + '</li>')
      .appendTo($brapi_data_type_list)
      .on('click', (function(data_type_name) {
        return function(event) {
          window.scrollTo(0, 0);
          $('#brapi_module_list li:not(:has(ul))').removeClass('active');
          $(this).addClass('active');
          $('#bdb_view').html(
            '<div>'
            + brapiRenderDataType(data_type_name)
            + brapiRenderRelatedCalls(data_type_name)
            + brapiRenderRelatedDataTypes(data_type_name)
            + '</div>'
          );
        }
      })(brapi_data_type_name))
    ;
  });
}

/**
 * Initialize menu.
 */
function brapiStartMenu() {
  // Menu.
  var $menu = $('#bdb_left_panel');

  // Manages menu collapse.
  $menu.find('li')
    .on('click', function(event) {
      $(this).find('>ul').toggle();
      if ($(this).find('>ul:visible').length) {
        $(this).css('list-style-type', 'disclosure-open');
      }
      else if ($(this).find('>ul:hidden').length) {
        $(this).css('list-style-type', 'disclosure-closed');
      }
      event.stopPropagation();
    })
    .css('cursor', 'pointer')
  ;
  // Hide menu items by default.
  $('#brapi_module_list ul').hide();
  $('#brapi_module_list li:has(ul)').css('list-style-type', 'disclosure-closed');
  // Identify leaves.
  $('#brapi_module_list li:not(:has(ul))').addClass('leaf');
}

// Initialize the whole broswer.
$(function() {
  console.log('BrAPI Data Type Browser Initialization');
  $("#bdb_view").html('<div>Initialization - Please wait...</div>');
  // $.getJSON("data/brapi_data.json", function(data) {
  $.getJSON("https://plantbreeding.github.io/brapi-ontology/data/brapi_data.json", function(data) {
    g_brapi_data = data;
    brapiPrepareMenu();
    brapiInitDataTypes();
    brapiInitCalls();
    brapiInitDataTypeRelationships();
    brapiPrepareOtherMenu();
    // Hides popup on outside clicks.
    $('#brapi_popup_wrapper')
      .on('click', function () {
        $(this).hide();
      })
      .find('.close-icon')
        .on('click', function () {$('#brapi_popup_wrapper').hide(); })
    ;
    brapiStartMenu();
    // Do not hide popup when clicked.
    $('#brapi_popup').on('click', function (event) {event.stopPropagation();});

    $("#bdb_view").html('<div>Ready. Use left menu to browse data types.</div>');
    console.log('BDTB Initialization done.');
  });
});
