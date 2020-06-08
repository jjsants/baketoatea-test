// using fullpage.js to structure the scrolling style of the page

new fullpage('#fullpage', {
  autoScrolling: false,
  navigation: true,
  navigationTooltips: ["home", "about us", "contact"],
  showActiveTooltip: true,
  // controlArrows:true,
  // slidesNavigation:true

  onLeave: function(origin, destination, direction) {
    var leavingSection = this;
    var tl = gsap.timeline({
      delay: 0.7
    });
    //after leaving section 2
    if (origin.index == 0 && direction == 'down') {
      //Used greeshock 3 to do the animations.
      tl.fromTo(".presentation", {
          height: 0,
          width: 0
        }, {
          duration: 1,
          width: "50%",
          height: "70%",
          ease: "power4",
          right: "25%"
        })
        .from(".intro-text", {
          opacity: 0,
          duration: 2,
          ease: "power4"
        })
        .from(".hidden-intro", {
          opacity: 0,
          visibility: "visible",
          duration: 1,
          x: 200,
          ease: "power4"
        }, "-=2")
        .to(".hidden-intro", {
          opacity: 100,
          visibility: "visible",
          x: 0
        })
    } else if (origin.index == 1 && direction == 'down') {
      // alert("Going to section 2!");

    } else if (origin.index == 2 && direction == 'down') {
      // alert("Going to section 3!");

    }
    // up
    else if (origin.index == 3 && direction == 'up') {
      // alert("Going to section 2!");

    } else if (origin.index == 2 && direction == 'up') {
      //alert("Going to section 1!");
      tl.fromTo(".presentation", {
          height: 0,
          width: 0
        }, {
          duration: 1,
          width: "50%",
          height: "70%",
          ease: "power4",
          right: "25%"
        })
        .from(".intro-text", {
          opacity: 0,
          duration: 2,
          ease: "power4"
        })
        .from(".hidden-intro", {
          opacity: 0,
          visibility: "visible",
          duration: 1,
          x: 200,
          ease: "power4"
        }, "-=2")
        .to(".hidden-intro", {
          opacity: 100,
          visibility: "visible",
          x: 0
        })
    }
  }
});


//collection Page

//function used to create the first carousel
function changeSlide(direction) {
  var currentImg = $(".active");
  var nextImg = currentImg.next();
  var previousImg = currentImg.prev();

  if (direction == "next") {
    if (nextImg.length) {
      nextImg.addClass("active");
    } else {
      $(".collection-slider .img-bakery-collection").first().addClass("active");
    }

  } else {
    if (previousImg.length) {
      previousImg.addClass("active");
    } else {
      $(".collection-slider .img-bakery-collection").last().addClass("active");
    }
  }
  currentImg.removeClass("active");
}

//collection Page
//function used to create the second carousel
function changeSlide2(direction) {
  var currentImg = $(".active2");
  var nextImg = currentImg.next();
  var previousImg = currentImg.prev();

  if (direction == "next") {
    if (nextImg.length) {
      nextImg.addClass("active2");
    } else {
      $(".collection-slider2 .img-bake-collection").first().addClass("active2");
    }

  } else {
    if (previousImg.length) {
      previousImg.addClass("active2");
    } else {
      $(".collection-slider2 .img-bake-collection").last().addClass("active2");
    }
  }
  currentImg.removeClass("active2");
}


// ------------------------------------------------------
// map api

function initMap() {
  var dublin = {
    lat: 53.395455999999996,
    lng: -6.127616

  };

  var map = new google.maps.Map(document.getElementById('map'), {
    scaleControl: true,
    center: dublin,
    zoom: 14
  });

  var infowindow = new google.maps.InfoWindow;
  infowindow.setContent('<b>BakedToATea</b>');

  var marker = new google.maps.Marker({
    map: map,
    position: dublin
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);

  });
}
// -----------------------------------------------------------


// -----------------------------------------------------------
//recipe API

//add an event listener to the button that runs the function sendApiRequest when it is clicked.
let searchInput = document.querySelector(".searchImput")
  
let searchButton = document.querySelector("#search")

searchButton.addEventListener("click", () => {
  console.log("button pressed")
  sendApiRequest(searchInput.value)

})

//an asysncrhonous function to fetch data from the API.
async function sendApiRequest(text) {
  let search = text;
  
  let APP_ID = "8890b18e"
  let API_KEY = "83f29000c0d94a9e37e048533135f2c4"
  let response = await fetch(`https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=${search}`);
  console.log(response)
  let data = await response.json()
  console.log(data)
  useApiData(data)
}

//function that does something with the data received from the API. The name of the function should be customized to whatever you are doing with
// function useApiData(data) {
//     document.querySelector("#content").innerHTML = `
// <div class="card" style="width: 18rem;">
//   <img src="${data.hits[0].recipe.image}" class="card-img-top" alt="...">
//   <div class="card-body">
//     <h5 class="card-title">${data.hits[0].recipe.label}</h5>
//     <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
//     <a href="${data.hits[0].recipe.url}" class="btn btn-primary " target="_blank">Take me to the Full Recipe</a>
//   </div>
// </div>
// `
// }

function useApiData(data){
    
//     let searchInput = document.querySelector(".searchImput")
// if (!searchInput){
//       searchInput.innerHTML("<h2> Please enter a name</h2>")
//     //   $("#search").html(`<h2> Please enter a name</h2>`)
//     return;
//   }

  const content = document.createElement("content");

    const wrapper = document.createElement("div");
    wrapper.setAttribute("id", "wrapper");

    const card = document.createElement("div");
    wrapper.setAttribute("class", "card");

    const image = document.createElement("img");

     const cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");

    const cardTitle = document.createElement("h5");
    cardTitle.setAttribute("class", "card-title");

    const cardText = document.createElement("p");
    cardText.setAttribute("class", "card-text");

    const cardText1 = document.createElement("p");
    cardText1.setAttribute("class", "card-text");

    const btn = document.createElement("a");

  for (let i = 0 ;i < data.hits.length; i++) {

  document.querySelector("#content").innerHTML = `
<div id="wrapper">
<div class="card" style="width: 18rem;">
  <img src="${data.hits[i].recipe.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${data.hits[i].recipe.label}</h5>
    <p class="card-text">Ingredients: ${data.hits[i].recipe.ingredientLines}</p>
    <p class="card-text">Prep Time: ${data.hits[i].recipe.totalTime} min</p>
    <a href="${data.hits[i].recipe.url}" class="btn btn-primary">Full Recipe</a>
  </div>
</div>

content.appendChild(wrapper)
content.appendChild(card)
card.appendChild(image)
card.appendChild(cardBody)
carBody.appendChild(cardTitle)
carBody.appendChild(cardText)
carBody.appendChild(cardText1)
carBody.appendChild(btn)
`
}
}
