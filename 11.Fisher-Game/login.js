document.querySelector('#register').addEventListener('submit', onRegisterSumbit);
document.querySelector('#login').addEventListener('submit', onLoginSubmit);


async function onRegisterSumbit(ev) {
    ev.preventDefault();
    const url = 'http://localhost:3030/users/register'

    const formData = new FormData(ev.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const repass = formData.get('rePass');

    if (email == '' || password == '') {
        return alert('All fields are required!');
    } else if (password != repass) {
        return alert('Passwords don\'t match!');
    }

    const response = await fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if (response.ok == false) {
        const error = await response.json();
        return alert(error.message);
    }

    const data = await response.json();
    sessionStorage.setItem('userToken', data.accessToken)

    email.value = '';
    password.value = '';
    repass.value = '';

}


async function onLoginSubmit(ev) {
    ev.preventDefault();
    const url = 'http://localhost:3030/users/login';

    const formData = new FormData(ev.target);
    const email = formData.get('email');
    const password = formData.get('password');

    const response = await fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if (response.ok == false) {
        const error = await response.json();
        return alert(error.message);
    }

    const data = await response.json();
    sessionStorage.setItem('userToken', data.accessToken);
    sessionStorage.setItem('userId', data._id);
    window.location.pathname = 'index.html';

    email.value = '';
    password.value = '';

}