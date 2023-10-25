let images = [{
    url:"image/slider-1.png",
    name: "Rostov-on-Don admiral",
    city: "Rostov-on-Don LCD admiral",
    area: "81",
    time: "3.5 mounths"
},{
    url:"image/slider-2.png",
    name: "Sochi Thieves",
    city: "Sochi Thieves",
    area: "105",
    time: "4 mounths"
},{
    url: "image/slider-3.png",
    name: "Rostov-on-Don Patriotic",
    city: "Rostov-on-Don Patriotic",
    area: "93",
    time: "3 mounths"
}];


function initSlider(options) {
    if(!images || !images.length) return;
    options = options || {
        info: false,
        dots: true,
        autoplay: false
    };

    let block_slide = document.querySelector(".block_slide"); 
    let sliderArrows = document.querySelector(".arrow");
    let sliderDots = sliderArrows.querySelector(".slider__dots");
    let sliderButton = document.querySelector(".slider__arrow_button");
    let ulConteiner = document.querySelector(".elementsA");
    
    initButtons();
    initImages();
    initArrows();
    initNavigateSlide();
    initButtons();

    if(options.dots) {
        initDots()
    }

    if(options.title) {
        initTitles()
    }

    if(options.autoplay) {
        initAutoplay();
    }
    

    function initImages() {
       
        images.forEach((image, index) => {
         
         let imageDiv = `<div class="image n${index} ${index===0? "active" : ""} "style="background-image:url(${images[index].url});" data-index="${index}"></div>`   
         console.log(imageDiv)
         block_slide.innerHTML += imageDiv;
        
        })
    }

    function initArrows () {

        sliderArrows.querySelectorAll(".slider__arrow").forEach(arrow => {arrow.addEventListener("click", function() {
            let curNumber = +block_slide.querySelector(".active").dataset.index;
            let nextNumber;
            if (arrow.classList.contains("left")){
                nextNumber = curNumber === 0? images.length - 1 : curNumber - 1; 
                
            } else {
                nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
                
            }
            moveSlider(nextNumber);
            
            });
        });
    }

    function initButtons() {
        sliderButton.querySelectorAll(".btn_img").forEach(button => {button.addEventListener("click", function(){
            let curNumber = +block_slide.querySelector(".active").dataset.index;
            let nextNumber;
            if (button.classList.contains("button-left")){
                nextNumber = curNumber === 0? images.length - 1 : curNumber - 1; 
                
            } else {
                nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
                
            }
            moveSlider(nextNumber);
            })
        })
    }

    function initNavigateSlide() {
        images.forEach((image, index) => {
            let eliElement = `<li class="town_item ">
            <a class="click_A n${index} ${index ===0? "active_hover_A": "" } " data-index="${index}" href="#">${images[index].name}</a>
            </li>`
            
            ulConteiner.innerHTML += eliElement;
        });
        ulConteiner.querySelectorAll(".click_A").forEach(element => {
            element.addEventListener("click", function(evt){
                evt.preventDefault();
                moveSlider(this.dataset.index);
                ulConteiner.querySelector(".active_hover_A").classList.remove("active_hover_A");
                this.classList.add("active_hover_A");
                
            })
        })

    }
    

    function initDots() {
        images.forEach((image, index) => {
            let dot = `<div class="slider__dots-item n${index} ${index ===0? "active": "" }" data-index="${index}"></div>`
            sliderDots.innerHTML += dot;
        });
        sliderDots.querySelectorAll(".slider__dots-item").forEach(dot => {
            dot.addEventListener("click", function(){
                moveSlider(this.dataset.index);
                sliderDots.querySelector(".active").classList.remove("active");
                this.classList.add("active");
                
            })
        })
    };

    function moveSlider(num) {
        block_slide.querySelector(".active").classList.remove("active");
        block_slide.querySelector(".n" + num).classList.add("active");
        if (options.dots) {
            sliderDots.querySelector(".active").classList.remove("active");
            sliderDots.querySelector(".n" + num).classList.add("active");
        }
        if(options.navigate) {
            ulConteiner.querySelector(".active_hover_A").classList.remove("active_hover_A");
            ulConteiner.querySelector(".n" + num).classList.add("active_hover_A");
        }
        
        changeInfo(num)

    }
   
    function initTitles() {
        let titleDiv = `<div class="slider__images-title">${images[0].title}</div>`
        sliderImages.innerHTML += cropTitle(titleDiv, 50)
    }

    function changeInfo(num) {
        if(!images[num].city) return;
        let infoBox = document.querySelector(".box-information")
        let nameCity = infoBox.querySelector("#nameCity");
            nameCity.innerHTML = "";
            nameCity.innerHTML = `
                <h3>CITY:</h3>
                <span id="name-city" >${images[num].city}</span>
            `;
        if(!images[num].area) return;
        let area = infoBox.querySelector("#area");
            area.innerHTML = " ";
            area.innerHTML = `
                <h3>apartment area:</h3>
                <span class="m2"> ${images[num].area} m<sup>2</sup></span>
            `;
        if(!images[num].time) return;
        let time = infoBox.querySelector("#time");
            time.innerHTML = " ";
            time.innerHTML = `
            <h3>Repair time:</h3>
            <span id="repair-time">${images[num].time}</span>
            `;

    }  
    
    function initAutoplay() {
        setInterval (()=> {
            let curNumber = +sliderImages.querySelector(".active").dataset.index;
            let nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
            moveSlider(nextNumber);
        }, options.autoplayInterval)
    }
}

let sliderOptions = {
    title: false,
    info: true,
    dots: true,
    autoplay: false,
    autoplayInterval:false,
    navigate: true
};

document.addEventListener("DOMContentLoaded", function() {
    initSlider(sliderOptions)
})