let interval = null;

console.log('%cBackground.js started.', 'color: #e8ffb7; font-size: 14px; font-weight: bold;');


chrome.commands.onCommand.addListener((command) => {

    if (command === 'toggle') {
        if (interval === null) {
            start();
            console.log('Turned on');
        }
        else {
            clear();
            console.log('Turned off');
        }


    }

})



async function start() {

    const speed = await getSpeedStorage();
    const url = await getUrlStorage();

    const urlFromStorage = url.link;
    const speedFromStorage = speed.speed || 1000;

    if (urlFromStorage !== undefined) {

        console.log(`Starting interval: ${speedFromStorage} ms.`);

        const tabCreated = chrome.tabs.create({ 'url': urlFromStorage });

        interval = setInterval(() => {
            tabCreated.then((tab) => {

                chrome.tabs.update(tab.id, {
                    'url': urlFromStorage
                }).then((result) => {
                    let id = getId(urlFromStorage);
                    if (result.url.includes(id)) {
                        console.log('Product id: ' + id);
                        clear();
                    }

                }).catch((error) => {
                    clear();
                    console.log('Forcibly disabled. Tab was closed.');
                    console.log(error);
                });
            }).catch((error) => {
                clear();
                console.log('Forcibly disabled. Error with created tab.');
                console.log(error);
            });

            console.log('%cInterval counter', 'color: #e8ffb7; font-size: 14px; font-weight: bold;');

        }, speedFromStorage);
    }





}

function clear() {
    clearInterval(interval);
    interval = null;
}


function getId(url_str) {

    let url = new URL(url_str);
    let search_params = url.searchParams;


    return search_params.get('id');
}


function getSpeedStorage() {
    let speed = chrome.storage.sync.get('speed')
    return speed;
}

function getUrlStorage() {
    let url = chrome.storage.sync.get('link')
    return url;
}