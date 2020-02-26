$(() => {
  $("#new-tweet-form").submit(function(event) {
    event.preventDefault();
    const $this = $(this);
    const $tweetStatus = $this.next();
    // console.log($this.serialize());
    if ($this.children("textarea").val().length < 0) {
      // console.log("nothing here!", $this.children("textarea").val());
      console.log("under 1");

      $tweetStatus.text("Nothing In Tweet!");
      $tweetStatus.fadeOut(1000);
    } else if ($this.children("textarea").val().length > 140) {
      // console.log("over 140", $this.children("textarea").val());
      console.log("over140");

      $tweetStatus.text("Tweet Overload!");
      // $tweetStatus.style.display = "inline";
      $tweetStatus.fadeOut(1000);
    } else {
      $.ajax("tweets", {
        method: "POST",
        data: $(this).serialize()
      });
      $tweetStatus.text("Tweet Sent!");
    }
  });
});
