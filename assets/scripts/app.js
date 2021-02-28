let tempAnimeList = [];
let currentAnimeList = [];
let topAnimePageCounter = 1;

getTopAnimeListFromServer();


function getTopAnimeListFromServer() {
    axios.get(`https://api.jikan.moe/v3/top/anime/${topAnimePageCounter}/upcoming`)
        .then(response => {
            if (response.data && response.data.top) {
                tempAnimeList = response.data.top;
                topAnimePageCounter++;

                prepareListForRendering();
            }
        })
        .catch(err => {
            console.error(err);
        })
}

function prepareListForRendering() {
    currentAnimeList = currentAnimeList.concat(tempAnimeList.splice(0, 10));

    console.log('Ожидают публикации', tempAnimeList);
    console.log('Опубликованы', currentAnimeList);

    renderCardsToContainer('topList', currentAnimeList);
}

function renderCardsToContainer(containerId, animeList) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = prepareCardMarkdown(animeList);
    } else {
        console.error('Разработчик, ну что же ты! Одумойся');    
    }
}

function prepareCardMarkdown(animeList) {
    let result = '';

    animeList.forEach(anime => {
        result += `
            <div class="col-3">
                <div class="card">
                  <img src="${anime.image_url}" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h5 class="card-title">${anime.title}</h5>
                    <a href="anime.html?animeId=${anime.mal_id}" class="btn btn-primary">Подробнее</a>
                  </div>
                </div>
            </div>
        `
    })

    return result;
}

function showMoreTopAnime() {
    if (!tempAnimeList.length) {
        axios.get(`https://api.jikan.moe/v3/top/anime/${topAnimePageCounter}/upcoming`)
            .then(response => {
                if (response.data && response.data.top) {
                    tempAnimeList = response.data.top;
                    topAnimePageCounter++;

                    prepareListForRendering();
                }
            })
            .catch(err => {
                const showMoreButton = document.getElementById('showMoreTopAnimeButton');
                if (showMoreButton) {
                    alert('Упс, мы достигли предела — больше инфы пока нет!')
                    showMoreButton.remove();
                }
            })
    } else {
        prepareListForRendering();
    }
}
