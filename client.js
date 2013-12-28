(function (root) {
  "use strict";

  var BallAround = function () {
    // Set this to self var ncase of scope problems
    var self = this;

    // Defaults ballSize is 60px
    self.ballSize = 60;
    // Get #content element selector
    self.contentDiv = document.querySelector("#content");

    // Function that Set Settings for BallAround
    self.SetSettings = function(ballDiv, ballSize){
      // Check if ballSize is an Object Number
      if(typeof ballSize !== 'number')
        return console.log("Error: Size must be a number");

      // Set with and height of the ball
      ballDiv.style.width = ballSize.toString()+"px";
      ballDiv.style.height = ballSize.toString()+"px";
    }

    // Function that Creates Random Position of the ball
    self.RandomPosition = function(ballSize){
      var height = window.innerHeight - (ballSize+60); // Additional 60 due to the header
      var width = window.innerWidth - ballSize;

      var newHeight = Math.ceil(Math.random() * height);
      var newWidth = Math.ceil(Math.random() * width);

      var pos = { x: newWidth , y: newHeight }

      return pos;   
    }

    self.MoveRandom = function (ballDiv, ballSize){
      var transition = function(e) {
        // Stop other listener such as parent
        e.stopPropagation();
        // Make sure transition runs once since it runs for all set of transition made "top, left, width, height"
        if(e.propertyName === "width" || e.propertyName === "top") {

          // Create random position for the ball
          var randomPos = self.RandomPosition(ballSize);

          // Set speed transition 4 second for now (Might change it so user can set it)
          ballDiv.style.transitionDuration = "4s";

          // Set top and left transition
          ballDiv.style.left = randomPos.x.toString()+"px";
          ballDiv.style.top = randomPos.y.toString()+"px";

        }
      }

      // Event Listener for across browser when transition end callback function "transition"
      ballDiv.addEventListener("webkitTransitionEnd", transition, false);
      ballDiv.addEventListener("transitionend", transition, false);
      ballDiv.addEventListener("oTransitionEnd", transition, false);

    }

    // Function that Creates a Ball
    self.CreateBall  = function(ballSize) {
      // Create the ball element
      var ballDiv = document.createElement("div");
      // Add Class .ball
      ballDiv.classList.add("ball");

      // If ballSize params exist set self.ballSize to ballSize params else set to default size (60)
      if(ballSize) self.ballSize = ballSize;
    
      // Append ball Element to #Content 
      self.contentDiv.appendChild(ballDiv);

      // Rerender the width transition animation after dynamic alloc using "Compute Style"
      window.getComputedStyle(ballDiv).width;

      // Set Ball Size
      self.SetSettings(ballDiv, self.ballSize);

      // Make Ball Move Random
      self.MoveRandom(ballDiv, self.ballSize);

      // Add event handler for each ball selector.
      // If clicked it creates another clone of the ball
      ballDiv.addEventListener("click", function() {
        console.log("Ball Clicked");
        // Create Balll
        self.CreateBall(self.ballSize);
      });
    }

  };

  // Function that initialize BallAround 
  BallAround.prototype.init = function (ballSize) {
    // Create Ball
    this.CreateBall(ballSize);
  };

  root.BallAround = BallAround;

}(this));

// Creation
var b = new BallAround();
//b.init(40); // Custom Ball Size
b.init();

