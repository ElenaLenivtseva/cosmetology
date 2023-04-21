function takeAllImages(...images) {
    let all = [];
    for (let i = 0; i < images.length; i++) {  
        all.push(images[i]);
    }
    return all;
}
function drawPreview(all, prev) {
    let slider__preview = document.querySelector(prev);
    let widthItem = slider__preview.offsetWidth/all.length*3;
    for (let i = 0; i < all.length; i++) {
        let sliderPrevItem = document.createElement('div');
        sliderPrevItem.style.width = widthItem + 'px';
        sliderPrevItem.classList.add('header__slider-item');
        slider__preview.appendChild(sliderPrevItem);
    }
    let slider__prevItems = document.querySelectorAll('.header__slider-item');
    return slider__prevItems;
}

// // добавить проверку на наличие элемента и на наличие у него такого класса
function removeClass(classic, elementic) {
    let elements = document.querySelectorAll(elementic);
    console.log(elements);
    if (elements) {
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove(classic);
            // нормально работает и без такой проверки, но лишним не будет
            // if (elements[i].classList.contains(classic)) {
            //     elements[i].classList.remove(classic);
            // }    
        }
    }
}

// Вешаем на прикосновение функцию handleTouchStart


function followEvent (header__imgWrap, buttonPrev, buttonNext, mainimg, prev) {
    if (all) {
        let header__img_wrap = document.querySelector(header__imgWrap);
        let button__prev = document.querySelector(buttonPrev);
        let button__next = document.querySelector(buttonNext);
        let mainImg = document.querySelector(mainimg);
        let step = 0;
        mainImg.src = all[step];
        let slider__prevItems = drawPreview(all, prev);
        
        slider__prevItems[step].classList.add('header__item-active');

        let xDown = null;                                                        
        let yDown = null;                                                        

        function handleTouchStart(evt) {                                         
            xDown = evt.touches[0].clientX;                                      
            yDown = evt.touches[0].clientY;                                      
        };                                                

        function handleTouchMove(evt) {
            if ( ! xDown || ! yDown ) {
                return;
            }

            let xUp = evt.touches[0].clientX;                                    
            let yUp = evt.touches[0].clientY;

            let xDiff = xDown - xUp;
            let yDiff = yDown - yUp;
            // немного поясню здесь. Тут берутся модули движения по оси абсцисс и ординат (почему модули? потому что если движение сделано влево или вниз, то его показатель будет отрицательным) и сравнивается, чего было больше: движения по абсциссам или ординатам. Нужно это для того, чтобы, если пользователь провел вправо, но немного наискосок вниз, сработал именно коллбэк для движения вправо, а ни как-то иначе.
            if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
                if ( xDiff > 0 ) {
                    console.log('left');
                    removeClass('header__item-active', '.header__slider-item');
                    if (step != all.length-1) {
                        step++;
                    } else {
                        step = 0;
                    }
                    mainImg.src = all[step];
                    slider__prevItems[step].classList.add('header__item-active');
                    /* left swipe */ 
                } else {
                    console.log('right');
                    removeClass('header__item-active', '.header__slider-item');
                    if (step != 0) {               
                        step--;
                    } else {
                        step = all.length-1;
                    }
                    mainImg.src = all[step];
                    slider__prevItems[step].classList.add('header__item-active');
                    /* right swipe */
                }                       
            } else { // Это вам, в общем-то, не надо, вы ведь только влево-вправо собираетесь двигать
                if ( yDiff > 0 ) {
                    /* up swipe */ 
                } else { 
                    /* down swipe */
                }                                                                 
            }
            /* reset values */
            xDown = null;
            yDown = null;                                             
        };

        header__img_wrap.addEventListener('touchstart', handleTouchStart, false);  
        // А на движение пальцем по экрану - handleTouchMove      
        header__img_wrap.addEventListener('touchmove', handleTouchMove, false);


        button__prev.addEventListener('click', function () {
            removeClass('header__item-active', '.header__slider-item');
            if (step != 0) {               
                step--;
            } else {
                step = all.length-1;
            }
            mainImg.src = all[step];
            slider__prevItems[step].classList.add('header__item-active');
        })

        button__next.addEventListener('click', function () {
            removeClass('header__item-active', '.header__slider-item');
            if (step != all.length-1) {
                step++;
            } else {
                step = 0;
            }
            mainImg.src = all[step];
            slider__prevItems[step].classList.add('header__item-active');
        })

        // mainImg.addEventListener('touchstart', handleTouchStart, false);
        // mainImg.addEventListener('touchstart', handleTouchMove, false);

        // for (let i = 0; i < slider__prevItems.length; i++) {
        //     slider__prevItems[i].addEventListener('click', function () {
        //         removeClass('header__item-active', '.header__slider-item');
        //         mainImg.src = all[i];
        //         slider__prevItems[i].classList.add('header__item-active');
        //     })   
        // }
    }
}

// function followEvent (buttonPrev, buttonNext, mainimg, prev) {
//     if (all) {
//         // ИНИЦИАЛИЗАЦИЯ
//         // 1 - забери нужные элементы
//         let button__prev = document.querySelector(buttonPrev);
//         let button__next = document.querySelector(buttonNext);
//         let mainImg = document.querySelector(mainimg);
//         // 2 - поставь слайдер на начало
//         let step = 0;
//         mainImg.src = all[step];
//         // 3 - отрисуй превью
//         let slider__prevItems = drawPreview(all, prev);

//         // события кнопок
//         button__prev.addEventListener('click', function() {
//             removeClass('slider__prev-active', '.slider__prev-img');
//             if (step != 0) {               
//                 step--;
//             } else {
//                 step = all.length-1;
//             }
//             mainImg.src = all[step];
//             slider__prevItems[step].classList.add('header__item-active');
//         })
//         button__next.addEventListener('click', function() {
//             removeClass('slider__prev-active', '.slider__prev-img');
//             if (step != all.length-1) {
//                 step++;
//             } else {
//                 step = 0;
//             }
//             mainImg.src = all[step];
//             slider__prevItems[step].classList.add('header__item-active');
//         })
//     }
// }

// хотела придумать так: followEvent еще забирает src, а потом это становится параметром takeallImages. Было бы лучше. Но как-то не получается( Могла бы оставить all прямо внутри followEvent(), но тогда было бы просто сложнее параметры менять. А так сначала вызываешь takeAllImages(), потом уже followEvent(). На всякий случай добавила там проверку, есть ли all.

// let all = takeAllImages('images/slider/slider__img-item1.png', 'images/slider/slider__main2.png', 'images/slider/slider__main3.png', 'images/slider/slider__main4.png');
// Важно: картинки не должны быть слишком тяжелыми
// let all = takeAllImages('images/slider/slider__img-item1.png', 'images/slider/slider__img-item2.png', 'images/slider/slider__img-item3.png', 'images/slider/slider__img-item4.png');
let all = takeAllImages('/images/header/sale4.jpg', '/images/header/sale5.jpg', '/images/header/sale6.jpg');
console.log(all);
followEvent ('.header__img-wrap', '.header__slider-arrow-left', '.header__slider-arrow-right', '.header__img', '.header__slider-thumbs');
// followEvent('.header__slider-arrow-left', 'header__slider-arrow-right', 'header__img', 'header__slider-thumbs');

// нужна логика клика на thumb
// взять все
// отследить клик
// дальше хз, типо номер потомка? и какой номер, такое и фото? или сравнивать 2 массива типо
// и свайп еще ооох
// и вычисление размера thumbs




