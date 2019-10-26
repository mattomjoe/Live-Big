$(document).ready(function() {
  var currentUserId = 1;

  $(document).on("click", "#search", function(event) {
    event.preventDefault();

    var newHabit = {
      habitName: $("#Activity")
        .val()
        .trim(),
      completed: 0,
      UserId: currentUserId
    };

    $.ajax("api/habits", {
      type: "POST",
      data: newHabit
    }).then(function() {
      console.log("Created new habit.");

      window.location.reload();
    });
  });
});

$(document).on("click", ".completeActivity", function(event) {
  var id = $(this)
    .parent()
    .data("id");

  $.ajax("api/habits/" + id, {
    type: "PUT",
    data: {}
  });
});
