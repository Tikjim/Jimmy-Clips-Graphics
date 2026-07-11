/*==================================================
    PREMIUM EXPANDING CARDS
==================================================*/

const cards = document.querySelectorAll(".card");
const cardsContainer = document.querySelector(".cards");

let activeIndex = 0;
let autoPlay;

/*=========================================
    ACTIVATE CARD
=========================================*/

function activateCard(index){

    cards.forEach(card=>card.classList.remove("active"));

    cards[index].classList.add("active");

    activeIndex=index;

}

/*=========================================
    NEXT
=========================================*/

function nextCard(){

    activeIndex++;

    if(activeIndex>=cards.length){

        activeIndex=0;

    }

    activateCard(activeIndex);

}

/*=========================================
    PREVIOUS
=========================================*/

function previousCard(){

    activeIndex--;

    if(activeIndex<0){

        activeIndex=cards.length-1;

    }

    activateCard(activeIndex);

}

/*=========================================
    AUTO PLAY
=========================================*/

function startAuto(){

    clearInterval(autoPlay);

    autoPlay=setInterval(nextCard,5000);

}

function stopAuto(){

    clearInterval(autoPlay);

}

startAuto();

/*=========================================
    CLICK
=========================================*/

cards.forEach((card,index)=>{

    card.addEventListener("click",()=>{

        activateCard(index);

        startAuto();

    });

});

/*=========================================
    HOVER PAUSE
=========================================*/

cardsContainer.addEventListener("mouseenter",stopAuto);

cardsContainer.addEventListener("mouseleave",startAuto);

/*=========================================
    KEYBOARD
=========================================*/

document.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowRight"){

        nextCard();

        startAuto();

    }

    if(e.key==="ArrowLeft"){

        previousCard();

        startAuto();

    }

});

/*=========================================
    TOUCH
=========================================*/

let startX=0;

cardsContainer.addEventListener("touchstart",(e)=>{

    startX=e.changedTouches[0].clientX;

});

cardsContainer.addEventListener("touchend",(e)=>{

    let endX=e.changedTouches[0].clientX;

    let distance=startX-endX;

    if(distance>60){

        nextCard();

    }

    if(distance<-60){

        previousCard();

    }

});

/*=========================================
    SCROLL REVEAL
=========================================*/

const observer=new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:.25
});

cards.forEach(card=>observer.observe(card));

/*=========================================
    MAGNETIC LINK
=========================================*/

document.querySelectorAll(".content a").forEach(link=>{

    link.addEventListener("mousemove",(e)=>{

        const rect=link.getBoundingClientRect();

        const x=e.clientX-rect.left-rect.width/2;

        const y=e.clientY-rect.top-rect.height/2;

        link.style.transform=
        `translate(${x*.18}px,${y*.18}px)`;

    });

    link.addEventListener("mouseleave",()=>{

        link.style.transform="translate(0,0)";

    });

});

/*=========================================
    CURSOR LIGHT
=========================================*/

cards.forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect=card.getBoundingClientRect();

        const x=e.clientX-rect.left;

        const y=e.clientY-rect.top;

        card.style.setProperty("--x",x+"px");
        card.style.setProperty("--y",y+"px");

    });

});

/*=========================================
    INITIALIZE
=========================================*/

activateCard(0);