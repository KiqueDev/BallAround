(function (root) {
  "use strict";
  var BallAround = function () {
    var self = this;

    self.size = 60;// Defaults size
    self.contentDiv = document.querySelector("#content");

    self.setSettings = function(ballDiv, size){
      if(typeof size !== 'number')
        return console.log("Size must be a number");

      ballDiv.style.width = size.toString()+"px";
      ballDiv.style.height = size.toString()+"px";
      self.contentDiv.style.top = size.toString()+"px";
      self.contentDiv.style.bottom = size.toString()+"px";
      self.contentDiv.style.right = size.toString()+"px";
    }

    self.makeBall  = function(size) {
      var ballDiv = document.createElement("div");
      ballDiv.classList.add("ball");
      ballDiv.classList.add("moveBall");

      self.contentDiv.appendChild(ballDiv);

      window.getComputedStyle(ballDiv).width; // Rerender the transition animation after dynamic alloc

      (size) ? self.setSettings(ballDiv, size) : self.setSettings(ballDiv, self.size);

      ballDiv.addEventListener("click", function() {
        console.log("Ball Clicked");
        self.makeBall(size);
      });

    }
  };

  // Init Function  
  BallAround.prototype.init = function (size) {
    this.makeBall(size);
  };

  root.BallAround = BallAround;

}(this));

// Creation
var d = new BallAround();
// d.init(40); // Custom Ball size
d.init();

