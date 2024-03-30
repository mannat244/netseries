const gradbg = document.querySelector(".background-overlay");


const slides = document.querySelectorAll(".slide");
var counter = 0;



console.log(slides);

slides.forEach((slide,index)=>{
slide.style.left = `${index*100}%`
})




const slideImg = () => {
    slides.forEach ((slide)=>{
         slide.style.transform =`translateX(-${counter*100}%)`
    })
   
}

const backg = () => {
    gradbg.style.backgroundImage = `url(${slides[counter].src})`;
    console.log("chang")
}
    
const next = () => {
    if(counter<(slides.length-1)) {
        console.log(counter)
           counter++
         backg()
            slideImg()
    } else {
        counter=0;
        backg()
        slideImg()
    }
     
   
}

function pre() {
    if(counter>0) {
        console.log(counter)
            counter--
        slideImg()
    } else {
        counter=(slides.length-1);
        slideImg()
    }

}

setInterval(next,4500)

const BASEURL = "https://image.tmdb.org/t/p/w1280";

const NowPlayingURL="https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&region=IN"
const PopularURL="https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=1&region=IN"
const Top_RatedURL="https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&region=IN&watch_region=IN"
const upcomingURL="https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&region=IN"

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZWQ2NDA1YjNlZDJkMGQxYzBjYzU4NGVmMjdiN2E5ZSIsInN1YiI6IjY2MDcxNzIyNTkwMDg2MDE3Y2I3YWZjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bsTM0EviomMHTmC5to-M43XeprUHj0L5VYFI1vQwHUo'
    }
  };
  


  

const getContent = async(url1,url2,url3,url4) => {
    const response1 = await fetch(url1, options)
    const data1 = await response1.json();
    const response2 = await fetch(url2, options)
    const data2 = await response2.json();
    const response3 = await fetch(url3, options)
    const data3 = await response3.json();
    const response4 = await fetch(url4, options)
    const data4 = await response4.json();

    showContent(data1, data2, data3, data4);
    console.log(data1)
} 

getContent(NowPlayingURL,PopularURL,Top_RatedURL,upcomingURL);





const showContent = (data1, data2, data3, data4) => {
    document.querySelectorAll(".item-container").forEach((container, index) => {

        container.addEventListener('wheel', (event) => {
            if (event.target.closest('.item-container')) {
                container.scrollLeft += event.deltaY;
                event.preventDefault(); // Prevent vertical scrolling
            }
        });

        

         container.innerHTML = ""; 
         
         let data = null;
         switch (index) {
             case 0:
                 data = data1;
                 break;
             case 1:
                 data = data2;
                 break;
             case 2:
                 data = data3;
                 break;
             case 3:
                 data = data4;
                 break;
             default:
                 break;
         }

        data.results.forEach((results, index)=>{

        const item = document.createElement("img")
        item.classList.add("poster")
        item.src=BASEURL + results.poster_path;
        item.addEventListener("click", ()=> {
            window.location.href=`details.html?id=${results.id}`
        })
        container.appendChild(item); 
       
        if (index ===  data1.results.length - 1) {
            item.style.marginRight = "3%";
        }
    })
    });
    
   


   
}

const params = new URLSearchParams(window.location.search);
  const movieId = params.get('id');
 
    var murl = "https://api.themoviedb.org/3/movie/"+movieId;
 console.log(murl);
 

const getDetails = async(murl) => {
    const resp = await fetch(murl,options)
    const detail = await resp.json();
    displaydetail(detail);
    console.log(detail)
}
   getDetails(murl);


   
    const first = document.querySelector(".first");
const displaydetail = (detail) => {
    // document.title = `${detail.original_title}`;
    const languages = detail.spoken_languages.map(language => language.name).join(', ');
    const genres = detail.genres.map(genre => genre.name).join(', ');
    const firstc = document.createElement("div")
    firstc.classList.add("first")
    firstc.innerHTML=` <div class="detail-holder">
    <h1>${detail.original_title}</h1>
    <div class="detail-strip"> ${genres} | ${detail.runtime} | ${detail.release_date} | ${detail.vote_average}</div>
    <div class="overview">${detail.overview}</div> 
    <div class="text">Languages Available: ${languages}</div>
    <button id="watch-button"> Watch </button>
    <p>Share  <i class="fa-solid fa-share"></i></p>
    </div>
   
    
    <div class="img-holder">
        <div class="img-overlay"></div>
        <img  class="img-m" src="https://image.tmdb.org/t/p/w1280${detail.backdrop_path}">
    </div>`

    first.appendChild(firstc);

    const watchButton = document.getElementById("watch-button");
    watchButton.addEventListener("click", () => {
        // Redirect to the movie's homepage if it's provided
        if (detail.homepage) {
            window.location.href = detail.homepage;
        } else {
            // Handle case where homepage is not provided
            console.log("Homepage not available");
        } } ) 
}


