const API_KEY = "a66b1f984cdc4bce8e6148c660fb2487"; 
const URL = "https://newsapi.org/v2/everything?q="; 


async function fetchData(query){
  const res = await fetch(`${URL}${query}&apiKey=${API_KEY}`);
  let data = await res.json();  
  return data;
} 
fetchData("headlines").then(data => renderMain(data.articles)); 

let mobileMenu = document.querySelector(".mobile");
let menuBtn = document.querySelector(".menubtn"); 
let menuBtnDisplay = true; 

menuBtn.addEventListener("click", ()=>{
  mobileMenu.classList.toggle("hidden");
}) 
 

function renderMain(arr){
  let mainHTML = ''; 
  for(let i = 0; i < arr.length; i++){
    if(arr[i].urlToImage){
    mainHTML +=   `<div class="card"> 
                    <a href=${arr[i].url}>
                    <img src=${arr[i].urlToImage} lazy="loading">  
                    <h4>${arr[i].title}</h4> 
                    <div class="publishbydate">
                        <p>${arr[i].source.name}</p>  
                        <span>•</span>
                        <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p> 
                    </div> 
                    <div class="description">
                         ${arr[i].description}
                    </div> 
                    </a>
                  </div>` 
    }
  } 
  document.querySelector("main").innerHTML = mainHTML; 
} 

const searchBtn = document.getElementById("searchform"); 
const searchBtnMobile = document.getElementById("searchformmobile");  
const searchInput = document.getElementById("searchinput"); 
const searchInputMobile = document.getElementById("searchinputmobile"); 

searchBtn.addEventListener("submit",async(e)=>{
  e.preventDefault(); 
  const data = await fetchData(searchInput.value); 
  renderMain(data.articles);
})
searchBtnMobile.addEventListener("submit",async (e)=>{
  e.preventDefault(); 
  const data = await fetchData(searchInputMobile.value); 
  renderMain(data.articles);
}) 

async function search(query){
  const data = await fetchData(query); 
  renderMain(data.articles);
} 


//https://newsapi.org/v2/top-headlines?country=in&apiKey=a66b1f984cdc4bce8e6148c660fb2487