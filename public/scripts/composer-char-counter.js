$(document).ready(function() {
  // --- our code goes here ---
  // $("#new-tweet-textarea").on("change", function() {
  //   console.log("change", this); //The this keyword is a reference to the button
  // });
  const newTweetTextArea = $("#new-tweet-textarea");
  const newTweetCounter = newTweetTextArea.next().children("span");
  newTweetTextArea.on("keydown keyup", function() {
    newTweetCounter.text(140 - $(this).val().length);
    if (newTweetCounter.text() < 0) {
      newTweetCounter.addClass("invalidText");
    } else {
      newTweetCounter.removeClass("invalidText");
    }
  });
  // $("#new-tweet-textarea").on("keyup", function() {
  //   console.log("keyup", this); //The this keyword is a reference to the button
  // });
  // $("#new-tweet-textarea").on("blur", function() {
  //   console.log("blur", this); //The this keyword is a reference to the button
  // });
  // $("#new-tweet-textarea").on("keypress", function() {
  //   console.log("keypress", this); //The this keyword is a reference to the button
  // });
});
