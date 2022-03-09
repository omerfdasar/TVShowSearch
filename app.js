const form = document.querySelector("#searchForm");
const inputbox = document.querySelector("#searchbox");
const cards = document.querySelector(".row");
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  cards.innerHTML = "";
  const searchTerm = inputbox.value;
  inputbox.value = "";
  const config = { params: { q: searchTerm } };
  const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
  console.log(res.data[0].show.name);
  console.log(res.data[0]);
  console.log(res.data[0].score);
  makeImages(res.data);
});

const makeImages = (shows) => {
  for (let result of shows) {
    if (result.show.image) {
      image = result.show.image.medium;
    }
    showName = result.show.name;
    genres = result.show.genres;
    type = result.show.type;
    language = result.show.language;
    officialSite = result.show.officialSite;
    score = result.score;
    premier = result.show.premiered;
    html = `<div class="card col-1" >
    <img src="${image}" class="card-img-top" alt="filmPhoto" />
      <div class="card-body">
        <h4 class="card-title"> ${showName}</h4>
        <p class="card-text">
          ${genres}
        </p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Premiered: ${premier}</li>
        <li class="list-group-item">Language: ${language} </li>
        <li class="list-group-item">Type: ${type}</li>
      </ul>
      <div class="card-body">
      <a href="${officialSite}" class="card-link">Official Site</a>
      <a>      Score: ${(score * 100).toFixed(0)} </a>
    </div>
    </div>`;
    cards.innerHTML += html;
  }
};

/*
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    const config = { params: { q: searchTerm } }
    const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
    makeImages(res.data)
    form.elements.query.value = '';
})

const makeImages = (shows) => {
    for (let result of shows) {
        if (result.show.image) {
            const img = document.createElement('IMG');
            img.src = result.show.image.medium;
            document.body.append(img)
        }
    }
} */
