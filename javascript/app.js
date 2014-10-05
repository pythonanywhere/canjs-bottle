var start = (function(can, $, out) {
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
})(can, $, "#out");