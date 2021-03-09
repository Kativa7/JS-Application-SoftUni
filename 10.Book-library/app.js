function library() {

    let urlBase = 'http://localhost:3030/jsonstore/collections/books';

    let loadBtn = document.getElementById('loadBooks');
    let tbody = document.querySelector('tbody');
    let form = document.querySelector('form');
    let saveBtn = document.getElementById('save-btn');


    loadBtn.addEventListener('click', getBooks);
    form.addEventListener('submit', createBooks);
    saveBtn.addEventListener('click',editBook);

    function getBooks() {
        if (tbody.innerHTML != "") {
            tbody.innerHTML = "";
        }

        fetch(urlBase).then((response) => response.json()).then((dataBooks) => {
            Object.keys(dataBooks).forEach(key => {
                let row = document.createElement('tr');
                let tdTitle = document.createElement('td');
                tdTitle.textContent = dataBooks[key].title;
                let tdAuthor = document.createElement('td');
                tdAuthor.textContent = dataBooks[key].author;
                let tdBtns = document.createElement('td');
                let btnEdit = document.createElement('button');
                btnEdit.textContent = 'Edit';
                let btnDelete = document.createElement('button');
                btnDelete.textContent = 'Delete';
                btnEdit.setAttribute('data-key', `${key}`);
                btnDelete.setAttribute('data-key', `${key}`);
                btnEdit.addEventListener('click', getBookById);
                btnDelete.addEventListener('click', deleteBook);
                

                tdBtns.appendChild(btnEdit);
                tdBtns.appendChild(btnDelete);
                row.appendChild(tdTitle);
                row.appendChild(tdAuthor);
                row.appendChild(tdBtns);
                tbody.appendChild(row);
            });
        })


    }

    function editBook (e){
        e.preventDefault();
        let id = this.getAttribute('data-key');
        let editTitle = document.getElementById('edit-title');
        let editAuthor = document.getElementById('edit-author');
        if (editTitle.value == "" || editAuthor.value == "") {
            alert('All fields must be filled!');
            return;
        }
        let formEdit = document.getElementById('edit-form');

        formEdit.style.display = 'none'

        fetch(urlBase + `/${id}`,{
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: editTitle.value,
                author: editAuthor.value,
            })
        }).then(getBooks);


    }

    function getBookById() {
        let id = this.getAttribute('data-key');
        let formEdit = document.getElementById('edit-form');
        let editTitle = document.getElementById('edit-title');
        let editAuthor = document.getElementById('edit-author');
        let saveBtn = document.getElementById('save-btn');
        saveBtn.setAttribute('data-key', id);

        fetch(urlBase + `/${id}`).then((response) => response.json())
            .then(({ title, author }) => {
                editTitle.value = title;
                editAuthor.value = author;
                formEdit.style.display = 'block'


            })

    }

    function createBooks(e) {
        e.preventDefault();
        let titleField = form.querySelector('input[name="title"]');
        let authorField = form.querySelector('input[name="author"]');

        if (titleField.value == "" || authorField.value == "") {
            alert('All fields must be filled!');
            return;
        }
        fetch(urlBase, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                author: authorField.value,
                title: titleField.value,
            })
        }).then(getBooks);


        titleField.value = "";
        authorField.value = "";

    }

    function deleteBook(){
        let id = this.getAttribute('data-key');
        fetch(urlBase + `/${id}`,{
            method: 'delete'
        }).then(res => res.json()).then(getBooks);
    }

}
library();

