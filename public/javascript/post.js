async function postFormHandler(e) {
    e.preventDefault();


    const title = document.querySelector('input[id="title"]').value.trim();
    const post_url = document.querySelector('input[id="post-url"]').value.trim();
    const post_info = document.querySelector('textarea[id="post-info"]').value.trim();

    console.log(title, post_url, post_info)

    if (title && post_url && post_info) {
        const response = await fetch('/api/posts', {
            method: 'post', 
            body: JSON.stringify({
                title,
                post_url,
                post_info
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













document.querySelector('.post-form').addEventListener('submit', postFormHandler)