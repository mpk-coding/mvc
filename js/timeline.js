function timelineHandler(parent, event) {
  event.preventDefault();
  //
  $.ajax({
    method: "POST",
    url: "actions.php",
    data: outbound,
    dataType: "json",
    success: function (inbound) {
      console.log(inbound);
      //
      renderContent(inbound);
      //
    },
    //
  });
  //
}
