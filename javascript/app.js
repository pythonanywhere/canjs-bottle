var start = (function(can, $) {
  can.Component.extend({
    // button-details component
    // shows todo details
    tag: "button-details",
    template: "<a href='#' class='button' can-click='clicked'>Details</a>",
    scope: {
      clicked: function() {
        console.log("id", this.attr("lookfor"));
      }
    }
  });
  $("#out").html(can.view("app", {}));
  console.log("fucking shit");
})(can, $);