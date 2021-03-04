function lockedProfile() {
    const url = `http://localhost:3030/jsonstore/advanced/profiles`;
    let main = document.querySelector('#main');



    fetch(url).then((res) => res.json()).then((profiles) => {
        Object.values(profiles).forEach(user => {

            let outerDiv = document.createElement('div');
            outerDiv.className = 'profile';
            outerDiv.innerHTML = 
        `<img src="./iconProfile2.png" class="userIcon" />
         <label>Lock</label>
         <input type="radio" name="user1Locked" value="lock" checked>
         <label>Unlock</label>
         <input type="radio" name="user1Locked" value="unlock" ><br>
         <hr>
         <label>Username</label>
         <input type="text" name="user1Username" value="${user.username}" disabled readonly />
         <div id="user1HiddenFields" class = "hidden"> 
             <hr>
             <label>Email:</label>
             <input type="email" name="user1Email" value="${user.email}" disabled readonly />
             <label>Age:</label>
             <input type="email" name="user1Age" value="${user.age}" disabled readonly />
         </div>
         <button>Show more</button>`

            main.appendChild(outerDiv);

        });

    });
    
    main.addEventListener('click',function(e){
        if(e.target.textContent === 'Show more'|| e.target.textContent === 'Hide it'){
            let lock = e.target.parentElement.querySelector('input[value="lock"]');

            let hiddenDiv = e.target.previousElementSibling;

            if(hiddenDiv.style.display === '' && lock.checked === false){
                hiddenDiv.style.display = 'block';
                e.target.textContent = 'Hide it';

            }else if(hiddenDiv.style.display === 'block' && lock.checked === false){
                hiddenDiv.style.display = '';
                e.target.textContent = 'Show more';
            }
        }

    })


}

