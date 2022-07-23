let date = new Date();

let renderCalender = () => {
    // set month
    document.querySelector('#month').value = date.getMonth();

    if (localStorage.getItem('data') === null) {
        localStorage.setItem('data', JSON.stringify([]));
    }
    let allData = JSON.parse(localStorage.getItem('data'));
    console.log(allData);

    // first empty date
    let firstEmptyDate = date.getDay();
    if (firstEmptyDate === 0) {
        firstEmptyDate = 7;
    }

    // last day
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    //set date
    days = '';

    // input empty date
    for (let x = 1; x < firstEmptyDate; x++) {
        days += `<div><span></span></div>`;
        document.querySelector('.dates').innerHTML = days;
    }

    // input valid date
    for (let i = 1; i <= lastDay; i++) {
        days += `<div>
                    <span>${i}</span>
                    <div class="appointment-list">
                        ${allData
                            .sort((a, b) => {
                                return b.time.localeCompare(a.time);
                            })
                            .map((v, index) => {
                                if (
                                    (v.date.split('-').slice(2, 3) == i) &
                                    (v.date.split('-').slice(1, 2) == date.getMonth() + 1)
                                ) {
                                    console.log(i);
                                    return `<span class="every-user" data-firstName="${v.firstName}" data-lastName="${v.lastName}" data-email="${v.email}" data-gender="${v.gender}" data-age="${v.age}" data-date="${v.date}" data-time="${v.time}" onclick="dataattr(this)">${v.firstName} ${v.lastName}</span>`;
                                }
                                return;
                            })
                            .join(' ')}
                    </div>
                </div>`;
        document.querySelector('.dates').innerHTML = days;
    }
};

// set month
document.querySelector('#month').addEventListener('change', () => {
    let c = document.getElementById('month').value;
    date.setMonth(c);
    renderCalender();
});

renderCalender();

// for modal
let create = document.getElementById('create');
create.addEventListener('click', () => {
    document.querySelector('.modal-bg').classList.add('modal-display');
});

let modalClose = document.getElementById('close-modal');
modalClose.addEventListener('click', () => {
    document.querySelector('.modal-bg').classList.remove('modal-display');
});

// set value in localstorage
document.getElementById('submit').addEventListener('click', () => {
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    let gender = document.getElementById('gender').value;
    let age = document.getElementById('age').value;
    let date = document.getElementById('date').value;
    let time = document.getElementById('time').value;

    let data = { firstName, lastName, email, gender, age, date, time };

    //save in localstorage
    if (localStorage.getItem('data') === null) {
        localStorage.setItem('data', JSON.stringify([]));
    }

    let oldData = JSON.parse(localStorage.getItem('data'));
    let newData = [...oldData, { ...data }];

    localStorage.setItem('data', JSON.stringify(newData));

    //close
    document.querySelector('.modal-bg').classList.remove('modal-display');

    renderCalender();
});

function dataattr(e) {
    data = `<div class="user-data">
        <span id="user-cross" onclick="stop()" >x</span>
        <p><b>First Name:</b> ${e.getAttribute('data-firstName')}</p>
        <p><b>Last Name:</b> ${e.getAttribute('data-lastName')}</p>
        <p><b>email:</b> ${e.getAttribute('data-email')}</p>
        <p><b>Gender:</b> ${e.getAttribute('data-gender')}</p>
        <p><b>Age:</b> ${e.getAttribute('data-age')}</p>
        <p><b>Date:</b> ${e.getAttribute('data-date')}</p>
        <p><b>Time:</b> ${e.getAttribute('data-time')}</p>
    </div>`;

    document.querySelector('.user-modal').innerHTML = data;
}

function stop() {
    document.querySelector('.user-modal').innerHTML = '';
}
