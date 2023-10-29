async function getUsers() {
    try {
        const response = await fetch(
            'http://localhost:3000',
            {
                method: 'GET',
            },
        );

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}


getUsers().then(data => {
    console.log(data);

    const div = document.createElement('div');

    div.style.fontSize = '22px';
    div.style.marginTop = '35px';

    data.forEach(user => {

        const child = document.createElement('div');
        child.id = 'child_block'

        const name = document.createElement('p');
        name.innerHTML = user.name;
        name.id = `name`

        const email = document.createElement('p');
        email.innerHTML =  `<img src="photo/email.png" height="36px" alt=""> ${user.email}`;
        email.id = `email`

        const phone = document.createElement('p');
        phone.innerHTML =  `<img src="photo/phone.png" height="36px" alt=""> ${user.phone}`;
        phone.id = `phone`

        const popup__bg = document.createElement('p');
        popup__bg.className = 'popup__bg';
        const pop_up = document.createElement('p');
        pop_up.className = 'popup';

        const cross = document.createElement('img')
        cross.className = 'close-popup';
        cross.src = 'photo/cross.png';
        cross.style.width = '25px';
        cross.style.height = '25px';

        const open_popup = document.createElement('a');
        open_popup.className = 'open-popup';
        open_popup.href = '#';
        open_popup.style.width = '100%';
        open_popup.style.height = '100%';


        pop_up.append(...[cross, name, phone, email]);
        popup__bg.append(pop_up);

        child.append(...[popup__bg, open_popup, name, phone, email]);
        div.append(child);

    });

    const container = document.getElementById('container');
    container.appendChild(div);
});

function Search_User() {
    let input = document.querySelector('input');
    getUsers().then(data => {
        data.forEach(user => {
            if (user.name === input.value){
                console.log(user.name);
            }
        });
    });
}

let popupBg = document.querySelector('.popup__bg');
let popup = document.querySelector('.popup');
let openPopupButtons = document.querySelectorAll('.open-popup');
let closePopupButton = document.querySelector('.close-popup');

openPopupButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        popupBg.classList.add('active');
        popup.classList.add('active');
    })
});

closePopupButton.addEventListener('click',() => {
    popupBg.classList.remove('active');
    popup.classList.remove('active');
});

document.addEventListener('click', (e) => {
    if(e.target === popupBg) {
        popupBg.classList.remove('active');
        popup.classList.remove('active');
    }
});