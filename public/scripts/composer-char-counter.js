// console.log("Is this working!");

$(document).ready(function() {
  $("#tweet-text").on('input', function () {
    const countNumber = 140;
    let newCount = countNumber - $(this).val().length;
    // $(this).parent().siblings('.tweet-footer').children('.counter').val(newCount);
    let tweetCount = $(this).parent().children('.tweet-footer').children('.counter');

     tweetCount.val(newCount); 

    if (newCount < 0) {
      tweetCount.addClass("tweet-error");
    } else {
      tweetCount.removeClass("tweet-error");
    }

  });
});
  // can add .text in here