$(document).ready(function() {
  const newTweetTextArea = $("#new-tweet-form").children("textarea");
  const newTweetCounter = $("#new-tweet-form")
    .children("div")
    .children(".counter");
  newTweetTextArea.on("input", function() {
    newTweetCounter.text(140 - $(this).val().length);
    if (newTweetCounter.text() < 0) {
      newTweetCounter.addClass("invalidText");
    } else {
      newTweetCounter.removeClass("invalidText");
    }
  });
});
