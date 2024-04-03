const accessKey = "wfDGZuYxnmbqY7AcLkqxV3_Ffh9wPqTGat_9TbVN_GI";
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResultImg = document.getElementById("search-result-img");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results.length === 0) {
            alert("No results found. Try a different search term.");
            return;
        }

        data.results.forEach((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;

            const imagelink = document.createElement("a");
            imagelink.href = result.links.html;
            imagelink.target = "_blank";
            imagelink.appendChild(image);

            searchResultImg.appendChild(imagelink);
        });

        showMoreBtn.style.display = "block";
    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchResultImg.innerHTML = ""; // Clear previous results
    searchImages();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});
