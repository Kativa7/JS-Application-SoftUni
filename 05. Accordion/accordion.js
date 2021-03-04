function solution() {
    const urlBase = `http://localhost:3030/jsonstore/advanced/articles/`;

    let main = document.getElementById('main');

    fetch(urlBase + "list").then((res) => res.json()).then((articles) => {

        articles.forEach(article => {
            let outerDiv = document.createElement('div');
            outerDiv.className = "accordion";
            let headDiv = document.createElement('div');
            headDiv.className = "head";
            let extraDiv = document.createElement('div');
            extraDiv.className = "extra";
            let paragraph = document.createElement('p');
            
            let span = document.createElement('span');
            span.textContent = `${article.title}`;
            let btn = document.createElement('button');
            btn.className = 'button';
            btn.textContent = "MORE"
            btn.setAttribute('id', `${article._id}`);

            extraDiv.appendChild(paragraph);
            headDiv.appendChild(span);
            headDiv.appendChild(btn);
            outerDiv.appendChild(headDiv);
            outerDiv.appendChild(extraDiv);

            main.appendChild(outerDiv);


            btn.addEventListener('click', () => {
                
                let newUrl = urlBase + `/details/${article._id}`;
                fetch(newUrl).then((res) => res.json()).then((art) => {
                    paragraph.textContent = art.content;
                    if (btn.textContent === "MORE") {
                        extraDiv.style.display = 'block';
                        btn.textContent = "LESS";
    
                    } else {
                        extraDiv.style.display = 'none';
                        btn.textContent = "MORE";
                    }
                });
            })

        });
    });
}

solution();