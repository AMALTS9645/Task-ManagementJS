let globalPostData = [];
postContents = document.getElementById("postContentsRow")

const addCard = () => {
    const newPostDetails = {
        id: `${Date.now()}`,
        url: document.getElementById("imageURL").value,
        name: document.getElementById("userName").value,
        caption: document.getElementById("addCaption").value,
        type: document.getElementById("accountType").value
    };

    postContents.insertAdjacentHTML('beforeend', generatefbCard(newPostDetails));

    globalPostData.push(newPostDetails);
    saveToLocalStorage();
}
const generatefbCard = ({id, url, name, caption, type}) =>{
    return `<div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
    <div class="card pop" style="box-shadow: 0px 0px 10px blue;"> 
        <button class="btn" type="button" data-bs-toggle="collapse"
        data-bs-target="#cardcollapse" aria-controls="cardcollapse" aria-expanded="false"
        aria-label="Toggle navigation">
        <i class="fas fa-ellipsis-v d-flex justify-content-end"></i>
    </button>
    <div class="collapse" id="cardcollapse">
        <div class="card-header d-flex justify-content-end">
            <button type="button" class="btn btn-outline-primary" name=${id} onclick="editPost(this)">
                <i class="fas fa-pencil-alt" name=${id} onclick="editPost(this)">Edit</i>
            </button>
            <button type="button" class="btn btn-outline-danger" name=${id} onclick="deletePost(this)">
                <i class="far fa-trash-alt" name=${id} onclick="deletePost(this)">Delete</i>
            </button>
        </div>
    </div>                       
        <div class="card-header">
            <img src=${url}
                class="card-img-top" alt="newPostImage" />
        </div>
        <div class="card-body">
            <i class="far fa-heart"></i>
            <i class="far fa-comment"></i>
            <i class="fas fa-share-square"></i>
            <h5 class="card-title">${name}</h5>
            <p class="card-text">${caption}</p>
            <span class="badge bg-primary">${type}</span> 
            <h6>Epoch Time<span class="badge bg-primary">${id}</span></h6>
        </div>
        <div class="card-footer">
            <button class="btn btn-outline-light float-end">View Post</button>
        </div>
    </div>
</div>`
}

const saveToLocalStorage = () => {
    localStorage.setItem("postkey", JSON.stringify({posts: globalPostData}));
}

const reloadPostCard = () =>{
    const localStorageCopy = JSON.parse(localStorage.getItem("postkey"));
    if(localStorageCopy){
        globalPostData = localStorageCopy["posts"];
    }
    globalPostData.map((cardData) => {
        postContents.insertAdjacentHTML('beforeend', generatefbCard(cardData));

    })
  }

  const deletePost = (e) => {
      const targetID = e.getAttribute("name");
      globalPostData = globalPostData.filter((cardData) => cardData.id!==targetID);
      saveToLocalStorage();
      window.location.reload();
  }

  
  const editPost =(e) => {
    const targetID = e.getAttribute("name");
    // // console.log(e)
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[7].setAttribute("contenteditable","true")
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[9].setAttribute("contenteditable","true")
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[11].setAttribute("contenteditable","true")
    e.parentNode.parentNode.parentNode.childNodes[9].childNodes[1].setAttribute("onclick","saveEditPost(this)")
    e.parentNode.parentNode.parentNode.childNodes[9].childNodes[1].innerHTML = "SAVE CHANGES"
    saveToLocalStorage();
}

// const saveEditPost =(e) => {
//     const targetID = e.getAttribute("name");

// }