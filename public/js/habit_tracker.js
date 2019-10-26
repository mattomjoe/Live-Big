$(document).ready(function() {
  var currentUserId = 1;

  $(document).on("click", "#add", function(event) {
    event.preventDefault();

    alert("I like the cheese.");

    console.log("I like the cheese.");

    var newHabit = {
      habitName: $("#Activity")
        .val()
        .trim(),
      perWeek: $("#Times")
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

  $(document).on("click", ".completeActivity", function(event) {
    var id = $(this)
      .parent()
      .data("id");

    $.ajax("api/habits/" + id, {
      type: "PUT",
      data: { completed: 1 }
    });
  });

  $("#Activity, #Times").keyup(function(event) {
    if (event.keyCode === 13) {
      $("#add").click();
    }
  });
});
