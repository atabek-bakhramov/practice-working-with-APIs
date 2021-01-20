const urlBatmanBegins = 'http://www.omdbapi.com/?t=Batman+begins&apikey=2c7bacb2';
const urlTheDarkKnight = 'http://www.omdbapi.com/?t=The+Dark+Knight&apikey=2c7bacb2';
const urlDarkKnightRises = 'http://www.omdbapi.com/?t=Dark+Knight+Rises&apikey=2c7bacb2';

const { body } = document;
const select = document.createElement('select');
body.appendChild(select);
const movieInfoHolder = document.createElement('div');
body.appendChild(movieInfoHolder);
const chooseOption = document.createElement('option');
chooseOption.innerText = '--Choose a movie--';
chooseOption.disabled = true;
chooseOption.selected = true;
select.appendChild(chooseOption);

async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

createOption(urlBatmanBegins);
createOption(urlTheDarkKnight);
createOption(urlDarkKnightRises);

async function createOption(url) {
    const data = await fetchData(url);
    const option = document.createElement('option');
    option.innerText = data.Title;
    option.value = data.Title;
    select.appendChild(option);
    console.log(option);
}

async function optionChosen(event) {
    let data;
    if (event.target.value === 'Batman Begins') {
        data = await fetchData(urlBatmanBegins);
    }
    if (event.target.value === 'The Dark Knight') {
        data = await fetchData(urlTheDarkKnight);
    }
    if (event.target.value === 'The Dark Knight Rises') {
        data = await fetchData(urlDarkKnightRises);
    }
    displayInfo(data);
}

function displayInfo(data) {
    movieInfoHolder.innerText = '';
    const img = document.createElement('img');
    img.src = data.Poster;
    movieInfoHolder.appendChild(img);
    const title = document.createElement('h1');
    title.textContent = data.Title;
    movieInfoHolder.appendChild(title);
    const movieInfo = document.createElement('p');
    movieInfo.textContent = data.Plot;
    movieInfoHolder.appendChild(movieInfo);
}

select.addEventListener('change', optionChosen);
