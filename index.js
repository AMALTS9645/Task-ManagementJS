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
                <i class="fas fa-pencil-alt" name=${id} onclick="editPost(this)"></i>
            </button>
            <button type="button" class="btn btn-outline-danger" name=${id} onclick="deletePost(this)">
                <i class="far fa-trash-alt" name=${id} onclick="deletePost(this)"></i>
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

const editPost = (e) => {
    console.log(e);
    const targetID = e.getAttribute("name");
    // console.log(e.tagName);
    // const elementType = e.tagName;
  
    let parentElement;
    let name;
    let caption;
    let type;
  
    e.childNodes[1].classList.remove("fa-pencil-alt");
    e.childNodes[1].classList.add("fa-check");
  
    parentElement = e.parentNode.parentNode.parentNode;
  
    name = parentElement.childNodes[7].childNodes[7];
    caption = parentElement.childNodes[7].childNodes[9];
    type = parentElement.childNodes[7].childNodes[11];

    name.setAttribute("contenteditable", "true");
    caption.setAttribute("contenteditable", "true");
    type.setAttribute("contenteditable", "true");
  
    name.focus();
    console.log(e.childNodes[1]);
    e.setAttribute("onclick", "saveEditedPost(this)");
  };
  
  const saveEditedPost = (e) => {
    console.log(e);
    const targetID = e.getAttribute("name");
    console.log(targetID);
    const elementType = e.tagName;
    // console.log(elementType);
    let parentElement;
  
    parentElement = e.parentNode.parentNode.parentNode;
  
    const name = parentElement.childNodes[7].childNodes[7];
    const caption = parentElement.childNodes[7].childNodes[9];
    const type =parentElement.childNodes[7].childNodes[11];
  
    const updatedPostData = {
      name: name.innerHTML,
      caption: caption.innerHTML,
      type: type.innerHTML,
    };
  
    console.log({ updatedPostData, targetID });
  
    const updateGlobalPosts = globalPostData.map((task) => {
      if (task.id === targetID) {
        console.log({ ...task, ...updatedPostData });
        return { ...task, ...updatedPostData };
      }
      return task;
    });
  
    globalPostData = updateGlobalPosts;
  
    saveToLocalStorage();
  
    name.setAttribute("contenteditable", "false");
    caption.setAttribute("contenteditable", "false");
    type.setAttribute("contenteditable", "false");
  
    console.log(e.childNodes[1].classList);
    e.childNodes[1].classList.remove("fa-check");
    e.childNodes[1].classList.add("fa-pencil-alt");
    e.setAttribute("onclick", "editPost(this)");
  
    // window.location.reload();
  };
