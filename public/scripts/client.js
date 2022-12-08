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

  const createTweetElement = function (tweetData) {
    // console.log("Inside createtweetelement", tweetData);
    // const safeTweet = $("<p>").text(tweetData.content.text);
    
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

  const renderTweets = function (tweets) {
    // console.log("This is for tweets", tweets);

    $('#tweets-container').empty();

    for (const item of tweets) {
      // console.log("This is for items", item);
      const $tweet = createTweetElement(item);
      $('#tweets-container').prepend($tweet);

    }

    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  }

  // renderTweets(data);

  const loadTweets = function() {
    $.get("/tweets/", function(data) {
      // console.log("THIS IS DATA", data);
      renderTweets(data);
    });

  }
  loadTweets();

  // console.log($tweet); 


  // const tweetSubmit = document.getElementsByClassName("tweet-footer");

  $(".tweet-form").on("submit", function(event) {
    event.preventDefault();
    // console.log("Hello from jQuery!");
    const dataForm = $( this ).serialize() 
    console.log("This is dataform", dataForm);

    if (dataForm.length === 5) {
      $("#blank-error").text("Tweet Area Cannot be empty");
      $("#blank-error").slideDown("slow");
      $("#blank-error").delay(4000).slideUp("slow");
    }

    if (dataForm.length > 145) {
      $("#count-error").text("Tweet Exceeds 140 Character Limit");
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

    // const newTweet = document.getElementById("tweet-text");


  });

});

// if tweet count too long 
// if tweet area empty
  // do not submit form