window.addEventListener("DOMContentLoaded", function() {
  let prev = 0,
    times = 0,
    count_num = 1;
  let count_area = document.getElementById("count");
  let coins_screen = document.getElementById("coins-screen");

  // Get Ids of Status
  let poison = document.getElementById("poison");
  let burn = document.getElementById("burn");
  let sleep = document.getElementById("sleep");
  let paralysis = document.getElementById("paralysis");
  let confusion = document.getElementById("confusion");

  // Init Modals of Materialize
  let elems = document.querySelectorAll('.modal');
  let instances = M.Modal.init(elems);

  document.body.addEventListener("click", function(event) {
    // console.log(event.target);

    switch(event.target.id){
      case "ok-poison":
      change_grayscale(poison);
      break;
      case "ok-burn":
      change_grayscale(burn);
      break;
      case "ok-sleep":
      change_grayscale(sleep);
      break;
      case "ok-paralysis":
      change_grayscale(paralysis);
      break;
      case "ok-confusion":
      change_grayscale(confusion);
      break;
    }

    // Init count_area and coins_screen
    if(event.target == count_area){
      count_num = 0;
      count_area.innerText = count_num;
      coins_screen.innerText = "";
    }

    if (event.target.className.indexOf("times") != -1) {
      times = event.target.value;
      if (times == prev) {
        count_num++;
        count_area.innerText = count_num;
      } else {
        count_num = 1;
        count_area.innerText = count_num;
      }
      let out_str = "";
      for (let i = 0; i < times; i++) {
        let sides = Math.floor((Math.random() * 1000) % 2);
        if (sides == 0) {
          out_str += " panorama_fish_eye ";
        } else {
          out_str += " block ";
        }
        coins_screen.innerText = out_str;
      }
      prev = times;
    }
  }, false);

  function change_grayscale(element){
    if(element.className.indexOf("disable-gray") == -1){
      element.className += " disable-gray";
      console.log("no");
    } else {
      let temp = element.className.replace("disable-gray", "");
      element.className = temp;
      console.log("yes");
    }
  }

}, false);
