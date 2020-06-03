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

//collection fullPage
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

//collection fullPage
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


// newsletter page

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us18.api.mailchimp.com/3.0/lists/325563e72a";

  const options = {
    method: "POST",
    auth: "junior:3c34340d3edade3fcd23d235e614f1ae-us18"
  }

  const request = https.request(url, options, function(response) {

    if (response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req, res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running locally on port 3000");
});

//api key:  3c34340d3edade3fcd23d235e614f1ae-us18
//unique id:  325563e72a
