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
});


