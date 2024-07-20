import{a as h,i as g,S as _}from"./assets/vendor-d93b82f1.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(e){if(e.ep)return;e.ep=!0;const a=n(e);fetch(e.href,a)}})();const b="https://pixabay.com",L="api/",w="44646887-2aa33964a79eef97580c1a22f";h.defaults.baseURL=b;const p=async({q:s="",page:r=1,pageSize:n=15}={})=>{try{return(await h.get(L,{params:{key:w,q:s,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:n,page:r}})).data}catch{throw new Error("Sorry, something went wrong with the API request.")}},u=s=>s.map(({tags:r,webformatURL:n,largeImageURL:o,likes:e,views:a,comments:i,downloads:y})=>`
          <li class="card-container">
            <a href=${o} class="card-container__link js-card-link">
              <img loading="lazy" class="card-container__photo" src="${n}" alt="${r}" >
            </a>
            <div class="card-container__thumb">
              <div class="card-container__meta">
                <span class="card-container__title">Likes</span>
                <span class="card-container__info">${e}</span>
              </div>
              <div class="card-container__meta">
                <span class="card-container__title">Views</span>
                <span class="card-container__info">${a}</span>
              </div>
              <div class="card-container__meta">
                <span class="card-container__title">Comments</span>
                <span class="card-container__info">${i}</span>
              </div>
              <div class="card-container__meta">
                <span class="card-container__title">Downloads</span>
                <span class="card-container__info">${y}</span>
              </div>
            </div>
          </li>
        `).join(""),E=document.querySelector(".gallery"),v=document.querySelector(".search-form"),S=document.querySelector(".loader"),P=document.querySelector(".btn-load"),q=Object.freeze(Object.defineProperty({__proto__:null,galleryEl:E,loadMoreEl:P,loaderEl:S,searchFormEl:v},Symbol.toStringTag,{value:"Module"})),{galleryEl:d,searchFormEl:M,loaderEl:m,loadMoreEl:c}=q,t={q:"",page:1,pageSize:9,maxPage:0};let l=null;M.addEventListener("submit",$);async function $(s){if(s.preventDefault(),d.innerHTML="",c.classList.add("is-hidden"),t.q=s.target.elements.searchKeyword.value.trim(),t.page=1,!t.q)return g.error({message:"The field in which you enter the text cannot be empty",position:"center",backgroundColor:"rgba(239, 64, 64, 1)",messageColor:"rgba(250, 250, 251, 1)",messageSize:"16",messageLineHeight:"24"});m.classList.remove("is-hidden");try{const r=await p(t);if(t.maxPage=Math.ceil(r.totalHits/t.pageSize),r.hits.length===0)return g.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"center",backgroundColor:"rgba(239, 64, 64, 1)",messageColor:"rgba(250, 250, 251, 1)",messageSize:"16",messageLineHeight:"24"});if(!Array.isArray(r.hits))throw new Error("Unexpected data format from API");d.insertAdjacentHTML("beforeend",u(r.hits)),l?l.refresh():l=new _(".gallery a",{captionsData:"alt",captionDelay:250}),t.page<t.maxPage&&(c.classList.remove("is-hidden"),c.addEventListener("click",f))}catch(r){console.log(r)}finally{m.classList.add("is-hidden"),s.target.reset()}}async function f(){t.page+=1;try{const s=await p(t);d.insertAdjacentHTML("beforeend",u(s.hits));const r=d.querySelector(".card-container").getBoundingClientRect().height;window.scrollBy({top:2*r,behavior:"smooth"}),l.refresh(),t.page>=t.maxPage&&(c.classList.add("is-hidden"),c.removeEventListener("click",f),g.error({message:"We're sorry, but you've reached the end of search results.",position:"center",backgroundColor:"rgba(239, 64, 64, 1)",messageColor:"rgba(250, 250, 251, 1)",messageSize:"16",messageLineHeight:"24"}))}catch{throw new Error("Sorry, something went wrong with the API request.")}}
//# sourceMappingURL=commonHelpers.js.map
