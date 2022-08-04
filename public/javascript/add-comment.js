async function addComment() {

    const comment_text = document.getElementById('post-comment').value.trim();
    const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1]
   

    if (comment_text && post_id) {
        const response = await fetch('/api/comments', {
            method: 'post',
            body: JSON.stringify({
                comment_text,
                post_id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.ok){
            document.location.reload()
        } else {
            alert(response.statusText)
        }
    }
}













document.querySelector('button[id="comment-btn"]').addEventListener('click', addComment)