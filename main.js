document.addEventListener("DOMContentLoaded", function () {
    var dataJson = CSVJSON.csv2json(DATA);
    console.log("DATA",dataJson);

    var movieListContainer = document.getElementById("movieList");

    //append movies to list
    for (var i = 1; i < dataJson.length; i++) {
        let authors = dataJson[i].authors;
        let movieName = dataJson[i].hebMovieName;

        let movie = document.createElement("div");
        movie.classList.add("movie");
        movie.innerHTML = /*html*/ `
        <b class="autors">${authors}</b> | <span class="movieName">${movieName}</span>
    `
        movieListContainer.appendChild(movie);
    }
});