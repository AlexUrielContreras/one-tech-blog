async function loginFormHandler(e) {
    e.preventDefault();

    const email = document.querySelector('#login-email').value.trim();
    const password = document.querySelector('#login-password').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email, 
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace('/')
        } else {
            alert(response.statusText);
            document.location.reload();
        }
    }
    
}













document.querySelector('.login-form').addEventListener('submit', loginFormHandler)