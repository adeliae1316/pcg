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

  let options = {
    "preventScrolling": true
  };

  // Init Modals of Materialize
  let elems = document.querySelectorAll('.modal');
  let instances = M.Modal.init(elems, options);

  let elems_times = document.querySelectorAll(".item-ctimes");
  let elems_field = document.querySelectorAll(".field");

  let status_num = 0,
    before_num = 0;

  clearCountArea();

  for (let i = 0; i < elems_times.length; i++) {
    throwCoins(elems_times[i]);
  }

  for (let i = 0; i < 5; i++) {
    clickStatus(elements_array[i], status_array[i]);
  }

  for (let i = 0; i < elems.length; i++) {
    clickOK(elems[i]);
  }

  // judgeLongClick(count_area, function() {
  //   console.log("Long Tap!!!!");
  // });

  // Init count_area and coins_screen
  function clearCountArea() {
    count_area.addEventListener("click", function() {
      count_num = 0;
      count_area.innerText = count_num;
      coins_screen.innerText = "";
    }, false);
  }

  function clickStatus(element, status_element) {
    let clicked = [0];
    element.addEventListener("click", function() {
      if (!status_element.is_status) {
        const conflict_status = (status_sleep.is_status || status_paralysis.is_status || status_confusion.is_status) && !(status_element == status_poison || status_element == status_burn);
        const non_conflict_status = (status_element == status_poison || status_element == status_burn) || (!status_element.is_status);
        if (conflict_status) {
          status_num = getStatusNum(element);
          instances[status_num + 3].open();
        } else if (non_conflict_status) {
          status_num = getStatusNum(element);
          instances[status_num].open();
        }
      } else if (status_element.is_status) {
        judgeMultipleClicks(clicked, element, function() {
          console.log("single-click");
          instances[getStatusNum(element) + 8].open();
        }, function() {
          console.log("double-click");
          setDamage(elems_field[0], getDamageOfStatus(element));
        }, function() {
          console.log("triple-click");
        });
      }
    }, false);
  }

  function clickOK(modal_element) {
    modal_element.lastElementChild.lastElementChild.addEventListener("click", function() {
      status_num = getModalNum(modal_element);
      switch (modal_element.id) {
        case "modal-poison":
        case "modal-burn":
          changeStatus(status_array[status_num]);
          break;
        case "modal-sleep":
        case "modal-paralysis":
        case "modal-confusion":
          changeStatus(status_array[status_num]);
          before_num = status_num;
          break;
        case "modal-paralysis-interference":
        case "modal-sleep-interference":
        case "modal-confusion-interference":
          changeStatus(status_array[before_num]);
          changeStatus(status_array[status_num]);
          before_num = status_num;
          break;
        case "modal-poison-description":
        case "modal-burn-description":
        case "modal-sleep-description":
        case "modal-paralysis-description":
        case "modal-confusion-description":
          changeStatus(status_array[status_num])
          break;
      }
    }, false);
  }

  function setDamage(field_element, damage) {
    if (damage != null) {
      let tmp = parseInt(field_element.innerText);
      field_element.innerText = tmp + damage;
    }
  }

  function getDamageOfStatus(status_element) {
    switch (status_element.id) {
      case "poison":
        return 10;
      case "burn":
        return 20;
      case "confusion":
        return 30;
      default:
        return 0;
    }
  }

  function changeStatus(status_element) {
    if (!status_element.is_status && status_element.element.className.indexOf("disable-gray") != -1) {
      let temp = status_element.element.className.replace("disable-gray", "");
      status_element.element.className = temp;
      status_element.is_status = true;
    } else if (status_element.is_status) {
      status_element.element.className += "disable-gray";
      status_element.is_status = false;
    }
  }

  function throwCoins(element) {
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

  function judgeLongClick(element, func) {
    let timeout;
    element.addEventListener("touchstart", function(e) {
      e.preventDefault();
      console.log("do touchstart");
      timeout = setTimeout(function() {
        func();
      }, 500);
    }, false);
    element.addEventListener("touchend", function() {
      clearTimeout(timeout);
    }, false);

    element.addEventListener("mousedown", function() {
      console.log("do mousedown");
      timeout = setTimeout(function() {
        func();
      }, 500);
    }, false);
    element.addEventListener("mouseup", function() {
      clearTimeout(timeout);
    }, false);
  }

  function addEventsListener(element, events, func) {
    for (let i = 0; i < events.length; i++) {
      element.addEventListener(events[i], func, false);
    }
  }

  function judgeMultipleClicks(clicked, element, sfunc, dfunc, tfunc) {
    // 呼び出す前にclicked = [0]を宣言して、addEventListener("click", function(){ judgeMultipleClicks(clicked, element, ...) }, false);
    // setTimeoutを1回押された時にだけ呼んで、タイムアウトする前までに押された回数
    clicked[0] += 1;
    if (clicked[0] == 1 && clicked[0] != 100) {
      setTimeout(function() {
        switch (clicked[0]) {
          case 1:
            sfunc();
            break;
          case 2:
            dfunc();
            break;
          case 3:
            tfunc();
            break;
          // case 4:
          //   console.log("quadruple-click");
          //   break;
          // case 5:
          //   console.log("quintuple-click");
          //   break;
        }
        clicked[0] = 0;
      }, 300);
    }
  }

  function getModalNum(element) {
    switch (element.id) {
      case "modal-poison":
      case "modal-poison-description":
        return 0;
      case "modal-burn":
      case "modal-burn-description":
        return 1;
      case "modal-sleep":
      case "modal-sleep-interference":
      case "modal-sleep-description":
        return 2;
      case "modal-paralysis":
      case "modal-paralysis-interference":
      case "modal-paralysis-description":
        return 3;
      case "modal-confusion":
      case "modal-confusion-interference":
      case "modal-confusion-description":
        return 4;
    }
  }

  function getStatusNum(element) {
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


}, false);


// document.body.addEventListener で イベントを受け取るときは if (event.target.className.indexOf("times") != -1) で処理を分ける
// 参照渡ししたいときはオブジェクト(配列)を渡す
