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
        getRepos(username)
    }
   catch(err){
    let status = err.response.status;
    console.log("status", status);
    if(status == 404)
    {
      createErrorCard('No Profile with this userName')
    }
   }
 }

 async function getRepos(username)
 {
  try
    {
        const { data } = await axios(APIURL + username + '/repos?sort=created')
        // console.log(data)
        AddReposToCard(data)
    }
   catch(err){
    
      createErrorCard('Problem in  Fetching Repos')
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

      <div id="repos"></div>
    </div>
  </div> `
  
  main.innerHTML = cardHtml


 }

 function AddReposToCard(repos){
  const reposEl = document.getElementById('repos')

  repos
      .slice(0, 5)
      .forEach(repo => {
          const repoEl = document.createElement('a')
          repoEl.classList.add('repo')
          repoEl.href = repo.html_url
          repoEl.target = '_blank'
          repoEl.innerText = repo.name

          reposEl.appendChild(repoEl)
  })
 }


 function createErrorCard(msg) {
  const cardHtml = `<div class="card">
<h1>${msg}</h1>
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