
/*commodity main view */

(function() {
  var saveItem, saveTab;

  $(".list-control__link").click(function() {
    var iframe, img, type;
    $(".list-control__link").removeClass("list-control__link-active");
    $(this).addClass("list-control__link-active");
    type = $(this).data("type");
    switch (false) {
      case !(type === "img"):
        img = $(this).html();
        $(".show-item").html(img);
        break;
      case !(type === "3d"):
        iframe = $(this).children(".model").html();
        $(".show-item").html(iframe);
        break;
      case !(type === "video"):
        iframe = $(this).children(".model").html();
        $(".show-item").html(iframe);
        $(".show-item").children(".youtube")[0].src += "&autoplay=1";
    }
    return false;
  });


  /*generate star rating */

  $(".start-input").each(function() {
    var count, countFix, countFlo, countSec, results, txtForm;
    count = $(this).val();
    countFlo = Math.floor(count) - 1;
    countFix = parseFloat(count).toFixed(1);
    countSec = (countFix.split(".")[1]) * 10;
    txtForm = count.replace('.', ',');
    $(this).siblings(".val-star").text(txtForm);
    if (countSec !== 0) {
      countFlo++;
      $(this).next(".start").children(".start__wrap").eq(countFlo).children(".start__act").css("width", countSec + "%");
    }
    results = [];
    while (countFlo !== 0) {
      countFlo--;
      results.push($(this).next(".start").children(".start__wrap").eq(countFlo).children(".start__act").css("width", "100%"));
    }
    return results;
  });


  /*normal slider 5 element */

  $('.slider').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 5
  });


  /*center slider 1 element */

  $('.slider-center').slick({
    dots: false,
    infinite: false,
    speed: 300,
    centerMode: true,
    centerPadding: '209px'
  });


  /*normal slider 5.5 element */

  $('.slider-center-big').slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 5.5,
    slidesToScroll: 1
  });


  /*tub description */

  saveItem = 0;

  $('.tab-control__link').click(function() {
    var item;
    $('.video .youtube').each(function() {
      var newSrc, src;
      src = $(this).attr('src');
      newSrc = src.replace('&autoplay=1', '');
      return $(this).attr('src', newSrc);
    });
    $(".video-list__link").show();
    $(".video").hide();
    $('.tab-control__link').removeClass("tab-control__link-active");
    $(this).addClass("tab-control__link-active");
    item = $(this).data("item");
    if (saveItem !== item) {
      $(".tab-show__item").removeClass("tab-show__item-show");
      $(".tab-show__item-" + item).addClass("tab-show__item-show");
    }
    saveItem = item;
    return false;
  });


  /*show more link */

  $('.show-more').click(function() {
    var type;
    if ($(this).hasClass("show-more-active")) {
      $(this).addClass('hide');
      $(this).prev('.show-more').removeClass('hide');
    } else {
      $(this).addClass('hide');
      $(this).next('.show-more').removeClass('hide');
    }
    type = $(this).data("type");
    switch (false) {
      case !(type === "table"):
        $(".list-character").toggleClass("list-character__all");
        break;
      case !(type === "description"):
        $(".description").toggleClass("description-open");
        break;
      case !(type === "comment"):
        $(this).siblings(".list-c__txt").toggleClass("list-c__txt-show");
        break;
      case !(type === "comment-block"):
        $(this).siblings(".list-c").toggleClass("list-c-show");
    }
    return false;
  });


  /*tub in tab description */

  saveTab = 0;

  $('.show-comm__link-js').click(function() {
    var item;
    $('.show-comm__link-js').removeClass("show-comm__link-active");
    $(this).addClass("show-comm__link-active");
    item = $(this).data("item");
    if (saveTab !== item) {
      $(".list-inf__item").hide();
      $(".list-inf__item-" + item).show();
    }
    saveTab = item;
    return false;
  });


  /*tub slider list */

  $('.show-comm__link-s-js').click(function() {
    var item;
    $('.show-comm__link-s-js').removeClass("show-comm__link-active");
    $(this).addClass("show-comm__link-active");
    item = $(this).data("item");
    if (saveTab !== item) {
      $(".same-list__item").removeClass("same-list__item-show");
      $(".same-list__item-" + item).addClass("same-list__item-show");
    }
    saveTab = item;
    return false;
  });


  /*start youtobe iframe */

  $(".video-list__link").click(function() {
    $(this).hide();
    $(this).next('.video').show();
    $(this).next('.video').children(".youtube")[0].src += "&autoplay=1";
    return false;
  });

}).call(this);
