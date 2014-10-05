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
  }, {});
  can.Component.extend({
    // router component
    // handles page routing
    tag: "router",
    events: {
      "/ route": function(data) {
        $(out).html(can.view("javascript_view/home", {}));
      },
      "/details/:id route": function(data) {
        // this is triggered for todo details
        $(out).html(can.view("javascript_view/details", {}));
      },
      "/done/:id route": function(data) {
        // this is triggered for todo done
        console.log("done");
      }
    }
  });
  can.Component.extend({
    // todos-list component
    // lists todos
    tag: "todos-list",
    template: can.view("javascript_view/todos-list"),
    scope: {
      todos: new Todo.List({})
    }
  });
  can.Component.extend({
    // button-details component
    // shows todo details
    tag: "button-details",
    template: can.view("javascript_view/button-details"),
    scope: {
      clicked: function() {
        can.route.attr({id: this.attr("lookfor")});
      }
    }
  });
  can.Component.extend({
    // button-done component
    // triggers todo remove
    tag: "button-done",
    template: can.view("javascript_view/button-done"),
    scope: {
      clicked: function() {
        can.route.attr({page: this.attr("page"), id: this.attr("lookfor")});
      }
    }
  });

  $(out).html(can.view("app", {}));

  can.route(":page/:id", {page: "", id: ""});
  can.route.ready();
  console.log("fucking shit");
})(can, $, "#out", todos);