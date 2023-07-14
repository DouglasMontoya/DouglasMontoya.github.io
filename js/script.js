
$('.navbar-burger').on('click', () => {
    $('.navbar-burger').toggleClass('is-active');
    $('body').toggleClass('bodyScrollLock');
    $('.navbar-menu').toggleClass('show-menu');
});