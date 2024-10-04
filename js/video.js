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

const lodeVideos = () => {
    
    // fatch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json()
    )
    .then((data) => displyVideos(data.videos)
    )
    .catch((error) => console.log(error)
    )
    
};

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
            ${video.others.posted_date?.length == 0 ? "" : `<span class="absolute right-2 bottom-2 bg-black text-white rounded p-1">${video.others.posted_date}</span>`

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
            <p></p>
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
        const button = document.createElement("button");
        button.classList = "btn";
        button.innerText = item.category;
        
        // add button to category container
        categoryContainer.append(button);
    });
};
lodeCategories();
lodeVideos();