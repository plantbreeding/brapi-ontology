/**
 * BrAPI Data Type Browser
 **************************
 * A user web interface to browse BrAPI modules, categories and data types with
 * their related calls and other related data types.
 */
var g_brapi_data = {}; // To be loaded fro data_type_browser.json
var g_brapi_generic_fields = {"id": true};
var g_brapi_data_types = {};
var g_brapi_calls = {};
var g_brapi_fields = {};

/**
 * Displays field details popup.
 */
function displayFieldDetailsPopup(data_type_name, field_name) {
  var type_name = '<div><span class="header">Type:</span> <code>'
    + g_brapi_data_types[data_type_name][field_name]['type']
    + '</code></div>'
  ;
  var description = (
    g_brapi_data_types[data_type_name][field_name]['description']
    ? '<div><span class="header">Description:</span> <i>' + g_brapi_data_types[data_type_name][field_name]['description'] + '</i></div>'
    : '<div><span class="header">Description:</span> n/a</div>'
  );
  var examples =
    '<div class="brapi-example"><span class="header">Example(s):</span><br/>'
    + (g_brapi_data_types[data_type_name][field_name]['example']
      ? '<code>'
        + g_brapi_data_types[data_type_name][field_name]['example']
        + '</code>'
      : 'n/a'
    )
    + '</div>'
  ;
  var ontology = '<div><span class="header">Ontology:</span> ...</div>';
  var issue_link = 'Questions, comments, requests: <a class="issue-link" href="#" target="_blank">term discussion</a>'

  $('#brapi_popup').html(
    '<div class="brapi-data-type-details">'
    + '<h3>' + field_name + ' details</h3>'
    + type_name
    + description
    + ontology
    + examples
    + issue_link
    + '</div>'
  );
  $('#brapi_popup_wrap').css("display", "block");
}

/**
 * Renders a box with the given data type fields.
 */
function brapiRenderDataType(data_type_name) {
  var data_type_html = '<div class="brapi-data-type"><div class="header">' + data_type_name + '</div>';
  for (var field_name in g_brapi_data_types[data_type_name]) {
    // Skip internal members.
    if (!field_name.match(/^_/)) {
      data_type_html +=
        '<div title="'
        + g_brapi_data_types[data_type_name][field_name]['description'].replace(/"/g, '&quot;')
        + '">'
        + field_name
        + ' ('
        + g_brapi_data_types[data_type_name][field_name]['type']
        + ')'
        + ' <a href="javascript:displayFieldDetailsPopup(\'' + data_type_name + '\', \'' + field_name + '\')">view details</a>'
        + '</div>'
      ;
    }
  }
  data_type_html += '</div>';
  return data_type_html;
}

/**
 * Renders a box with calls related to the given data type.
 */
function brapiRenderRelatedCalls(data_type_name) {
  var related_func_html = '<div class="brapi-related"><div class="header">Related calls</div>';
  for (var call_name in g_brapi_data_types[data_type_name]._calls) {
    related_func_html += '<div>' + call_name + '</div>';
  }
  related_func_html += '</div>';
  return related_func_html;
}

var g_unprocessed_data_types = [];
var g_unprocessed_calls = [];
/**
 * Processes a data type.
 * If there are inheritances and parent objects are not ready, the current
 * data type will be put back into the stack of data types to process
 * g_unprocessed_data_types.
 *
 * @see https://swagger.io/specification/
 */
function brapiFillDataType(data_type) {
  var module = data_type.module
      category = data_type.category, 
      data_type_name = data_type.name;
  g_brapi_data_types[data_type_name] = {
    "_calls": {},
    "_completed": true
  };
  for (var property_name in g_brapi_data[module][category]['Datatypes'][data_type_name]['properties']) {
    var brapi_propery = g_brapi_data[module][category]['Datatypes'][data_type_name]['properties'][property_name];
    g_brapi_data_types[data_type_name][property_name] = {
      "description": brapi_propery['description'] ?? '',
      "type": brapi_propery['type'],
      "example": brapi_propery['example'] ?? ''
    };
    // Add field reference.
    g_brapi_fields[property_name] = g_brapi_fields[property_name] ?? {};
    g_brapi_fields[property_name][data_type_name] = true;
  }
  var inheritance = false;
  if (g_brapi_data[module][category]['Datatypes'][data_type_name]['allOf']) {
    inheritance = 'allOf';
  }
  else if (g_brapi_data[module][category]['Datatypes'][data_type_name]['oneOf']) {
    inheritance = 'oneOf';
  }
  else if (g_brapi_data[module][category]['Datatypes'][data_type_name]['anyOf']) {
    inheritance = 'anyOf';
  }
  // Check for inheritance.
  if (inheritance) {
    g_brapi_data[module][category]['Datatypes'][data_type_name][inheritance].forEach(function(inheritance_data) {
      // Add regular properties.
      for (var property_name in inheritance_data['properties']) {
        var brapi_propery = inheritance_data['properties'][property_name];
        g_brapi_data_types[data_type_name][property_name] = {
          "description": brapi_propery['description'] ?? '',
          "type": brapi_propery['type'],
          "example": brapi_propery['example'] ?? ''
        };
      }
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
        for (var data_type in g_brapi_fields[call_parameter['name']]) {
          if (g_brapi_data_types[data_type]) {
            // Add call to data type related calls.
            g_brapi_data_types[data_type]._calls[call_ref.call] = true;
          }
          else {
            console.log('WARNING: Missing data type "' + data_type + '" for call "' + call_ref.call + '"');
          }
        }
        //+FIXME: Process $ref
      }
      else {
        console.log('WARNING: Unknown field "' + call_parameter['name'] + '" for call "' + call_ref.call + '"');
      }
    });
  }
  //+FIXME: Processes components.
  //+++
}

