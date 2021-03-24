console.log('client side js lololol');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#msg-1');
const messageTwo = document.querySelector('#msg-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    const url = 'http://localhost:3000/weather?address=' + encodeURIComponent(location);

    messageOne.textContent = 'Loading result...';
    messageTwo.textContent = '';

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });
});