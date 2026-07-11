const videoList = document.querySelectorAll(".video-list .vid");
const mainVideo = document.querySelector(".main-video video");
const mainTitle = document.querySelector(".main-video .title");

const reelCards = document.querySelectorAll(".reel-card");
const featuredVideo = document.querySelector(".featured-reel video");
const featuredTitle = document.querySelector(".featured-reel .title");

videoList.forEach(video => {

    video.addEventListener("click", () => {

        // Remove active class
        videoList.forEach(v => v.classList.remove("active"));

        // Add active class
        video.classList.add("active");

        // Pause current video
        mainVideo.pause();

        // Change source
        const newVideo = video.querySelector("video").getAttribute("src");

        mainVideo.src = newVideo;

        // Change title
        mainTitle.innerHTML = video.querySelector(".title").innerHTML;

        // Load new video
        mainVideo.load();

        // Play automatically
        mainVideo.play();

    });

});

reelCards.forEach(card => {

    card.addEventListener("click", () => {

        // Remove active state
        reelCards.forEach(item => item.classList.remove("active"));

        // Active card
        card.classList.add("active");

        // Pause current video
        featuredVideo.pause();

        // Get new video source
        const newVideo = card.querySelector("video").getAttribute("src");

        // Update featured video
        featuredVideo.src = newVideo;
        featuredVideo.load();

        // Autoplay
        featuredVideo.play();

        // Update title
        featuredTitle.textContent =
            card.querySelector(".title").textContent;

        // Keep selected reel visible
        card.scrollIntoView({

            behavior: "smooth",

            block: "nearest",

            inline: "nearest"

        });

    });

});