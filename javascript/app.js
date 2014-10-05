var todos = [
  // todos
  {id: 1, name: "Get the thing working", detail: "Nibh invenire convenire et cum", tag: "stuff"},
  {id: 2, name: "Get out", detail: "Nibh invenire convenire et cum", tag: "stuff"},
  {id: 3, name: "Drink and eat", detail: "Nibh invenire convenire et cum", tag: "otherstuff"}
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
    create: function(attributes) {
      // creates new todo
      var last = todos[todos.length - 1];
      $.extend(attributes, {id: last.id + 1, detail: "", tag: ""});
      todos.push(attributes);
      return $.Deferred().resolve(attributes);
    },
    update: function(id, attributes) {
      // update one todo
      $.extend(todos[id - 1], attributes);
      return $.Deferred().resolve();
    },
    destroy: function() {
      // destroy todo
      return $.Deferred().resolve();
    }
  }, {});
  var TodoList = new Todo.List({});
  can.Component.extend({
    // router component
    // handles page routing
    tag: "router",
    events: {
      "/ route": function(data) {
        console.log("home");
        $(out).html(can.view("javascript_view/home", {}));
      },
      "/details/:id route": function(data) {
        console.log("details");
        // this is triggered for todo details
        $(out).html(can.view("javascript_view/details", {}));
      }
    }
  });
  can.Component.extend({
    // todos-list-wrap component
    // common scope for todos list
    tag: "todos-list-wrap",
    scope: {
      todos: TodoList.slice(0)
    },
    events: {
      "{Todo} created": function(Todo, event, newTodo) {
        console.log("new");
        this.scope.attr("todos").push(newTodo);
      },
      "{Todo} destroyed": function(Todo, event, destroyedTodo) {
        // this is triggered for todo done
        console.log("destroyed");
        if(destroyedTodo.id == can.route.attr("id")) can.route.removeAttr("id");
      }
    }
  });
  can.Component.extend({
    // todos-list component
    // lists todos
    tag: "todos-list",
    template: can.view("javascript_view/todos-list")
  });
  can.Component.extend({
    // todo-new
    // make new todo
    tag: "todo-new",
    template: can.view("javascript_view/todo-new"),
    scope: {
      entered: function(context, element) {
        new Todo({
          name: can.trim(element.val())          
        }).save();
        can.route.removeAttr("filter");
        element.val("");
      }
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
    template: can.view("javascript_view/button-done")
  });

  $(out).html(can.view("app", {}));

  can.route(":page", {page: ""});
  can.route(":page/:id", {page: "", id: ""});
  can.route.ready();
  console.log("fucking shit");
})(can, $, "#out", todos);