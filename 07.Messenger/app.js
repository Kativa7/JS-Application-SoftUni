function attachEvents() {
    let refreshBtn = document.getElementById('refresh');
    let sendBtn = document.getElementById('submit');
    let textArea = document.getElementById('messages');

    let url = 'http://localhost:3030/jsonstore/messenger';

    refreshBtn.addEventListener('click', () => {
        fetch(url).then((response) => response.json()).then((data) => {
            let result = Object.values(data).map(message => `${message.author}: ${message.content}`).join('\n');
            textArea.value = result;
        })
    });

    sendBtn.addEventListener('click', () => {
        let author = document.getElementById('author');
        let content = document.getElementById('content');
        fetch(url, {method: "POST", body: JSON.stringify({author:author.value, content:content.value})
    });
    author.value = "";
    content.value = "";
    })
   
}

attachEvents();


