function attachEvents() {

    const loadPostsBtn = document.getElementById('btnLoadPosts');
    const viewPostBtn = document.getElementById('btnViewPost');
    const postsMenu = document.getElementById('posts');
    let ulBody = document.getElementById('post-body');
    let commentField = document.getElementById('post-comments')

    let baseUrl = `http://localhost:3030/jsonstore/blog/`;



    loadPostsBtn.addEventListener('click', () => {
        fetch(baseUrl + "posts").then((res) => res.json()).then((posts) => {
            Object.values(posts).forEach(post => {

                let option = document.createElement('option');
                option.value = post.id;
                option.textContent = post.title;
                postsMenu.appendChild(option);

            });
        })


    });


    viewPostBtn.addEventListener('click', () => {
        commentField.innerHTML = '';
        let postId = document.getElementById('posts').value;
         let firstPromise =  fetch(baseUrl + `posts/${postId}`).then((res) => res.json()).then((postInfo) => {
            ulBody.textContent = postInfo.body;

        })
        let secondPromise = fetch(baseUrl + `comments`).then((res) => res.json()).then((commentData) => {
            let postId = document.getElementById('posts').value;

            Object.values(commentData).filter(c => c.postId == postId).forEach(c => {
                let li = document.createElement('li');
                li.textContent = c.text;
                commentField.appendChild(li)

            });

        })


    })

    }

attachEvents();



