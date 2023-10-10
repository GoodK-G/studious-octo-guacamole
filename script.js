
$(document).ready(function () {
  // Get the current hour using Day.js
  var currentHour = dayjs().hour();

  // Function to update time block colors
  function updateTimeBlockColors() {
    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      if (currentHour > blockHour ) {
        $(this).addClass("past").removeClass("present future");
      } else if (blockHour === currentHour) {
        $(this).addClass("present").removeClass("past future");
      } else {
        $(this).addClass("future").removeClass("past present");
      }
    });
  }

  // Call updateTimeBlockColors to initially set the classes
  updateTimeBlockColors();

  // Add a click event listener for the save buttons
  $(".saveBtn").on("click", function () {
    var hour = $(this).closest(".time-block").attr("id").split("-")[1];
    var text = $(this).siblings(".description").val();
    localStorage.setItem("event-" + hour, text);
  });

  // Load saved events from local storage
  $(".time-block").each(function () {
    var hour = $(this).attr("id").split("-")[1];
    var savedText = localStorage.getItem("event-" + hour);
    if (savedText !== null) {
      $(this).find(".description").val(savedText);
    }
  });

  // Update the time block colors every minute
  setInterval(updateTimeBlockColors, 60000);

  // Display the current date
  function displayCurrentDate() {
    $("#currentDay").text(dayjs().format("dddd, MMMM DD"));
  }

  displayCurrentDate();
});
