/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(() => {
  // https://stackoverflow.com/a/3177838/6024104
  const timeSince = date => {
    let seconds = Math.floor((new Date() - date) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  };

  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac"
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants"
      },
      created_at: 1461116232227
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd"
      },
      content: {
        text: "Je pense , donc je suis"
      },
      created_at: 1461113959088
    }
  ];

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").append($tweet);
    }
  };

  const createTweetElement = tweetData => {
    const tweetHTML = `
    <article class="tweet">
      <header class="header">
        <div class="avatar-sm justify-end">
          <img src="${tweetData.user.avatars}" />
        </div>
        <div class="avatar-name">
          <h4>${tweetData.user.name}</h4>
        </div>
        <div class="avatar-handle justify-end">
          <p>${tweetData.user.handle}</p>
        </div>
      </header>
      <div class="body">
        <p class="tweet-text">
          ${tweetData.content.text}
        </p>
      </div>
      <footer class="footer">
        <div class="tweet-timeposted">
          <p>${moment(tweetData.created_at).fromNow()}</p>
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

  renderTweets(data);
});
