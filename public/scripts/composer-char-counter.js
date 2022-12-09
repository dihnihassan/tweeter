
$(document).ready(function() {
  $("#tweet-text").on('input', function () {
    const countNumber = 140;
    let newCount = countNumber - $(this).val().length;
    let tweetCount = $(this).parent().children('.tweet-footer').children('.counter');

     tweetCount.val(newCount); 

    if (newCount < 0) {
      tweetCount.addClass("tweet-error");
    } else {
      tweetCount.removeClass("tweet-error");
    }

  });
});
