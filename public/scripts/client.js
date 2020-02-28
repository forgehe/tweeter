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
    tweets.forEach(tweet => {
      prependTweet(tweet);
    });
  };

  // used to escape dangerous characters before inserting it into HTML
  const escape = function(str) {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = tweetData => {
    const avatarImgSource = tweetData.user.avatars;
    const avatarName = tweetData.user.name;
    const avatarHandle = tweetData.user.handle;
    const tweetText = escape(tweetData.content.text);
    const tweetTime = moment(tweetData.created_at).fromNow();

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
      renderTweets(tweetsJSON);
    });
  };
  loadTweets();

  const submitTweetMsg = (jObj, msgString, duration, boolErr) => {
    if (!jObj.is(":visible")) {
      jObj
        .text(msgString)
        .addClass(boolErr ? "invalidText" : "")
        .slideDown();
      setTimeout(() => {
        jObj.slideUp().removeClass(boolErr ? "invalidText" : "");
      }, duration);
    }
  };

  // Listens to submissions from new-tweet-form and posts the tweets to the server,
  // giving a response in the html
  $("#new-tweet-form").submit(function(event) {
    event.preventDefault();
    const $this = $(this);
    const $tweetStatus = $this.children("div").children(".tweet-status");
    if ($this.children("textarea").val().length <= 0) {
      submitTweetMsg($tweetStatus, "Nothing In Tweet Message!", 3000, true);
    } else if ($this.children("textarea").val().length > 140) {
      submitTweetMsg($tweetStatus, "Tweet Overload! Keep the message under 140!", 3000, true);
    } else {
      $.post("tweets", $this.serialize()).then(function() {
        submitTweetMsg($tweetStatus, "Tweet Sent!", 3000);
        $this.children("textarea").val("");
        $this
          .children("div")
          .children(".counter")
          .text("140");
        $.get("tweets").then(value => {
          prependTweet(value[value.length - 1]);
        });
      });
    }
  });

  // Toggle shows button to write a tweet
  $(".toggle-write-tweet").click(() => {
    $(".new-tweet").slideToggle();
    $(".new-tweet textarea").focus();
  });

  // To Top Button
  const scrollTopBtn = $("#btn-scroll-top");
  $(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
      scrollTopBtn.fadeIn(200);
    } else {
      scrollTopBtn.fadeOut(200);
    }
  });
  scrollTopBtn.click(function(event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "300");
  });
});
