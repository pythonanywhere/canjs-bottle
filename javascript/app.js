var start = (function(can, $) {
  can.Component.extend({
    tag: "button-details",
    template: "<a href='#' class='button' id='sometodo'>Details</a>",
    scope: {
      select: function(todo) {

      }
    }
  });
  console.log("fucking shit");
})(can, $);