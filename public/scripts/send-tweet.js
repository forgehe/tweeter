$(() => {
  const $sendTweet = $(".new-tweet-form");

  $sendTweet.submit(function(event) {
    console.log($(this).serialize());
    event.preventDefault();
  });
});
