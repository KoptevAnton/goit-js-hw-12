import{a as m,i as g,S as p}from"./assets/vendor-d93b82f1.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();const b="https://pixabay.com",L="api/",w="44646887-2aa33964a79eef97580c1a22f";m.defaults.baseURL=b;const u=async({q:t="",page:a=1,pageSize:i=15}={})=>{try{return(await m.get(L,{params:{key:w,q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:i,page:a}})).data}catch{throw new Error("Sorry, something went wrong with the API request.")}},f=t=>t.map(({tags:a,webformatURL:i,largeImageURL:o,likes:e,views:r,comments:c,downloads:_})=>`
          <li class="card-container">
            <a href=${o} class="card-container__link js-card-link">
              <img loading="lazy" class="card-container__photo" src="${i}" alt="${a}" >
            </a>
            <div class="card-container__thumb">
              <div class="card-container__meta">
                <span class="card-container__title">Likes</span>
                <span class="card-container__info">${e}</span>
              </div>
              <div class="card-container__meta">
                <span class="card-container__title">Views</span>
                <span class="card-container__info">${r}</span>
              </div>
              <div class="card-container__meta">
                <span class="card-container__title">Comments</span>
                <span class="card-container__info">${c}</span>
              </div>
              <div class="card-container__meta">
                <span class="card-container__title">Downloads</span>
                <span class="card-container__info">${_}</span>
              </div>
            </div>
          </li>
        `).join(""),v=document.querySelector(".gallery"),E=document.querySelector(".search-form"),S=document.querySelector(".loader"),P=document.querySelector(".btn-load"),q=Object.freeze(Object.defineProperty({__proto__:null,galleryEl:v,loadMoreEl:P,loaderEl:S,searchFormEl:E},Symbol.toStringTag,{value:"Module"})),{galleryEl:l,searchFormEl:M,loaderEl:h,loadMoreEl:n}=q,s={q:"",page:1,pageSize:9,maxPage:0};h.classList.add("is-hidden");n.classList.add("is-hidden");let d=null;M.addEventListener("submit",$);async function $(t){if(t.preventDefault(),l.innerHTML="",n.classList.add("is-hidden"),s.q=t.target.elements.searchKeyword.value.trim(),s.page=1,!s.q)return g.error({message:"The field in which you enter the text cannot be empty",position:"center",backgroundColor:"rgba(239, 64, 64, 1)",messageColor:"rgba(250, 250, 251, 1)",messageSize:"16",messageLineHeight:"24"});h.classList.remove("is-hidden");try{const a=await u(s);if(s.maxPage=Math.ceil(a.totalHits/s.pageSize),a.hits.length===0)return g.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"center",backgroundColor:"rgba(239, 64, 64, 1)",messageColor:"rgba(250, 250, 251, 1)",messageSize:"16",messageLineHeight:"24"});l.insertAdjacentHTML("beforeend",f(a.hits)),d=new p(".gallery a",{captionsData:"alt",captionDelay:250}),d.refresh()}catch(a){console.log(a)}finally{h.classList.add("is-hidden"),t.target.reset()}n.classList.remove("is-hidden"),n.addEventListener("click",y)}async function y(){s.page+=1;try{const t=await u(s);l.insertAdjacentHTML("beforeend",f(t.hits));const a=l.querySelector(".card-container").getBoundingClientRect().height;window.scrollBy({top:2*a,behavior:"smooth"}),d=new p(".gallery a",{captionsData:"alt",captionDelay:250}),d.refresh()}catch{throw new Error("Sorry, something went wrong with the API request.")}finally{s.page===s.maxPage&&(n.classList.add("is-hidden"),n.removeEventListener("click",y),g.error({message:"We're sorry, but you've reached the end of search results.",position:"center",backgroundColor:"rgba(239, 64, 64, 1)",messageColor:"rgba(250, 250, 251, 1)",messageSize:"16",messageLineHeight:"24"}))}}
//# sourceMappingURL=commonHelpers.js.map
