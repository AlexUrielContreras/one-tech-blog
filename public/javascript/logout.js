async function logout() {
    
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        }
    }) 

    if (response.ok) {
        document.location.reload()
    } else {
        alert(response.statusText)
    }
    
}



document.querySelector('.logout-btn').addEventListener('click', logout);