// Dark & light mode toggle
const toggle = document.getElementById('toggle');
const body = document.body;

toggle.addEventListener('input', e => {
    const isChecked = e.target.checked;

    if (isChecked) {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
});

// Search constants
const get = (param) => document.getElementById(`${param}`)
const url = "https://api.github.com/users/"
const noResults = get("no-results")
const btnSubmit = get("submit")
const input = get("input")
const avatar = get("avatar")
const userName = get("name")
const user = get("user")
const date = get("date")
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const bio = get("bio")
const repos = get("repos")
const followers = get("followers")
const following = get("following")
const userLocation = get("location")
const website = get("website")
const twitter = get("twitter")
const company = get("company")
const locationDiv = get("location-div")
const websiteDiv = get("website-div")
const twitterDiv = get("twitter-div")
const companyDiv = get("company-div")

// Search button
btnSubmit.addEventListener("click", function () {
    if (input.value !== "") {
        getUserData(url + input.value)
    }
})

input.addEventListener("keydown", function (e) {
    if (!e) {
        var e = window.event
    }
    if (e.key == "Enter" && input.value !== "") {
        getUserData(url + input.value)
    }
})

// Functions
function getUserData(gitUrl) {
    fetch(gitUrl)
        .then(res => res.json())
        .then(data => {
            updateProfile(data)
        })
        .catch(error => {
            throw error;
        })
}

function updateProfile(data) {
    if (data.message !== "Not Found") {
        noResults.style.display = "none"
        function checkNull(param1, param2) {
            if ((param1 === "") || (param1 === null)) {
                param2.style.opacity = 0.5
                param2.previousElementSibling.style.opacity = 0.5
                return "Not available"
            } else if ((param1 !== "") || (param1 !== null)) {
                param2.style.opacity = 1
                param2.previousElementSibling.style.opacity = 1
                return `${param1}`
            }
        }
        avatar.src = `${data.avatar_url}`
        userName.innerText = `${data.name}`
        user.innerHTML = `<a target="_blank" href="https://github.com/${data.login}">@${data.login}</a>`
        dateSegments = data.created_at.split("T").shift().split("-")
        date.innerText = `Joined ${dateSegments[2]} ${months[dateSegments[1] - 1]} ${dateSegments[0]}`
        bio.innerText = (data.bio == null) ? "This profile has no bio" : `${data.bio}`
        if (bio.innerText === "This profile has no bio") {
            bio.style.opacity = 0.5
        } else if (bio.innerHTML !== "This profile has no bio") {
            bio.style.opacity = 1
        }
        repos.innerText = `${data.public_repos}`
        followers.innerText = `${data.followers}`
        following.innerText = `${data.following}`
        userLocation.innerText = checkNull(data.location, userLocation)
        website.innerText = checkNull(data.blog, website)
        twitter.innerText = checkNull(data.twitter_username, twitter)
        company.innerText = checkNull(data.company, company)
    } else {
        noResults.style.display = "block"
    }
}

getUserData(url + "cesarmoriana")
