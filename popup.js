// ELEMENTS
const buttonSave = document.querySelector('#save');
// const buttonStart = document.querySelector('#start');
const textBox = document.querySelector('#input');
const statusLabel = document.querySelector('#statusLabel');
const rangeSlider = document.querySelector('#rangeSlider');
const speedLabel = document.querySelector('#speedLabel');


// SAVE BUTTON
buttonSave.addEventListener('click', function () {
    const link = textBox.value;
    chrome.storage.sync.set({ 'link': link }, () => {
        console.log('Settings saved');
        statusLabel.innerHTML = 'Settings saved';
    });
    chrome.storage.sync.set({ 'speed': rangeSlider.value });

});



// // START BUTTON
// buttonStart.addEventListener('click', () => {
//     chrome.storage.sync.get('link', async (result) => {
//         const activeTab = await getActiveTabURL();
//         chrome.runtime.sendMessage({ type: "START", link: result.link });
//         statusLabel.innerHTML = 'Extension started';
//     });
// });




// RANGE SLIDER
rangeSlider.addEventListener('input', function () {
    speedLabel.innerHTML = `⚡ ${rangeSlider.value} ms<br>`;
});



// DOM CONTENT LOADED
document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get(['link'], function (result) {
        console.log(`Settings loaded ${result.link}`);
        textBox.value = result.link;
    });

    chrome.storage.sync.get(['speed'], (result) => {
        rangeSlider.value = result.speed;
        speedLabel.innerHTML = `⚡ ${rangeSlider.value} ms<br>`;
    });

});




// FUNCTIONS
async function getActiveTabURL() {
    const tabs = await chrome.tabs.query({
        currentWindow: true,
        active: true
    });

    return tabs[0];
}









