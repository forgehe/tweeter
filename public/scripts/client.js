/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(() => {
  const prependTweet = function(tweet) {
    const $tweet = createTweetElement(tweet);
    $("#tweets-container").prepend($tweet);
  };

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (const tweet of tweets) {
      prependTweet(tweet);
    }
  };

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = tweetData => {
    const avatarImgSource = escape(tweetData.user.avatars);
    const avatarName = escape(tweetData.user.name);
    const avatarHandle = escape(tweetData.user.handle);
    const tweetText = escape(tweetData.content.text);
    const tweetTime = moment(escape(tweetData.created_at)).fromNow();

    const tweetHTML = `
    <article class="tweet">
      <header class="header">
        <div class="avatar-sm justify-end">
          <img src="${avatarImgSource}" />
        </div>
        <div class="avatar-name">
          <h4>${avatarName}</h4>
        </div>
        <div class="avatar-handle justify-end">
          <p>${avatarHandle}</p>
        </div>
      </header>
      <div class="body">
        <p class="tweet-text">${tweetText}</p>
      </div>
      <footer class="footer">
        <div class="tweet-timeposted">
          <p>${tweetTime}</p>
        </div>
        <div class="tweet-social justify-end">
          <a class="tweet-share" href="share">
            <i class="material-icons">share</i>
          </a>
          <a class="tweet-repost" href="repost">
            <i class="material-icons">repeat</i>
          </a>
          <a class="tweet-like" href="like">
            <i class="material-icons">favorite</i>
          </a>
          </div>
      </footer>
    </article>
    `;

    return tweetHTML;
  };

  const loadTweets = function() {
    $.ajax("tweets", { method: "GET" }).then(function(tweetsJSON) {
      console.log("Success: ", tweetsJSON);
      renderTweets(tweetsJSON);
    });
  };
  loadTweets();

  $("#new-tweet-form").submit(function(event) {
    event.preventDefault();
    const $this = $(this);
    const $tweetStatus = $this.next();
    if ($this.children("textarea").val().length < 0) {
      $tweetStatus.text("Nothing In Tweet!");
      $tweetStatus.fadeIn();
      $tweetStatus.fadeOut(1000);
    } else if ($this.children("textarea").val().length > 140) {
      $tweetStatus.text("Tweet Overload!");
      $tweetStatus.fadeIn();
      $tweetStatus.fadeOut(1000);
    } else {
      $.post("tweets", $this.serialize()).then(function() {
        $tweetStatus.text("Tweet Sent!");
        $tweetStatus.fadeIn();
        $tweetStatus.fadeOut(10000);
        $this.children("textarea").val("");
        $.get("tweets").then(value => {
          prependTweet(value[value.length - 1]);
        });
      });
    }
  });
});
