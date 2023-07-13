"use strict";

window.addEventListener("DOMContentLoaded", function (){
    //tab logic start
    const tabsTitle  = document.querySelectorAll(".tabheader__item");
    const tabsText = document.querySelectorAll(".tabcontent"); 
    const tabsTitleParent = document.querySelector(".tabheader__items"); 
            
            function hideTabContent (){
                tabsText.forEach(text => {
                    text.classList.add("hide");
                    text.classList.remove("show", "fade");
                });

                tabsTitle.forEach(head => head.classList.remove("tabheader__item_active"));
            }

            function showTabContent(i = 0){
                tabsText[i].classList.add("show", "fade");
                tabsText[i].classList.remove("hide");
                tabsTitle[i].classList.add("tabheader__item_active");
            }


            hideTabContent(); 
            showTabContent();

            tabsTitleParent.addEventListener("click", (e) => {
                if(e.target && e.target.matches(".tabheader__item")){
                   
                    tabsTitle.forEach((title, index)=>{
                        if(e.target === title){
                            hideTabContent(); 
                            showTabContent(index);
                        }
                    });
                }
            });

    //tab logic end


    //timer logic start
            const deadline ="2023-07-17";

            function getTimeRemanining (endtime){
                const total = Date.parse(endtime) - Date.parse(new Date());
                let days,hours,minutes,seconds;

                if(total <= 0){
                    days = 0;
                    hours = 0;
                    minutes = 0;
                    seconds = 0;
                }else{
                    days = Math.floor(total / (1000 * 60 * 60 * 24));
                    hours = Math.floor((total / (1000 * 60 * 60) % 24));
                    minutes =  Math.floor((total / 1000 / 60) % 60);
                    seconds = Math.floor((total / 1000) % 60); 
                }

                return {
                    total,
                    days,
                    hours,
                    minutes,
                    seconds
                }
            }

            function setZero (n){
                return n >= 0 && n <= 9 ? `0${n}` : n;
            }

            function setClock (selector, endtime){
                const timer = document.querySelector(selector);
                const daysBlock = timer.querySelector("#days");
                const hoursBlock = timer.querySelector("#hours");
                const minutesBlock = timer.querySelector("#minutes");
                const secondsBlock = timer.querySelector("#seconds");
                const timerId = setInterval(updateClock,1000);

                updateClock();


                function updateClock(){
                    const {total,days,hours,minutes,seconds} = getTimeRemanining(endtime);

                    daysBlock.textContent = setZero(days);
                    hoursBlock.textContent = setZero(hours);
                    minutesBlock.textContent = setZero(minutes);
                    secondsBlock.textContent = setZero(seconds);

                    if(total <= 0){
                        clearInterval(timerId)
                    }

                }
            }

            setClock(".timer", deadline);
    //timer logic end

    //modal logic start
            const modalTrigger =document.querySelectorAll("[data-modal]");
            const modal = document.querySelector(".modal");
            const modalCloseBtn = document.querySelector("[data-close]");

            modalTrigger.forEach(btn => btn.addEventListener("click", openModal));
            modalCloseBtn.addEventListener("click", closeModal);

            modal.addEventListener("click", (e)=>{
                if(e.target === modal){
                    closeModal();
                }
            });
            
            document.addEventListener("keydown",(e)=>{
                if(e.key === "Escape" &&  modal.matches(".show")){
                   closeModal();
                }
            });

            const modalTimerId = setTimeout(openModal,600000);

            function showModalByScroll(){
                    if(window.scrollY >= 2000){
                    openModal();
                    window.removeEventListener("scroll",showModalByScroll);
                }
            };
            
            window.addEventListener("scroll",showModalByScroll);

         function openModal(){
            modal.classList.add("show");
            modal.classList.remove("hide");
            document.body.style.overflow = "hidden";
            clearTimeout(modalTimerId);
        }
        function closeModal(){
            modal.classList.remove("show");
            modal.classList.add("hide");
            document.body.removeAttribute("style");
        }

    //modal logic end
    
});