new Swiper('.products__slider', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    // pagination: {
    //     el: '.swiper-pagination',
    //     clickable: true,
    //     dynamicBullets: true
    // },
    slidesPerView: 1,
    spaceBetween: 0,
    breakpoints: {
        350: {
            spaceBetween: 40,
        },
        400: {
            spaceBetween: 30,
        },
        500: {
            spaceBetween: 70,
        },
        650: {
            slidesPerView: 1,
            spaceBetween: 70,
        },
        750: {
            slidesPerView: 2,
            spaceBetween: 130,
        },
        800: {
            slidesPerView: 2,
            spaceBetween: 117,
        },
        900: {
            slidesPerView: 3,
        },
        1100: {
            slidesPerView: 3,
            spaceBetween: 107,
        },
        1300: {
            slidesPerView: 3,
            spaceBetween: 95,
        },
        1600: {
            slidesPerView: 3,
            spaceBetween: 90,
        }
    },
});