function setHeaderOnScroll(prevScrollpos) {
  var currentScrollPos = window.pageYOffset;
  var header_pos = '80' - window.pageYOffset;
  
  if (prevScrollpos > currentScrollPos) {
  if (!$('body').hasClass('no-header-links')) {
  document.getElementById("header").style.top = "0";
  }
  
  if ($(window).width() < 1024 && $('.anchor-tab-links.fix-tab-links').length > 0) {
  document.getElementById("header").style.top = "-107px";
  }
  
  if ($("body").hasClass("smartbanner-app") && (window.pageYOffset < 80)) {
  // Showing header on scroll down according to the position of app-promotion banner.
  document.getElementById("header").style.top = header_pos + "px";
  }
  }
  else {
  if ($("body").hasClass("smartbanner-app")) {
  if (window.pageYOffset > 130) {
  document.getElementById("header").style.top = "-65px";
  } else {
  // Hiding header on scroll down according to the position of app-promotion banner.
  document.getElementById("header").style.top = header_pos + "px";
  }
  }
  else {
  if (!$('body').hasClass('no-header-links')) {
  if (window.pageYOffset > 106 && $(window).width() > 767) {
  document.getElementById("header").style.top = "-107px";
  }
  if(window.pageYOffset > 55 && $(window).width() < 768) {
  document.getElementById("header").style.top = "-63px";
  }
  }
  }
  }
  return currentScrollPos;
  }
  
  var prevScrollpos = window.pageYOffset;
  
  $(window).on('scroll', function () {
  // Add scroll effect to desktop if class present;
  if($(window).width() > 767 && $('body').hasClass('desktop-with-header-scroll')) {
  var currentScrollPos = setHeaderOnScroll(prevScrollpos);
  prevScrollpos = currentScrollPos;
  }
  
  // Add scroll effect to mobile
  if ($(window).width() < 768 && !($('body').hasClass('mobile-with-no-header-scroll'))) {
  var currentScrollPos = setHeaderOnScroll(prevScrollpos);
  prevScrollpos = currentScrollPos;
  }
  });
  
  var site = window.location.origin;
  var externalCss = site + '/themes/custom/mp_theme/css/layout.css';
  
  fetch(site).then(function (response) {
  // The API call was successful!
  return response.text();
  }).then(function (html) {
  // Convert the HTML string into a document object
  var parser = new DOMParser();
  var doc = parser.parseFromString(html, 'text/html');
  
  // Get the header
  var docHeader = doc.querySelector('.menu-contents').innerHTML;
  document.getElementsByClassName('menu-contents')[0].innerHTML = docHeader;
  
  var docFooter = doc.querySelector('.footer-wrapper').innerHTML;
  document.getElementsByClassName('footer-wrapper')[0].innerHTML = docFooter;
  
  $('.mobile-browse-header h2').replaceWith(function () {
  return "<h4>" + $(this).html() + "</h4>";
  });
  
  $('head').append('<link rel="stylesheet" type="text/css" href="'+ externalCss +'">');
  
  if ($(window).width() >= 1024) {
  
  $(".block-searchforjobs .browse-by-links ul li").css({'float':'none', 'width':'auto' });
  $(".header-wrapper #header-region .header-links div .job-search-icon").css({'padding':'20px'});
  $(".menu--main .primary-menu-level-0").on({
  mouseenter: function () {
  $(this).children('div.accordion-content').addClass('open').css("display", "block");
  },
  mouseleave: function () {
  $(this).children('div.accordion-content').removeClass('open').css("display", "none");
  }
  });
  }
  // Mobile menu close functionality
  function closeMenu() {
  $('html').removeClass('menu-open');
  $('.overlay').hide();
  
  var leftvalue = '-=480px';
  $('#navigation-wrapper').animate({left: leftvalue}, 'fast');
  
  $('body').css('overflow', 'inherit');
  $('#page-wrapper').css('position', 'inherit');
  
  // Code for resetting opened menu links on close of menu.
  var $activeMenuBox = $('.main-menu a.active-sub');
  
  $activeMenuBox.siblings('span.active-icon').click();
  }
  
  // Accordion open and close for responsive menu
  function close_accordion_section(icon_link, menu_box, parent_div) {
  $(icon_link).removeClass('active-icon');
  $(menu_box).css("display", "none");
  $(parent_div).removeClass("open");
  $(parent_div + " a, span").removeClass("active-sub");
  }
  
  if ($(window).width() < 1024) {
  $('.mobile-menu').click(function () {
  // If menu already opened and clicked the hamburger icon
  // close the menu items.
  if ($('html').hasClass('menu-open')) {
  $('.overlay').hide();
  closeMenu();
  return false;
  }
  
  $('html').addClass('menu-open');
  $('#navigation-wrapper').animate({left: '0'}, "fast");
  $('.overlay').show();
  $("body").css('overflow', 'hidden');
  });
  }
  
  // Show second level mobile menu.
  $(".show-second-level").click(function (e) {
  var $this = $(this);
  
  if ($(e.target).is('.active-icon')) {
  close_accordion_section(".show-second-level", ".accordion-content", ".primary-menu-level-0");
  close_accordion_section(".show-third-level", ".accordion-content-1", ".primary-menu-level-1");
  }
  else {
  close_accordion_section(".show-second-level", ".accordion-content", ".primary-menu-level-0");
  $this.addClass("active-icon");
  $this.prev().addClass("active-sub");
  $this.parent().addClass("open");
  // Open up the hidden content panel
  $this.parent().siblings().toggle().addClass('accordion-content');
  e.preventDefault();
  }
  });
  
  $(".show-third-level").click(function (e) {
  var $this = $(this);
  
  if ($(e.target).is('.active-icon')) {
  close_accordion_section(".show-third-level", ".accordion-content-1", ".primary-menu-level-1");
  }
  else {
  close_accordion_section(".show-third-level", ".accordion-content-1", ".primary-menu-level-1");
  $this.addClass("active-icon");
  $this.prev().addClass("active-sub");
  $this.parent().siblings().toggle().addClass('accordion-content-1');
  }
  });
  
  // Close menu on click.
  $('.overlay').on("click", function () {
  $(this).hide();
  closeMenu();
  });
  
  // Accordion open and close for footer menu.
  if ($(window).width() < 1024) {
  socialIcons();
  $('.footer-links-wrapper .footer-column .block .block-contents').hide();
  $('.footer-column').find('h4').click(function (e) {
  e.preventDefault();
  var $this = $(this);
  
  $('.footer-column h4').not(this).removeClass('down');
  $this.toggleClass("down");
  //Expand or collapse this panel
  $this.parent().find(".block-contents").slideToggle('fast');
  $this.parent().find(".text__body").slideToggle('fast');
  $this.parent().find(".menu-contents").slideToggle('fast');
  //Hide the other panels
  $('.footer-column .block-contents, .footer-column .text__body, .footer-column .menu-contents')
  .not($this.parent().find(".block-contents, .text__body, .menu-contents"))
  .slideUp('fast');
  });
  }
  
  function socialIcons() {
  var $socialLinks = $('.block-footersocialmediablock');
  if ($(window).width() < 1024) {
  if ($('.mobile-social-icons').length <= 1) {
  $socialLinks.hide();
  if ($socialLinks.html() != undefined) {
  $('#footer').prepend("<div class='mobile-social-icons'>" + $socialLinks.html() + "</div>");
  }
  }
  else {
  $('.mobile-social-icons').show();
  }
  }
  else {
  $('.mobile-social-icons').hide();
  $socialLinks.show();
  $('.social-media-links', $socialLinks).show();
  }
  }
  
  }).catch(function (err) {
  // There was an error
  console.warn('Something went wrong.', err);
  });