/**
 * Processes g_brapi_data to generate a menu and populates
 * g_unprocessed_data_types stack.
 */
function brapiInitMenu() {
  // Adds menu.
  var $menu = $('#bdb_left_panel');
  var $brapi_module_list = $('<ul id="brapi_module_list"></ul>')
    .appendTo($menu)
  ;
  // Loops on module names.
  for (var brapi_module_name in g_brapi_data) {
    var $brapi_module = $('<li class="brapi-module" title="' + brapi_module_name + ' module">' + brapi_module_name + '</li>').appendTo($brapi_module_list);
    var $brapi_category_list = $('<ul></ul>').appendTo($brapi_module);
    // Loops on categories.
    for (var brapi_module_category_name in g_brapi_data[brapi_module_name]) {
      var $brapi_category = $('<li class="brapi-category" title="' + brapi_module_category_name + ' category">' + brapi_module_category_name + '</li>').appendTo($brapi_category_list);
      var $brapi_data_type_list = $('<ul></ul>').appendTo($brapi_category);
      // Loops on data types.
      for (var brapi_data_type_name in g_brapi_data[brapi_module_name][brapi_module_category_name]['Datatypes']) {
        var $brapi_data_type = $('<li class="brapi-data-type" title="' + brapi_data_type_name + ' data type">' + brapi_data_type_name + '</li>')
          .appendTo($brapi_data_type_list)
          .on('click', (function(data_type_name) {
            return function(event) {
              $('#brapi_module_list li:not(:has(ul))').css({
                'font-weight': 'normal',
                'list-style-type': 'disc'
              });
              $(this).css({
                'font-weight': 'bold',
                'list-style-type': 'square'
              });
              $('#bdb_view').html(
                '<div>'
                + brapiRenderDataType(data_type_name)
                + brapiRenderRelatedCalls(data_type_name)
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
      }
      // Loops on calls.
      for (var brapi_call_path in g_brapi_data[brapi_module_name][brapi_module_category_name]['Calls']) {
        g_unprocessed_calls.push({
          module:   brapi_module_name,
          category: brapi_module_category_name,
          call:     brapi_call_path
        });
      }
    }
  }
  
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
  $('#brapi_module_list li:not(:has(ul))').css('list-style-type', 'disc');
}

/**
 * Processes g_unprocessed_data_types populated by brapiInitMenu().
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
      brapiFillDataType(data_type);
    });
  }
}

/**
 * Processes g_unprocessed_calls populated by brapiInitMenu().
 */
function brapiInitCalls() {
  // Process every element of the stack.
  g_unprocessed_calls.forEach(function (call_ref) {
    brapiFillCall(call_ref);
  });
}

// Initialize the whole broswer.
$(function() {
  // $.getJSON("data/brapi_data.json", function(data) {
  $.getJSON("https://plantbreeding.github.io/brapi-ontology/data/brapi_data.json", function(data) {
    g_brapi_data = data;
  });
  brapiInitMenu();
  brapiInitDataTypes();
  brapiInitCalls();
  // Hides popup on outside clicks.
  $('#brapi_popup_wrap').on('click', function () {
    $(this).css("display", "none");
  });
  // Do not hide popup when clicked.
  $('#brapi_popup').on('click', function (event) {event.stopPropagation();});
});
