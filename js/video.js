function getTimeString(time){
    const hour = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hour} hour ${minute} minute ${remainingSecond} second ago`;
}
const removeActiveClass =() =>{
    const button =document.getElementsByClassName("category-btn");
    for(let btn of button){
        btn.classList.remove("active");
    }
}


// 1. Fatch , Lode and show catagroies on html

// create lodeCatagroies
const lodeCategories = () => {
    
    // fatch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json()
    )
    .then((data) => displayCategories(data.categories)
    )
    .catch((error) => console.log(error)
    )
    
};

const lodeVideos = (searchText = "") => {
    
    // fatch the data
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json()
    )
    .then((data) => displyVideos(data.videos)
    )
    .catch((error) => console.log(error)
    )
    
};

const lodeCatagroiesVideo = (id) => {
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json()
    )
    .then((data) => {

        removeActiveClass();

        const activeBtn = document.getElementById(`btn-${id}`);
        
        activeBtn.classList.add("active");
        
        displyVideos(data.category);
    })
    .catch((error) => console.log(error));
};

const lodeDetails = async (videoId) =>{
    const url =`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    const res = await fetch(url);
    const data = await res.json();
    displauDetails(data.video);
    
}
const displauDetails =(video) =>{
    const delailContainer = document.getElementById("modal-content");
    delailContainer.innerHTML =`
        <img src="${video.thumbnail}" alt="">
        <p>${video.description}</p>
    `
    document.getElementById("showModalData").click();
}

// const cardDemu = {
//     "category_id": "1001",
//     "video_id": "aaad",
//     "thumbnail": "https://i.ibb.co/f9FBQwz/smells.jpg",
//     "title": "Smells Like Teen Spirit",
//     "authors": [
//       {
//         "profile_picture": "https://i.ibb.co/k4tkc42/oliviar-harris.jpg",
//         "profile_name": "Oliver Harris",
//         "verified": true
//       }
//     ],
//     "others": {
//       "views": "5.4K",
//       "posted_date": "1672656000"
//     },
//     "description": "'Smells Like Teen Spirit' by Oliver Harris captures the raw energy and rebellious spirit of youth. With over 5.4K views, this track brings a grunge rock vibe, featuring powerful guitar riffs and compelling vocals. Oliver's verified profile guarantees a quality musical journey that resonates with fans of dynamic, high-energy performances."
//   };

const displyVideos = (videos) =>{

    const videoContainer = document.getElementById("videos");
    videoContainer.innerHTML = "";

    if(videos.length == 0){
        videoContainer.classList.remove("grid");
        videoContainer.innerHTML = `
        <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
           <img src="assets/icon.png" alt="">
        <h2 class="text-center text-xl font-bold">
            NO CONTENT HERE
        </h2>

        </div>
        `;
        return;
    }
    else{
        videoContainer.classList.add("grid");
    }
    
    videos.forEach(video =>{
        console.log(video);

        const card = document.createElement("div");
        card.classList = "card card-compact"
        card.innerHTML =

            `
        <figure class="h-[200px] relative">
            <img
            src=${video.thumbnail}
            class="h-full w-full object-cover"
            alt="Shoes" />
            ${video.others.posted_date?.length == 0 ? "" : `<span class="absolute right-2 bottom-2 bg-black text-white rounded p-1 text-xs">${getTimeString(video.others.posted_date)}</span>`

            }
        </figure>
        <div class="px-0 py-2 flex gap-2">
            <div>
            <img class="w-10 h-10 rounded-full object-fill" src=${video.authors[0].profile_picture} alt="">
        </div>
         <div>
            <h2 class="font-bold">${video.title}</h2>
            <div class="flex items-center gap-2">
                <p class="text-gray-400">${video.authors[0].profile_name}</p>
                ${video.authors[0].verified == true ? ' <img class="w-5" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png" alt="">':''}
            </div>
                <p><button onclick="lodeDetails('${video.video_id}')" class="btn btn-sm btn-error">details</button></p>
            </div>
        </div>

             `;

        videoContainer.append(card);
    })
    
}

// create displayCatagroies
const displayCategories = (categories) =>{

    const categoryContainer = document.getElementById("categories");

    categories.forEach( (item) => {
        console.log(item);
        // create a button
        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML =
        `
        <button id="btn-${item.category_id}" onclick ="lodeCatagroiesVideo(${item.category_id})" class="btn category-btn">
            ${item.category}
        </button>
        `
        
        // add button to category container
        categoryContainer.append(buttonContainer);
    });
};

document.getElementById("search-input").addEventListener("keyup",(e) =>{
    lodeVideos(e.target.value);
})

lodeCategories();
lodeVideos();