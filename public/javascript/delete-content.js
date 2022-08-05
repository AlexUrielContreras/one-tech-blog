async function deletePostHandler() {

    const id = window.location.toString().trim('/')[window.location.toString().trim('/').length - 1]


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