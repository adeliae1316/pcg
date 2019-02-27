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

  let status_num = 0,
    before_value = 0;

  clearCountArea();

  let elems_times = document.querySelectorAll(".times");
  for (let i = 0; i < elems_times.length; i++) {
    throw_coins(elems_times[i]);
  }

  for (let i = 0; i < 5; i++) {
    clickStatus(elements_array[i], status_array[i]);
  }

  for (let i = 0; i < elems.length; i++) {
    clickOK(elems[i]);
  }

  dclick(count_area, function() {
    console.log("double-click");
  }, function() {
    console.log("single-click");
  });

  function clearCountArea() {
    // Init count_area and coins_screen
    count_area.addEventListener("click", function() {
      count_num = 0;
      count_area.innerText = count_num;
      coins_screen.innerText = "";
    }, false);
  }

  function clickOK(modal_element) {
    modal_element.addEventListener("click", function() {
      if (modal_element.lastElementChild.lastElementChild.dataset["value"] == ok_array[get_modal_num(modal_element)]) {
        switch (modal_element.id) {
          case "modal-poison":
          case "modal-burn":
            change_status(status_array[status_num]);
            break;
          case "modal-sleep":
          case "modal-paralysis":
          case "modal-confusion":
            change_status(status_array[status_num]);
            before_value = status_num;
            break;
          case "modal-paralysis-interference":
          case "modal-sleep-interference":
          case "modal-confusion-interference":
            console.log("in-if_clickOK: " + modal_element.id);
            change_status(status_array[before_value]);
            change_status(status_array[status_num]);
            before_value = status_num;
            break;
        }
      }
    }, false);
  }

  function clickStatus(element, status_element) {
    element.addEventListener("click", function() {
      const conflict_status = (!status_element.is_status && (status_sleep.is_status || status_paralysis.is_status || status_confusion.is_status)) && !(status_element == status_poison || status_element == status_burn);
      const non_conflict_status = (!status_element.is_status && (status_element == status_poison || status_element == status_burn)) || (!status_element.is_status);
      if (conflict_status) {
        status_num = get_status_num(element);
        instances[status_num + 3].open();
      } else if (non_conflict_status) {
        status_num = get_status_num(element);
        instances[status_num].open();
      }
    }, false);
  }

  function change_status(status_element) {
    if (!status_element.is_status && status_element.element.className.indexOf("disable-gray") != -1) {
      let temp = status_element.element.className.replace("disable-gray", "");
      status_element.element.className = temp;
      status_element.is_status = true;
    } else if (status_element.is_status) {
      status_element.element.className += "disable-gray";
      status_element.is_status = false;
    }
  }

  function throw_coins(element) {
    element.addEventListener("click", function() {
      times = element.value;
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
    }, false);
  }

  function get_modal_num(element) {
    switch (element.id) {
      case "modal-poison":
        return 0;
      case "modal-burn":
        return 1;
      case "modal-sleep":
      case "modal-sleep-interference":
        return 2;
      case "modal-paralysis":
      case "modal-paralysis-interference":
        return 3;
      case "modal-confusion":
      case "modal-confusion-interference":
        return 4;
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

  function dclick(element, dfunc, sfunc) {
    var clicked = false;
    element.addEventListener("click", function() {
      if (clicked) {
        // write your function when double click
        dfunc();
        clicked = false;
        return;
      }
      clicked = true;
      setTimeout(function() {
        if (clicked) {
          // write your function when double click
          sfunc();
        }
        clicked = false;
      }, 300);
    }, false);
  }

  // document.body.addEventListener で イベントを受け取るときは
  // if (event.target.className.indexOf("times") != -1) で処理を分ける
  // status(status_poison, elems[0].lastElementChild.lastElementChild.dataset["value"]);

}, false);
