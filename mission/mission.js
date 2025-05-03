let selectElm = document.querySelector('#select');
let logo = document.querySelector('#logo');

selectElm.addEventListener('change', changeTheme);

function changeTheme() {
    let selectedValue = selectElm.value;
    if (selectedValue === 'dark') {
        document.body.classList.add('dark-theme');
        logo.src = 'byui-logo_white.png';
    } else if (selectedValue === 'light') {
        document.body.classList.remove('dark-theme');
        logo.src = 'byui-logo_blue.webp';
    }
}
