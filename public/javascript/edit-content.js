async function editFormHandler(e) {
    e.preventDefault();

    const title = document.getElementById('edit-title').value.trim();
    const post_url = document.getElementById('edit-url').value.trim();
    const post_info = document.getElementById('edit-info').value.trim();
    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1]

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title, 
            post_url,
            post_info
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        window.location.replace('/')
    } else {
        alert(response.statusText)
    }
} 






















document.querySelector('.edit-form').addEventListener('submit', editFormHandler)