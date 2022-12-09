/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */




$(document).ready(function () {
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Function to create a single tweet
  const createTweetElement = function (tweetData) {
    
    const $tweet = $(`
    <article class="tweet">
    <header>
      <div>
        <img src="${tweetData.user.avatars}" alt="avatar">
        <p>${tweetData.user.name}</p>
      </div>
      <p>${tweetData.user.handle}</p>
    </header>
    <p>${escape(tweetData.content.text)}</p>
  <hr/>
    <footer>
      <p>${timeago.format(tweetData.created_at)}</p>
      <div>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>
    `);

    return $tweet;
  }


  // Function to display list of tweets
  const renderTweets = function (tweets) {

    $('#tweets-container').empty();

    for (const item of tweets) {
      const $tweet = createTweetElement(item);
      $('#tweets-container').prepend($tweet);

    }

  }


  // Function to get tweet data with GET request
  const loadTweets = function() {
    $.get("/tweets/", function(data) {
      renderTweets(data);
    });

  }
  loadTweets();


  // Tweet Submit Event
  $(".tweet-form").on("submit", function(event) {
    event.preventDefault();
    const dataForm = $( this ).serialize() 

    if (dataForm.length === 5) {
      $("#blank-error").text("Tweet cannot be empty");
      $("#blank-error").slideDown("slow");
      $("#blank-error").delay(4000).slideUp("slow");
    }

    if (dataForm.length > 145) {
      $("#count-error").text("Tweet cannot exceed 140 character limit");
      $("#count-error").slideDown("slow");
      $("#count-error").delay(4000).slideUp("slow");

    } else {

      $.ajax({
        type: "POST",
        url: "/tweets/",
        data: dataForm,
        success: () => {
          loadTweets();
          $("#tweet-text").val("");
          $(".counter").val("140");
        }
      });
          

    }


  });

});

