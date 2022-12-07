/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227

};

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


$(document).ready(function () {
  const createTweetElement = function (tweetData) {
    // console.log("Inside createtweetelement", tweetData);

    const $tweet = $(`
    <article class="tweet">
    <header>
      <div>
        <img src="${tweetData.user.avatars}" alt="avatar">
        <p>${tweetData.user.name}</p>
      </div>
      <p>${tweetData.user.handle}</p>
    </header>
    <p>${tweetData.content.text}</p>
  <hr/>
    <footer>
      <p>${tweetData.created_at}</p>
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
    for (const item of tweets) {
      // console.log("This is for items", item);
      const $tweet = createTweetElement(item);
      $('#tweets-container').append($tweet);

    }

    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  }

  // renderTweets(data);

  const loadTweets = function() {
    $.get("/tweets/", function(data) {
      console.log("THIS IS DATA", data);
      renderTweets(data);
    });

  }
  loadTweets();

  // console.log($tweet); 


  // const tweetSubmit = document.getElementsByClassName("tweet-footer");

  $(".tweet-form").on("submit", function(event) {
    event.preventDefault();
    console.log("Hello from jQuery!");
    const dataForm = $( this ).serialize() 
    console.log(dataForm);

    // const newTweet = document.getElementById("tweet-text");
    $.ajax({
      type: "POST",
      url: "/tweets/",
      data: dataForm,
      success: () => {
        loadTweets();
      }
    });


  });

});

