//---------------OPTIONS---------------
// keyboard keys: https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values#modifier_keys
const DOWN_KEYS = ["ArrowDown", "s", "Decimal"];
const UP_KEYS = ["ArrowUp", "w", "3"];
const ENTER_KEYS = ["Enter", " "];
const HIDE_MOUSE_TIMEOUT = 5000;
const AUTO_SCROLL_TIMEOUT = 5000;
const BACK_TO_MENU_TIMEOUT = 20000;
const AUTO_SCROLL = true;
let disable_mouse = false;
let autoScrollTimeout;
let backToMenuTimeout;
let scrollIndex = 0;
let mouseTimeout = setTimeout(() => {
  disable_mouse = true;
  document.body.classList.add("noCursor");
}, HIDE_MOUSE_TIMEOUT);
//-------------------------------------

var dataJson = CSVJSON.csv2json(DATA);
console.log("dataJson", dataJson);
console.log("15:24");

document.addEventListener("DOMContentLoaded", function () {
  var movieListContainer = document.getElementById("movieList");
  var mainContainer = document.getElementById("mainPage");
  var moviePage = document.getElementById("moviePage");

  //Hide mouse if doesn't move
  document.addEventListener("mousemove", (e) => {
    hideMouseTimer();
  });
  document.addEventListener("click", (e) => {
    hideMouseTimer();
  });

  setInterval(autoScroll, AUTO_SCROLL_TIMEOUT);

  //hide moviePage
  moviePage.style.display = "none";

  //append movies to list
  for (var i = 0; i < dataJson.length; i++) {
    let authors = dataJson[i].authors;
    let movieName = dataJson[i].hebMovieName;

    let movie = document.createElement("div");
    movie.classList.add("movie");
    movie.setAttribute("data-number", i);
    movie.innerHTML = /*html*/ `
        <b class="autors">${authors}</b>&nbsp;&nbsp;|&nbsp;&nbsp;<span class="movieName">${movieName}</span>
    `;
    movieListContainer.appendChild(movie);
  }

  //Mark selected
  document
    .querySelector(`#movieList .movie[data-number="0"]`)
    .classList.add("selected");
  scrollToSelection();
  updateImage();

  //Keyboard control
  window.addEventListener("keydown", (event) => {
    if (UP_KEYS.includes(event.key)) {
      decreaseScrollIndex();
      scrollToSelection();
      updateImage();
      hideMouseTimer();
    }
    if (DOWN_KEYS.includes(event.key)) {
      increaseScrollIndex();
      scrollToSelection();
      updateImage();
      hideMouseTimer();
    }
    if (ENTER_KEYS.includes(event.key)) {
      toggleMoviePage();
    }
  });

  function hideMouseTimer() {
    clearTimeout(mouseTimeout);
    disable_mouse = false;
    document.body.classList.remove("noCursor");
    mouseTimeout = setTimeout(() => {
      disable_mouse = true;
      document.body.classList.add("noCursor");
    }, HIDE_MOUSE_TIMEOUT);
  }

  function scrollToSelection() {
    var oldSelected = document.querySelector(".movie.selected");
    if (oldSelected) oldSelected.classList.remove("selected");
    var selected = document.querySelector(
      `#movieList .movie[data-number="${scrollIndex}"]`
    );
    if (selected) {
      selected.classList.add("selected");
      var threshold = Math.floor(dataJson.length / 3);
      if (scrollIndex < threshold) {
        selected.scrollIntoView(true);
        mainContainer.scrollBy(0, -150);
      } else {
        selected.scrollIntoView(true);
        mainContainer.scrollBy(0, threshold - 150);
      }
    }
  }

  function selectIndex(index) {
    scrollIndex = parseInt(index);
    var oldSelected = document.querySelector(".movie.selected");
    if (oldSelected) oldSelected.classList.remove("selected");
    var selected = document.querySelector(
      `#movieList .movie[data-number="${scrollIndex}"]`
    );
    if (selected) {
      selected.classList.add("selected");
      updateImage();
    }
  }

  function updateImage() {
    var imageMovie = document.getElementById("imageMovie");
    var imageName = dataJson[scrollIndex].imageName;
    imageMovie.setAttribute("src", "resources/images/" + imageName);
    updateQuickInfo();
  }

  function increaseScrollIndex() {
    scrollIndex =
      scrollIndex >= dataJson.length - 1
        ? dataJson.length - 1
        : scrollIndex + 1;
  }

  function decreaseScrollIndex() {
    scrollIndex = scrollIndex <= 0 ? 0 : scrollIndex - 1;
  }
  if (isTouchDevice()) {
    console.log("is touch screen");
    //Touch selected
    document
      .querySelector("#moviePage")
      .addEventListener("click", toggleMoviePage, true);
    document
      .querySelector("#quickInfo")
      .addEventListener("click", toggleMoviePage, true);
    document.querySelectorAll(".movie").forEach((clickable) => {
      clickable.addEventListener(
        "click",
        (e) => {
          if (e.target.classList.contains("selected")) {
            toggleMoviePage();
          } else {
            index = e.target.getAttribute("data-number");
            if (!disable_mouse) {
              selectIndex(index);
            }
          }
        },
        true
      );
    });
  } else {
    //Click selected
    document
      .querySelector("#moviePage")
      .addEventListener("click", toggleMoviePage, true);
    document
      .querySelector("#quickInfo")
      .addEventListener("click", toggleMoviePage, true);
    document.querySelectorAll(".movie").forEach((clickable) => {
      clickable.addEventListener(
        "click",
        (e) => {
          if (e.target.classList.contains("selected")) toggleMoviePage();
        },
        true
      );
    });

    //Select on hover
    document.querySelectorAll(".movie").forEach((clickable) => {
      clickable.addEventListener(
        "mouseover",
        (e) => {
          index = e.target.getAttribute("data-number");
          if (!disable_mouse) {
            selectIndex(index);
          }
        },
        true
      );
    });
  }

  var moviePageClosed = true;
  function toggleMoviePage() {
    clearTimeout(backToMenuTimeout);
    if (moviePageClosed) {
      updateMoviePage();
      moviePage.style.display = "grid";
      moviePageClosed = false;
      backToMenuTimeout = setTimeout(() => {
        toggleMoviePage();
      }, BACK_TO_MENU_TIMEOUT);
    } else {
      moviePage.style.display = "none";
      moviePageClosed = true;
      selectIndex(0);
      scrollToSelection();
    }
  }

  function updateQuickInfo() {
    var movieScreeningRoom = document.getElementById("quickInfoRoom");
    var screenGroupTitle = document.getElementById("quickInfoGroup");
    movieScreeningRoom.innerHTML = dataJson[scrollIndex].screenRoom;
    if (dataJson[scrollIndex].group) {
      screenGroupTitle.innerHTML = "באודיטוריום " + dataJson[scrollIndex].group;
    } else {
      screenGroupTitle.innerHTML = "";
    }
  }

  function updateMoviePage() {
    var movieTitle = document.getElementById("movieTitle");
    var movieType = document.getElementById("type");
    var movieAuthors = document.getElementById("authors");
    var movieScreeningRoom = document.getElementById("screeningRoom");
    var screenGroupTitle = document.getElementById("screenGroupTitle");
    var screenGroupList = document.getElementById("screenGroup");
    var screenInfoContainer = document.getElementById("screeningInfo");
    screenGroupList.innerHTML = "";

    movieTitle.innerHTML = dataJson[scrollIndex].hebMovieName;
    movieType.innerHTML =
      dataJson[scrollIndex].type + " " + dataJson[scrollIndex].tecnique;
    movieAuthors.innerHTML = dataJson[scrollIndex].authors;
    movieScreeningRoom.innerHTML = dataJson[scrollIndex].screenRoom;
    screenGroupTitle.innerHTML = dataJson[scrollIndex].group;

    if (!dataJson[scrollIndex].group || dataJson[scrollIndex].group == "") {
      screenInfoContainer.style.display = "none";
    } else {
      screenInfoContainer.style.display = "block";
    }

    //screening group
    var screenGroup = getOrderedScreeningGroup(dataJson[scrollIndex].group);
    for (const movie of screenGroup) {
      var startTimes = movie.startTime.join("&nbsp;|&nbsp;");
      var movieObj = document.createElement("div");
      movieObj.classList.add("movieScreenTime");
      if (dataJson[scrollIndex].order == movie.order) {
        movieObj.classList.add("selected");
      }
      movieObj.innerHTML = `<span class="time">${startTimes}</span>${movie.authors} &nbsp;|&nbsp; ${movie.hebMovieName}`;
      screenGroupList.append(movieObj);
    }

    //update image
    var imageMovie = document.getElementById("imageMovie2");
    var imageName = dataJson[scrollIndex].imageName;
    imageMovie.setAttribute("src", "resources/images/" + imageName);
  }

  /** return array of {groupName:"Name",indexes:[1,3,5,...]}
   * with the indexes in dataJson of all the movies of the same group
   **/
  function getScreeningGroups() {
    var grps = [{ groupName: dataJson[0].group, indexes: [] }];
    var isInGrp = 0;
    for (var i = 0; i < dataJson.length; i++) {
      var mov = dataJson[i].group;
      isInGrp = 0;

      for (var j = 0; j < grps.length; j++) {
        if (grps[j].groupName == mov) {
          if (grps[j].indexes.includes(i) == false) {
            grps[j].indexes.push(i);
            isInGrp = 1;
          }
        } else {
          if (j == grps.length - 1) {
            var newitem = { groupName: mov, indexes: [] };
            newitem.indexes.push(i);

            grps.push(newitem);
          }
        }
      }
    }
    return grps;
  }

  // returns ordered screening group with movies startTime
  function getOrderedScreeningGroup(groupName) {
    var orderedGroupMovies = [];
    //get group indexes
    var groups = getScreeningGroups();
    var indexes = [];
    for (const group of groups) {
      if (group.groupName == groupName) {
        indexes = group.indexes;
        break;
      }
    }

    //collect movies in group with start times
    var times = groupName.split("|").slice(0, -1);
    for (const i of indexes) {
      dataJson[i].startTime = times;
      var newTimes = [];
      for (var j = 0; j < times.length; j++) {
        startHour = times[j].toString().split(":")[0];
        startMinutes = parseInt(times[j].toString().split(":")[1]);
        movieLenMinutes = parseInt(dataJson[i].length.toString().split(":")[0]);

        if (startMinutes + movieLenMinutes >= 60) {
          startMinutes = movieLenMinutes - (60 - startMinutes);
          startHour = parseInt(startHour) + 1;
        } else {
          startMinutes = startMinutes + movieLenMinutes;
        }

        var startTime = startHour + ":" + zeroPadding(startMinutes);
        newTimes.push(startTime.replace(/\s/g, "")); // remove spaces
      }
      times = newTimes;
      orderedGroupMovies.push(dataJson[i]);
    }

    //sort by order
    orderedGroupMovies.sort(function (first, second) {
      if (parseInt(first.order) > parseInt(second.order)) {
        return 1;
      }
      if (parseInt(first.order) < parseInt(second.order)) {
        return -1;
      }
      return 0;
    });

    return orderedGroupMovies;
  }

  function zeroPadding(num) {
    if (num < 10) {
      num = "0" + num.toString();
    }
    return num;
  }

  function autoScroll() {
    if (!isTouchDevice() && AUTO_SCROLL && disable_mouse) {
      if (scrollIndex < dataJson.length - 1) {
        increaseScrollIndex();
      } else {
        scrollIndex = 0;
      }
      scrollToSelection();
      updateImage();
    }
  }
});

function isTouchDevice() {
  return window.ontouchstart !== undefined;
}
