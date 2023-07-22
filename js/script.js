
// Controller events in navbar-burger
$('.navbar-burger').on('click', () => {
    $('.navbar-burger').toggleClass('is-active');
    $('body').toggleClass('bodyScrollLock');
    $('.navbar-menu').toggleClass('show-menu');
    $('.img-hero').toggleClass('img-hero-back');
});

// Load hero animations
var imgHero = $('.img-hero');

if (imgHero.prop('complete')) {
    loadHeader();
} else {
    imgHero.on('load', function () {
        loadHeader();
    });
}

function loadHeader() {
    $('.brand').animate({
        left: '+=100px',
        opacity: 1
    }, 1000);

    imgHero.delay(200).animate({
        left: '+=100px',
        opacity: 1
    }, 1000, function () {
        $(this).css('transition', 'all .3s ease-in');
        $(this).hover(
            function () {
                $(this).css({
                    transform: 'translateX(20px)',
                });
            },
            function () {
                $(this).css({
                    transform: '',
                });
            }
        );
    });

    $('.navbar-item').each(function (index, element) {
        $(this).delay(index * 200).animate({
            left: '-=100px',
            opacity: 1
        }, 1000, function () {
            $(this).css('transition', 'all .2s ease-in');
        })
    });

    $('.container-hero-text').children().delay(150).each(function (index, element) {
        $(this).delay(index * 100).animate({
            top: '-=100px',
            opacity: 1
        }, 1000);
    });

    for (let i = 0; i < 9; i++) {
        $('<div class="hex"></div>').appendTo('.contaner-anim-hero');
    }

    $('main').css({ 'display': 'block' });
}

//Intersection observer
let options = {
    root: null,
    rootMargin: "0px 0px -400px 0px",
    threshold: 0
};

let observer = new IntersectionObserver(animSection, options);
document.querySelectorAll('section').forEach(element => {
    observer.observe(element);
});

function animSection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let elemetsAnim;
            if ($(entry.target).hasClass('about')) {
                elemetsAnim = '.about .title-section, .container-section-text p';
            } else if ($(entry.target).hasClass('portfolio')) {
                elemetsAnim = '.portfolio .title-section, .cotainer-thumbnails .c-thumbnail';
            }
            $(elemetsAnim).each(function (index, element) {
                $(this).delay(index * 100).animate({
                    top: '-=100px',
                    opacity: 1
                }, 800);
                observer.unobserve(entry.target);
            });
        }
    });
}

let optionsTwo = {
    root: null,
    rootMargin: "0px 0px -400px 0px",
    threshold: 0
};

let observerACS = new IntersectionObserver(animCurrentSection, options);
document.querySelectorAll('section, header').forEach(element => {
    observerACS.observe(element);
});

let currentSection = $('.current-section');
let xCurrentItem = 0;
let widthItem = 0;
let newSize = 61.39;
let animating = false;
let animationQueue = [];
let widthCS = currentSection.width();
function animCurrentSection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if ($(entry.target).hasClass('about')) {
                xCurrentItem = $($('.navbar-menu').children()[1]).position().left;
                widthItem = $($('.navbar-menu').children()[1]).width() + 20;
                animationQueue.push({xCurrentItem, widthItem});
                // executeAnim();
            } else if ($(entry.target).hasClass('portfolio')) {
                xCurrentItem = $($('.navbar-menu').children()[2]).position().left;
                widthItem = $($('.navbar-menu').children()[2]).width() + 20;
                animationQueue.push({xCurrentItem, widthItem});
                // executeAnim();
            } else if ($(entry.target).hasClass('knowledge')) {
                xCurrentItem = $($('.navbar-menu').children()[3]).position().left;
                widthItem = $($('.navbar-menu').children()[3]).width() + 20;
                animationQueue.push({xCurrentItem, widthItem});
                // executeAnim();
            } else if ($(entry.target).hasClass('contact')) {
                xCurrentItem = $($('.navbar-menu').children()[4]).position().left;
                widthItem = $($('.navbar-menu').children()[4]).width() + 20;
                animationQueue.push({xCurrentItem, widthItem});
                // executeAnim();
            }
        }
        function executeAnim(xCurrentItem, widthItem){
            if(currentSection.position().left < xCurrentItem){
                newSize = (xCurrentItem + widthItem) - currentSection.position().left;
                currentSection.animate({
                    width: `${newSize}`,
                },200);
                currentSection.animate({
                    left: `${xCurrentItem}`,
                    width: `${widthItem}`
                },200, function(){
                    animationQueue.shift();
                    animating = false;
                });
            }
        }

        setInterval(function() {
            if (animationQueue.length > 0 && !animating){
                animating = true;
                executeAnim(animationQueue[0].xCurrentItem, animationQueue[0].widthItem);
            }
        });
    });
}



