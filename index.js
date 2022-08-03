chrome.storage.sync.get('link').then((result) => {
    const id = getId(result.link);

    console.log(`Target id: ${id}`);
    console.log(`Target url: ${window.location.href}`);

    if (window.location.href.includes(id)) {
        let button = document.querySelector('button.btn.btn-big-icon-inline.btn-green');

        if (button !== null) {
            button.click();
            window.open('https://pigu.lt/lt/cart', '_self');
        }
    }


});



function getId(url_str) {

    let url = new URL(url_str);
    let search_params = url.searchParams;


    return search_params.get('id');
}








