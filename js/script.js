
// Controller events in navbar-burger
$('.navbar-burger').on('click', () => {
    $('.navbar-burger').toggleClass('is-active');
    $('body').toggleClass('bodyScrollLock');
    $('.navbar-menu').toggleClass('show-menu');
    $('.img-hero').toggleClass('img-hero-back');
});

$('.header').ready(() => {

    $('.brand').delay(200).animate({
        left: '+=100px',
        opacity: 1
    }, 1000);

    $('.img-hero').delay(400).animate({
        left: '+=100px',
        opacity: 1
    }, 1000, function() {
        $(this).css('transition', 'all .3s ease-in');
        $(this).hover(
            function() {
              $(this).css({
                transform: 'translateX(20px)',
              });
            },
            function() {
              $(this).css({
                transform: '',
              });
            }
          );
    });

    $('.navbar-item').delay(200).each(function(index, element){
        $(this).delay(index*200).animate({
            left: '-=100px',
            opacity: 1
        }, 1000, function(){
            $(this).css('transition', 'all .2s ease-in');
        })
    });

    $('.container-hero-text').children().delay(300).each(function(index, element){
        $(this).delay(index*100).animate({
            top: '-=100px',
            opacity: 1
        }, 1000);
    })
});