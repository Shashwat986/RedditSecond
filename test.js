var jq = window.$
var voted = false
function run() {
    if (jq("afd2021-embed").currentRound.images == null) {
        console.log("Round Over")
        voted = false;
        return;
    }
    images = jq("afd2021-embed").currentRound.images

    if (jq("afd2021-embed").currentRound.secondsLeft > 31) {
        console.log("Too Early. Wait")
        return;
    }

    curr_status = jq("afd2021-embed").shadowRoot.children[0].querySelector("afd2021-round").shadowRoot.children[0].innerText
    if (curr_status == "YOUR VOTE HAS BEEN COUNTED") {
        console.log("Already voted")
        return
    }

    sorted_images = images.sort(function (a, b) { return a.votes - b.votes });
    if (sorted_images[2].votes == 0) {
        console.warn("No votes")
        return;
    }
    console.log("Votes: ", sorted_images.map(function(x) { return "" + x.name + ": " + x.votes}));
    let data = sorted_images[1]
    // let data = images.reduce(function(prev, curr) { return curr.votes > 0 ? (prev.votes > curr.votes ? prev : curr) : null })

    if (data && !voted) {
        jq("afd2021-embed").shadowRoot.children[0].querySelector("afd2021-round").shadowRoot.children[1].querySelector("#image-url-" + data.id).click()
        console.log("Voting for " + data.name)
        voted = true;
    } else {
        console.log("Voted?")
    }
}

intervalId = setInterval(run, 500)


// clearInterval(intervalId)
