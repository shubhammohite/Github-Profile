 const APIURL='https://api.github.com/users/'

 const form = document.getElementById('form')
 const main = document.getElementById('main')
 const search = document.getElementById('search')
 async function getUser(username) {
    try
    {
        const { data } = await axios(APIURL + username)
        console.log(data)
        createUserCard(data)
    }
   catch(error){
    console.log(error)
   }
 }

 function createUserCard(user) {
    const cardHtml = 
    `   <div class="card">
    <div>
      <img src="${user.avatar_url}" alt="" class="avatar">
    </div>
    <div class="user-info">
      <h2>${user.name}</h2>
      <p>${user.bio}</p>
      <p><a href='${user.html_url}'>GITHUBURL</a></p>
      <ul>
        <li>${user.followers} <strong>Followers</strong></li>
        <br>
        <li>${user.following} <strong>Following</strong></li>
        <br>
        <li>${user.public_repos} <strong>Repository</strong></li>
      </ul>
    </div>
  </div> `
  
  main.innerHTML = cardHtml


 }
 form.addEventListener('submit',(e) => {
    e.preventDefault()
    const user=search.value
    if(user) {
        getUser(user)
        search.value = ' '
    }
 })