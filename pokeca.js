window.addEventListener("load", function() {
  let prev = 0, times = 0, count_num = 1;
  let count_area = document.getElementById("count");
  let coins_screen = document.getElementById("coins-screen");
  count_area.addEventListener("click", function(){
    count_num = 0;
    count_area.innerText = count_num;
    coins_screen.innerText = "";
  }, false)
  document.body.addEventListener("click", function(event) {
    // if (event.target.tagName == "BUTTON") {
    // console.log(event.target.className);
    if(event.target.className.indexOf("times") != -1){
      times = event.target.value;
      if(times == prev){
        count_num++;
        count_area.innerText = count_num;
      }else{
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
    }
    prev = times;
  }, false)
}, false)
