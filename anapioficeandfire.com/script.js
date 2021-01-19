import houseIdList from './data.js';

const houseUrl = 'https://anapioficeandfire.com/api/houses/';

const { body } = document;
const button = document.getElementById('kill-random-lord-button');

async function runMain(url, array) {
    await Promise.all(array.map(async userId => {
        const houseNameResult = await fetchData(url, userId);
        // console.log(houseNameResult);
        const { container } = createContainer();
        createHouse(houseNameResult.name, container);
        if (houseNameResult.currentLord !== '') {
            const lordNameResult = await fetchData(houseNameResult.currentLord);
            createLord(lordNameResult.name, userId, container);
        } else {
            const lordNameResult = await fetchData(houseNameResult.founder);
            createLord(lordNameResult.name, userId, container);
        }
    }));
}

runMain(houseUrl, houseIdList);

async function fetchData(url, userId = '') {
    const response = await fetch(`${url}${userId}`);
    const user = await response.json();
    return user;
}

function createContainer() {
    const container = document.createElement('div');
    container.classList.add('got-house');
    body.appendChild(container);
    return {
        container
    }
}

function createHouse(houseName, container) {
    const houseTitle = document.createElement('h1');
    houseTitle.classList.add('got-house__houseTitle');
    houseTitle.textContent = houseName;
    container.appendChild(houseTitle);
}

function createLord(lordName, houseId, container) {
    const spanLord = document.createElement('span');
    spanLord.classList.add('got-house__current-lord');
    spanLord.textContent = lordName;
    spanLord.id = houseId;
    container.appendChild(spanLord);
}

button.addEventListener('click', async function () {
    const randomIndex = getRandomNumber(houseIdList);
    const randomHouseId = houseIdList[randomIndex];
    const houseLink = await fetchData(houseUrl, randomHouseId);
    const swornMembersList = houseLink.swornMembers;
    const randomIndexOfMembers = getRandomNumber(swornMembersList);
    const randomSwornMemberLink = swornMembersList[randomIndexOfMembers];
    const nameOfSwornMember = await fetchData(randomSwornMemberLink);
    const lordHolder = document.getElementById(randomHouseId);
    lordHolder.innerText = nameOfSwornMember.name;
})

function getRandomNumber(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return randomIndex;
}