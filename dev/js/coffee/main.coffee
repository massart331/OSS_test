###commodity main view###
$(".list-control__link").click ->
  $(".list-control__link").removeClass("list-control__link-active");
  $(this).addClass("list-control__link-active");
  type = $(this).data("type");
  switch
    when (type is "img")
      img = $(this).html();
      $(".show-item").html(img);
    when (type is "3d")
      iframe = $(this).children(".model").html();
      $(".show-item").html(iframe);
    when (type is "video")
      iframe = $(this).children(".model").html();
      $(".show-item").html(iframe);
      $(".show-item").children(".youtube")[0].src += "&autoplay=1";
  return false;

###generate star rating###
$(".start-input").each ->
  count = $(this).val();
  countFlo = Math.floor(count) - 1;
  countFix = parseFloat(count).toFixed(1);
  countSec = (countFix.split(".")[1])*10;
  txtForm = count.replace('.', ',');
  $(this).siblings(".val-star").text(txtForm);
  if (countSec != 0)
    countFlo++;
    $(this).next(".start").children(".start__wrap").eq(countFlo).children(".start__act").css("width",countSec+"%");
  while (countFlo != 0)
    countFlo--;
    $(this).next(".start").children(".start__wrap").eq(countFlo).children(".start__act").css("width","100%");

###normal slider 5 element###
$('.slider').slick
  dots: false
  infinite: true
  speed: 300
  slidesToShow: 5
  slidesToScroll: 5

###center slider 1 element###
$('.slider-center').slick
  dots: false
  infinite: false
  speed: 300
  centerMode: true
  centerPadding: '209px'

###normal slider 5.5 element###
$('.slider-center-big').slick
  dots: false
  infinite: false
  speed: 300
  slidesToShow: 5.5
  slidesToScroll: 1

###tub description###
saveItem = 0;
$('.tab-control__link').click ->
  $('.video .youtube').each ->
    src = $(this).attr('src');
    newSrc = src.replace('&autoplay=1', '');
    $(this).attr('src', newSrc);
  $(".video-list__link").show();
  $(".video").hide();
  $('.tab-control__link').removeClass("tab-control__link-active");
  $(this).addClass("tab-control__link-active");
  item = $(this).data("item");
  if (saveItem != item)
    $(".tab-show__item").removeClass("tab-show__item-show");
    $(".tab-show__item-"+item).addClass("tab-show__item-show");
  saveItem = item;
  return false

###show more link###
$('.show-more').click ->
  if $(this).hasClass("show-more-active")
    $(this).addClass('hide')
    $(this).prev('.show-more').removeClass('hide')
  else
    $(this).addClass('hide')
    $(this).next('.show-more').removeClass('hide')
  type = $(this).data("type");
  switch
    when (type is "table")
      $(".list-character").toggleClass("list-character__all");
    when (type is "description")
      $(".description").toggleClass("description-open");
    when (type is "comment")
      $(this).siblings(".list-c__txt").toggleClass("list-c__txt-show");
    when (type is "comment-block")
      $(this).siblings(".list-c").toggleClass("list-c-show");
  return false;

###tub in tab description###
saveTab = 0;
$('.show-comm__link-js').click ->
  $('.show-comm__link-js').removeClass("show-comm__link-active");
  $(this).addClass("show-comm__link-active");
  item = $(this).data("item");
  if (saveTab != item)
    $(".list-inf__item").hide();
    $(".list-inf__item-"+item).show();
  saveTab = item;
  return false

###tub slider list###
$('.show-comm__link-s-js').click ->
  $('.show-comm__link-s-js').removeClass("show-comm__link-active");
  $(this).addClass("show-comm__link-active");
  item = $(this).data("item");
  if (saveTab != item)
    $(".same-list__item").removeClass("same-list__item-show");
    $(".same-list__item-"+item).addClass("same-list__item-show");
  saveTab = item;
  return false

###start youtobe iframe###
$(".video-list__link").click ->
  $(this).hide();
  $(this).next('.video').show();
  $(this).next('.video').children(".youtube")[0].src += "&autoplay=1";
  return false