var todos = [
  // todos
  {id: 1, name: "Get the thing working", detail: "Nibh invenire convenire et cum"},
  {id: 2, name: "Get out", detail: "Nibh invenire convenire et cum"},
  {id: 3, name: "Drink and eat", detail: "Nibh invenire convenire et cum"}
];
var start = (function(can, $, out, todos) {
  var Todo = can.Model.extend({
    // todo model
    // fetches things and so on
    findAll: function() {
      // get all todos
      return $.Deferred().resolve(todos);
    },
    findOne: function(params) {
      // get one todo
      return $.Deferred().resolve(todos[(+params.id) - 1]);
    },
    update: function(id, attributes) {
      // update one todo
      $extend(todos[id - 1], attributes);
      return $.Deferred().resolve();
    },
    destroy: function() {
      // destroy todo
      return $.Deferred().resolve();
    }
  });
  can.Component.extend({
    // router component
    // handles page routing
    tag: "router",
    events: {
      "/ route": function(data) {
        $(out).html(can.view("javascript_view/home", {}));
      },
      "/details/:id route": function(data) {
        $(out).html(can.view("javascript_view/details", {}));
      }
    }
  });
  can.Component.extend({
    // button-details component
    // shows todo details
    tag: "button-details",
    template: "<a href='#!details/runthisthing' class='button'>Details</a>",
    scope: {
    }
  });

  $(out).html(can.view("app", {}));

  can.route(":page/:id", {page: "", id: ""});
  can.route.ready();
  console.log("fucking shit");
})(can, $, "#out", todos);