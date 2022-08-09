async function deletePostHandler() {

    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1]

    const response = await fetch(`/api/posts/${id}`, {
        method: 'delete'
    })

    if (response.ok){
        document.location.replace('/')
    } else {
        alert(response.statusText)
    }
    
}










document.querySelector('button[id="delete-post-btn"]').addEventListener('click', deletePostHandler)