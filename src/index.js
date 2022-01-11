const quoteList = document.querySelector('#quote-list')



document.addEventListener('DOMContentLoaded', () => { //DOM is loaded
    //Loads the quotes
    fetch("http://localhost:3000/quotes?_embed=likes")
    .then(resp => resp.json())
    .then(quotes => {
        quotes.forEach(quote => {
            let li = document.createElement('li');
            li.classList.add('quote-card');
            li.innerHTML = `
                <blockquote class="blockquote">
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
                console.log('You clicked like!')
    
            });

            //Delete Button
            let deleteBtn = li.querySelector('.btn-danger')
            deleteBtn.addEventListener('click', (e) => {
                console.log('You clicked delete!')
                li.remove()
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
        <blockquote class="blockquote">
            <p class="mb-0">${quote.quote}</p>
            <footer class="blockquote-footer">${quote.author}</footer>
            <br>
            <button class='btn-success'>Likes: <span>${quote.likes}</span></button>
            <button class='btn-danger'>Delete</button>
        </blockquote>
        `
     //Like Button
     let likeBtn = li.querySelector('.btn-success')
     likeBtn.addEventListener('click', (e) => {
         console.log('You clicked like!')

     });

      //Delete Button
      let deleteBtn = li.querySelector('.btn-danger')
      deleteBtn.addEventListener('click', (e) => {
          console.log('You clicked delete!')
          li.remove()
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


function updateLikes(quote){
    fetch
}

