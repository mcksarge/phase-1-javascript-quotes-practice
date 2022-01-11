const quoteList = document.querySelector('#quote-list')



document.addEventListener('DOMContentLoaded', () => { //DOM is loaded
    //Loads the quotes
    fetch("http://localhost:3000/quotes?_embed=likes")
    .then(resp => resp.json())
    .then(quotes => {
        console.log(quotes)
        quotes.forEach(quote => {
            let li = document.createElement('li');
            let numLikes = 0
            li.classList.add('quote-card');
            li.innerHTML = `
                <blockquote class="blockquote" data-id=${quote.id}>
                    <p class="mb-0">${quote.quote}</p>
                    <footer class="blockquote-footer">${quote.author}</footer>
                    <br>
                    <button class='btn-success'>Likes: <span>${quote.likes.length}</span></button>
                    <button class='btn-danger'>Delete</button>
                </blockquote>
            `


            
        //Like Button
        let likeBtn = li.querySelector('.btn-success')
        likeBtn.addEventListener('click', (e) => {
            getIdToLikeQuote(e);
        });

            //Delete Button
            let deleteBtn = li.querySelector('.btn-danger')
            deleteBtn.addEventListener('click', (e) => {
                console.log('You clicked delete!')
                li.remove()
                deleteQuote(quote.id)
            });

            quoteList.appendChild(li)
        });


    });


});


//Handles Form
let quoteForm = document.querySelector('#new-quote-form')
let submitBtn = document.querySelector('.btn-primary')

quoteForm.addEventListener('submit', handleSubmit);



//Submit Button

function handleSubmit(e){
    e.preventDefault();
    let quoteObj = {
        quote: e.target.quote.value,
        author: e.target.author.value
    }
    console.log(quoteObj)
    renderQuote(quoteObj)
    sendQuote(quoteObj)
};

function renderQuote(quote){
    let li = document.createElement('li');
    li.classList.add('quote-card');
    li.innerHTML = `
        <blockquote class="blockquote" data-id=${quote.id}>
            <p class="mb-0">${quote.quote}</p>
            <footer class="blockquote-footer">${quote.author}</footer>
            <br>
            <button class='btn-success'>Likes: <span>0</span></button>
            <button class='btn-danger'>Delete</button>
        </blockquote>
        `




        //Like Button
        let likeBtn = li.querySelector('.btn-success')
        likeBtn.addEventListener('click', (e) => {
            let quote = e.target.parentNode.parentNode;
            let id = quote.dataset.id;

            currentLike = e.target.childNodes[1]
            newLike = parseInt(currentLike.innerText) + 1
            currentLike.innerText = `${newLike}`

            fetch('http://localhost:3000/likes', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify({"quoteId": id})
            })
            .then(res => res.json())
        });

      //Delete Button
      let deleteBtn = li.querySelector('.btn-danger')
      deleteBtn.addEventListener('click', (e) => {
          console.log('You clicked delete!')
          li.remove()
          deleteQuote(quote.id)
      });

      quoteList.appendChild(li)
    
};


function sendQuote(quote){
    fetch(`http://localhost:3000/quotes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(quote)
    })
}


function getIdToLikeQuote(e) {
    console.log('like');
    const quoteId = parseInt(e.target.parentElement.dataset.id)
    
    likeObj = {quoteId: quoteId}

    increaseLikes(e)
    createLike(likeObj)
  }


function deleteQuote(id){
    fetch(`http://localhost:3000/quotes/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json'
        }
    })
    .then(res => res.json())
    .then(quote => console.log(quote))
}


function createLike(quoteId){
    fetch('http://localhost:3000/likes/', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(quoteId)
    })
}

function increaseLikes(e){
    let currentLikes = parseInt(e.target.querySelector("span").innerText)
    let likes = document.querySelector("#quote-list > li:nth-child(1) > blockquote > button.btn-success > span")
    currentLikes++
    e.target.querySelector("span").innerText = currentLikes
}