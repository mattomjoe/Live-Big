$(document).ready(function() {
  // Delete this once data is being dynamically
  // added to the "users" table:
  var currentUserId = 1;
  $.post("/api/users", { userName: "Steve" });
  $(document).on("click", "#add", function(event) {
    event.preventDefault();

    alert("wee");

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

    // The following line of code creates dummy data
    // for the purposes of testing without actual users:
    //$.post("/api/users", {userName: "Steve"});

    $.post("/api/habits", newHabit).then(function() {
      console.log("Created new habit.");

      window.location.reload();
    });
  });

  $(document).on("click", ".deleteHabit", function(event) {
    var habitId = $(this)
      .parent()
      .parent()
      .data("id");

    console.log("Habit id is " + habitId);

    $.ajax({
      method: "DELETE",
      url: "/api/habits/" + habitId
    }).then(function() {
      window.location.reload();
    });
  });

  $(document).on("click", ".tablinks", function(event) {
    var id = $(this)
      .parent()
      .data("id");

    $.ajax("api/habits/" + id, {
      type: "PUT",
      data: { completed: 1 }
    });

    window.location.reload();
  });

  $("#Activity, #Times").keyup(function(event) {
    if (event.keyCode === 13) {
      $("#add").click();
    }
  });
});
