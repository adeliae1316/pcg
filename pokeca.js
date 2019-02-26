window.addEventListener("DOMContentLoaded", function() {
  let prev = 0,
    times = 0,
    count_num = 1;
  let count_area = document.getElementById("count");
  let coins_screen = document.getElementById("coins-screen");

  // Constructor
  let Status = function(element) {
    this.element = element;
    this.is_status = false;
  }

  // Get Id of Status
  let poison = document.getElementById("poison");
  let burn = document.getElementById("burn");
  let sleep = document.getElementById("sleep");
  let paralysis = document.getElementById("paralysis");
  let confusion = document.getElementById("confusion");

  let elements_array = [poison, burn, sleep, paralysis, confusion];

  // Instance
  let status_poison = new Status(poison);
  let status_burn = new Status(burn);
  let status_sleep = new Status(sleep);
  let status_paralysis = new Status(paralysis);
  let status_confusion = new Status(confusion);

  let status_array = [status_poison, status_burn, status_sleep, status_paralysis, status_confusion];
  let ok_array = ["ok-poison", "ok-burn", "ok-sleep", "ok-paralysis", "ok-confusion"];

  // Init Modals of Materialize
  let elems = document.querySelectorAll('.modal');
  let instances = M.Modal.init(elems);

  for(let i=0;i<status_array.length;i++){
    status(elements_array[i], status_array[i]);
  }

  document.body.addEventListener("click", function(event) {
    // Init count_area and coins_screen
    if (event.target == count_area) {
      count_num = 0;
      count_area.innerText = count_num;
      coins_screen.innerText = "";
    }
    throw_coins(event);
  }, false);

  function status(element, status_element){
    let status_num = get_status_num(element);
    element.addEventListener("click", function() {
      if (!status_element.is_status) {
        instances[status_num].open();
        document.body.addEventListener("click", function(event) {
          if (event.target.dataset["value"] == ok_array[status_num]) {
            change_status(status_array[status_num]);
          }
        }, false);
      }
    }, false);
  }

  function change_status(status_element) {
    if (status_element.element.className.indexOf(" disable-gray") != -1) {
      let temp = status_element.element.className.replace(" disable-gray", "");
      status_element.element.className = temp;
      status_element.is_status = true;
    } else {
      status_element.element.className += " disable-gray";
      status_element.is_status = false;
    }
  }

  function throw_coins(event) {

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
  }

  function get_status_num(element) {
    switch (element.id) {
      case "poison":
        return 0;
      case "burn":
        return 1;
      case "sleep":
        return 2;
      case "paralysis":
        return 3;
      case "confusion":
        return 4;
    }
  }

  // event.target.className;
  // status(status_poison, elems[0].lastElementChild.lastElementChild.dataset["value"]);

}, false);