$('.c-thumbnail').on('click', function () {
    $('body').toggleClass('bodyScrollLock');
    let modalFragment = document.createDocumentFragment();
    let portFolio = document.createElement('div');
    portFolio.classList.add('modal-portfolio');
    portFolio.innerHTML =
        `
    <div class="container-project">
        <div class="equis"><span class="line"></span><span class="line"></span></div>
        <h3></h3>
        <div class="container-video">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/Kow2YegIdYU" title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>
            <a target="_blank"><svg xmlns="http://www.w3.org/2000/svg" height="2em"
                viewBox="0 0 496 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path
                d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
            </svg>Enlace a GitHub</a>
        </div>
        <div class="container-info">
            <h4>Descripción</h4>
            <p class="description"></p>
            <br>
            <h4>Tecnologías</h4>
            <p class="technologies"></p>
        </div>
    </div>  
    `
    modalFragment.appendChild(portFolio)
    document.body.appendChild(modalFragment);
    if ($(this).hasClass('thum-eduetica')) {
        $('.container-project h3').text('Página Web Educativa');
        $('.description').text(`
        Este proyecto es una web educativa que enseña sobre la ética profesional. 
        La web tiene dos tipos de usuarios: profesor y alumno. El alumno tiene que 
        pasar los módulos y completar las diferentes pruebas que le sumarán puntos. 
        El profesor tiene la capacidad de ver el progreso de todos sus alumnos, el 
        puntaje que llevan y la cantidad de módulos que han completado. El objetivo 
        de este proyecto es ofrecer una plataforma interactiva y dinámica para 
        aprender sobre la ética profesional de forma divertida y eficaz.
        `);
        let technologies = document.querySelector('.technologies');
        technologies.innerHTML = `
        • <strong>NodeJS</strong>: Entorno de ejecución para JavaScript que permite crear aplicaciones 
        web del lado del servidor.<br>
        • <strong>Express</strong>: Framework para Node.js que facilita la creación de servidores web 
        y el manejo de rutas, peticiones y respuestas.<br>
        • <strong>JQuery</strong>: Biblioteca multiplataforma de JavaScript que simplifica la 
        interacción con documentos HTML, manipulación del árbol DOM, manejo de eventos, desarrollo de 
        animaciones y agregado de interacción con AJAX a páginas web.<br>
        • <strong>MySQL</strong>: Sistema de gestión de bases de datos relacionales que almacena y 
        organiza la información de la web.<br>
        • <strong>BulmaCSS</strong>: framework CSS que provee componentes y estilos para crear interfaces web 
        responsivas y modernas.
        `;
        $('.container-video a').attr('href', 'https://github.com/DouglasMontoya/web-educativa');
    } else if ($(this).hasClass('thum-visits')) {
        $('.container-project h3').text('Sistema de Control de Visitas y Reporte');
        let description = document.querySelector('.description')
        description.innerHTML = `
        Este sistema permite llevar un seguimiento de las personas que entran y realizan sus 
        trámites en la institución. Toda esta información es almacenada para poder ser 
        consultada en cualquier momento por cualquiera de los departamentos.<br><br>
        <strong>El sistema funciona de la siguiente manera:</strong><br><br>
        <strong>1.</strong> El visitante llega a la institución y se dirige a la recepción.<br>
        <strong>2.</strong> El recepcionista verifica si el visitante está registrado en el sistema. Si no lo está, 
        lo registra.<br>
        <strong>3.</strong> El visitante puede entonces agendar una cita en el departamento deseado.<br>
        <strong>4.</strong> El visitante se dirige al departamento y el empleado lo atiende y realiza el trámite.<br>
        <strong>5.</strong> El empleado guarda toda la información sobre el trámite que realizó el visitante en la 
        base de datos.<br>
        <strong>6.</strong> Cualquier departamento puede consultar esta información y generar reportes para ser 
        utilizados como más lo necesiten.<br><br>
        <strong>Este sistema proporciona una serie de beneficios, entre ellos:</strong><br><br>

        • Mejora la seguridad de la institución al controlar quién entra y sale.<br>
        • Facilita el seguimiento de los trámites que realizan los visitantes.<br>
        • Proporciona información útil para los departamentos que necesitan conocer el número 
        de visitantes, el tipo de trámites que realizan y a que hora fueron atendidos.<br>
        • Genera reportes que pueden utilizarse para mejorar la eficiencia y la eficacia de 
        los procesos.
        `
        let technologies = document.querySelector('.technologies');
        technologies.innerHTML = `
        • <strong>Python</strong>: Es un lenguaje de programación general que se puede utilizar 
        para una amplia gama de tareas, incluyendo desarrollo web, ciencia de datos, aprendizaje 
        automático y automatización.<br>
        • <strong>Tkinter</strong>: Tkinter es un kit de herramientas de interfaz gráfica de 
        usuario (GUI) estándar para Python.<br>
        • <strong>MySQL</strong>: Sistema de gestión de bases de datos relacionales que almacena y 
        organiza la información de la web.<br>
        `;
        $('.container-video a').remove();
    } else if ($(this).hasClass('thum-game')) {
        $('.container-project h3').text('Juego de Plataforma 2D');
        let description = document.querySelector('.description')
        description.innerHTML = `
        Este juego fue creado como un proyecto personal para aprender más sobre la física y la 
        mecánica de los juegos 2D. Mi objetivo era mejorar mis habilidades en estas áreas y 
        compartir mi trabajo con los demás.<br>
        El juego está hecho al 100% por mí, desde los gráficos hasta la programación. Trata 
        sobre un personaje que explora un bosque subiendo por plataformas. Uno de los mayores 
        retos fue crear la animación que se ejecuta cuando se pulsan las teclas derecha o 
        izquierda en donde la cámara del juego se mueve tomando en cuenta la dirección en la 
        que se mueve el personaje para que el personaje no quede siempre en el centro de la 
        pantalla y tenga un mayor campo de visión.
        `
        let technologies = document.querySelector('.technologies');
        technologies.innerHTML = `
        • <strong>Python</strong>: Es un lenguaje de programación general que se puede utilizar 
        para una amplia gama de tareas, incluyendo desarrollo web, ciencia de datos, aprendizaje 
        automático y automatización.<br>
        • <strong>Pygame</strong>: Pygame es una biblioteca de Python para hacer videojuegos y 
        otras aplicaciones multimedia. Tiene muchas funciones para gráficos, sonido, entrada y 
        más.<br>
        `;
        $('.container-video a').attr('href', 'https://github.com/DouglasMontoya/plataform-game-2d');
    }

    $('.equis, .modal-portfolio').on('click', (event) => {
        if (event.target === event.currentTarget || $(event.target).hasClass('equis') || $(event.target).hasClass('line')) {
            $('body').toggleClass('bodyScrollLock');
            $('.modal-portfolio').remove();
        }
    });

});


