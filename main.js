var dataJson = CSVJSON.csv2json(DATA);
console.log("dataJson", dataJson);

document.addEventListener("DOMContentLoaded", function () {

    var movieListContainer = document.getElementById("movieList");
    var mainContainer = document.getElementById("mainPage");
    var moviePage = document.getElementById("moviePage");
    var scrollIndex = 0;

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

    //Mark selected
    document.querySelector(`#movieList .movie[data-number="0"]`).classList.add("selected");
    scrollToSelection();

    window.addEventListener("wheel", event => {
        const delta = Math.sign(event.deltaY);
        if (delta == 1) { //scroll Down
            scrollIndex = scrollIndex >= dataJson.length - 1 ? dataJson.length - 1 : scrollIndex + 1;
        } else if (delta == -1) {//scroll Up
            scrollIndex = scrollIndex <= 0 ? 0 : scrollIndex - 1;
        }
        scrollToSelection();
        updateImage();
    });

    mainContainer.addEventListener('scroll', function (e) {
        scrollToSelection();
    }, false);

    function scrollToSelection() {
        var oldSelected = document.querySelector(".movie.selected");
        oldSelected.classList.remove("selected");
        var selected = document.querySelector(`#movieList .movie[data-number="${scrollIndex}"]`);
        selected.classList.add("selected");
        var threshold = Math.floor(dataJson.length / 3)
        if (scrollIndex < threshold) {
            selected.scrollIntoView(true);
            mainContainer.scrollBy(0, -100);
        } else {
            selected.scrollIntoView(true);
            mainContainer.scrollBy(0, threshold - 110);
        }
    }

    function updateImage() {
        var imageMovie = document.getElementById("imageMovie");
        var imageName = dataJson[scrollIndex].imageName;
        imageMovie.setAttribute("src", "resources/images/" + imageName);
    }

    //Click selected
    document.body.addEventListener('click', clickAnywhere, true);

    var moviePageClosed = true;
    function clickAnywhere() {
        if (moviePageClosed) {
            updateMoviePage();
            moviePage.style.display = "grid";
            moviePageClosed = false;
        } else {
            moviePage.style.display = "none";
            moviePageClosed = true;
        }
    }


    function updateMoviePage() {
        var movieTitle = document.getElementById("movieTitle");
        var movieType = document.getElementById("type");
        var movieAuthors = document.getElementById("authors");
        var movieScreeningRoom = document.getElementById("screeningRoom");
        var screenGroupTitle = document.getElementById("screenGroupTitle");
        var screenGroupList = document.getElementById("screenGroup");

        movieTitle.innerHTML = dataJson[scrollIndex].hebMovieName;
        movieType.innerHTML = dataJson[scrollIndex].type + " " + dataJson[scrollIndex].tecnique;
        movieAuthors.innerHTML = dataJson[scrollIndex].authors;
        movieScreeningRoom.innerHTML = "הקרנה " + dataJson[scrollIndex].screenRoom;
        screenGroupTitle.innerHTML = dataJson[scrollIndex].group;
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
    }
});

