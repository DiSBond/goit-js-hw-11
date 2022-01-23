import { getPictures } from "./fetch";
import cardTemplate from "../template/card_temp.hbs"
import Notiflix from 'notiflix';
import { getMorePictures } from "./fetch";
import { pageCount } from "./creating_cards"


const galleryEl = document.querySelector(".gallery")
const searchBtm = document.querySelector(".submit");
const loadMoreBtm = document.querySelector(".load-more")

loadMoreBtm.hidden = true;

searchBtm.addEventListener("click", onBtnClick);
loadMoreBtm.addEventListener("click", onMorePicClick)

 async function onBtnClick(e) {
     e.preventDefault()
     
     galleryEl.innerHTML = " ";
// 1
    getPictures().then(async result => {
        if (result.data.hits.length !== 0) {

        const objMassive = result.data.hits;
       
        const cards = await objMassive.map(obj => {
            
            return cardTemplate(obj)
        }) 
            galleryEl.innerHTML = cards;
            loadMoreBtm.hidden = false;
        
    } else {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            loadMoreBtm.hidden = true;
    }
})  
}


function onMorePicClick(e) {
    e.preventDefault()

    const resultSum = getMorePictures();


    getPictures().then(async result => {
        if (resultSum < result.data.totalHits) {
             const objMassive = result.data.hits;
       
            const cards = await objMassive.map(obj => {
            
                return cardTemplate(obj)
            })
            galleryEl.insertAdjacentHTML("beforeend", cards)
        } else {
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
            loadMoreBtm.hidden = true;
        }
    })
}
