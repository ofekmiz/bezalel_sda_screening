var dataJson = CSVJSON.csv2json(DATA);
console.log("dataJson", dataJson);

document.addEventListener("DOMContentLoaded", function () {

    var movieListContainer = document.getElementById("movieList");
    var mainContainer = document.getElementById("mainPage");
    var moviePage = document.getElementById("moviePage");

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
        <b class="autors">${authors}</b> | <span class="movieName">${movieName}</span>
    `
        movieListContainer.appendChild(movie);
    }

    //mark selected
    document.querySelector(`#movieList .movie[data-number="0"]`).classList.add("selected");
    var scrollIndex = 0;
    scrollToSelection();

    window.addEventListener("wheel", event => {
        const delta = Math.sign(event.deltaY);
        if (delta == 1) { //scroll Down
            scrollIndex = scrollIndex >= dataJson.length - 1 ? dataJson.length - 1 : scrollIndex + 1;
        } else if (delta == -1) {//scroll Up
            scrollIndex = scrollIndex <= 0 ? 0 : scrollIndex - 1;
        }
        scrollToSelection();
    });

    mainContainer.addEventListener('scroll', function (e) {
        scrollToSelection();
    }, false);

    function scrollToSelection() {
        var oldSelected = document.querySelector(".movie.selected");
        oldSelected.classList.remove("selected");
        var selected = document.querySelector(`#movieList .movie[data-number="${scrollIndex}"]`);
        selected.scrollIntoView(true);
        mainContainer.scrollBy(0,-100);
        selected.classList.add("selected");
    }

    //Click selected
    document.body.addEventListener('click', clickAnywhere, true); 
    
    var moviePageClosed = true;
    function clickAnywhere() {   
        if(moviePageClosed){
            updateMoviePage();
            moviePage.style.display = "grid";
            moviePageClosed = false;
        }else{
            moviePage.style.display = "none";
            moviePageClosed = true;
        }     
    }

    function updateMoviePage(){
        
    }
});

