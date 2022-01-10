const quoteList = document.querySelector('#quote-list')



document.addEventListener('DOMContentLoaded', () => { //DOM is loaded
    //Loads the quotes
    fetch("http://localhost:3000/quotes?_embed=likes")
    .then(resp => resp.json())
    .then(quotes => {
        quotes.forEach(quote => {
            let li = document.createElement('li');
            let likes = quote.likes[0]

            li.innerHTML = `
                <li class='quote-card'>
                    <blockquote class="blockquote">
                    <p class="mb-0">${quote.quote}</p>
                    <footer class="blockquote-footer">${quote.author}</footer>
                    <br>
                    <button class='btn-success'>Likes: <span>${likes}</span></button>
                    <button class='btn-danger'>Delete</button>
                </blockquote>
            </li>
            `
   
            quoteList.appendChild(li)
        })


        //Like Button
        document.querySelector('.btn-success').addEventListener('click', (e) => {
            console.log('You clicked like!')


        })


        //Delete Button
        document.querySelector('.btn-danger').addEventListener('click', (e) => {
            console.log('You clicked delete!')


        })
    });


    


});





