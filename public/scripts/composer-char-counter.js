$(document).ready(function() {
  // --- our code goes here ---
  // $("#new-tweet-textarea").on("change", function() {
  //   console.log("change", this); //The this keyword is a reference to the button
  // });
  const newTweetTextArea = $("#new-tweet-textarea");
  const newTweetCounter = newTweetTextArea.next().next();
  newTweetTextArea.on("keydown blur", function() {
    console.log(
      "keydown",
      $(this),
      $(this)
        .next()
        .next()
    ); //The this keyword is a reference to the button
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
