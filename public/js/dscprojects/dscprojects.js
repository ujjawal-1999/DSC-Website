$(".card-toggle").on("click", function () {
  // Card toggle state
  $($($(this).parent()).parent())
    .find(".card-toggle")
    .removeClass("active");

  $(this).addClass("active");

  var isAnimating = false;

  if (!isAnimating) {
    isAnimating = true;

    console.log();
    console.log($(".card"));
    $($($(this).parent()).parent())
      .find(".card-content")
      .css("z-index", 0);

    $($($(this).parent()).parent())
      .find(".card")
      .removeClass("active");

    var that = $(this);

    $(this).siblings().css("z-index", 1);

    that
      .parent()
      .toggleClass("active")
      .find(".card-content")
      .on("transitionend", function () {
        isAnimating = false;
      });
  } else {
    return;
  }
});
