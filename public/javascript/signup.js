async function signupFormHandler(e) {
    e.preventDefault();

    const username = document.querySelector('#signup-username').value.trim();
    const email = document.querySelector('#signup-email').value.trim();
    const password = document.querySelector('#signup-password').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/users/', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }

}

function customError() {
    const pwError = document.querySelector('#signup-password')

    console.log(pwError.validity)
   
    if(pwError.validity.tooShort || pwError.validity.valueMissing) {
        pwError.setCustomValidity('Password must be 4-20 Characters')
    } else {
        pwError.setCustomValidity('')
    }
}


document.querySelector('#signup-password').addEventListener('input', customError);
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);