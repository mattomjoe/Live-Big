$(document).ready(function() {
  // Delete this once data is being dynamically
  // added to the "users" table:
  var currentUserId = 1;

  function reviewHabits() {
    if (!isNaN(currentUserId)) {
      window.location.href = "/review/" + currentUserId;
    } else {
      window.location.href = "/test";
    }
  }

  //$.post("/api/users", { userName: "Steve" });
  $(document).on("click", "#add", function(event) {
    event.preventDefault();

    var newHabit = {
      habitName: $("#Activity")
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

  $(document).on("click", ".completeHabit", function(event) {
    var id = $(this)
      .parent()
      .parent()
      .data("id");

    console.log(id);

    $.ajax({
      method: "PUT",
      url: "/api/habits/" + id,
      data: { completed: 1 }
    });

    window.location.reload();
  });

  $(document).on("click", ".create-button", function(event) {
    if (!isNaN(currentUserId)) {
      window.location.href = "/create/" + currentUserId;
    } else {
      window.location.href = "/habits";
    }
  });

  $(document).on("click", ".review-button", function(event) {
    reviewHabits();
  });

  $(document).on("click", ".habitsEntered", function(event) {
    reviewHabits();
  });

  $("#Activity, #Times").keyup(function(event) {
    if (event.keyCode === 13) {
      $("#add").click();
    }
  });
});
