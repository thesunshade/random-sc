import { ids } from "./ids.js";

const randomButton = document.getElementById("get-random");
const suttaArea = document.getElementById("sutta");

const language = "en";
const translator = "sujato";

randomButton.addEventListener("click", e => {
  e.preventDefault();
  const randomNumber = Math.floor(Math.random() * ids.length);
  console.log(ids[randomNumber]);
  document.location.search = "?" + ids[randomNumber];
});

function buildSutta(slug) {
  slug = slug.toLowerCase().trim();
  randomButton.innerText = "...";
  fetch(`https://suttacentral.net/api/bilarasuttas/${slug}/${translator}?lang=${language}`)
    .then(response => response.json())
    .then(data => {
      const { html_text, translation_text, keys_order } = data;
      let html = "";
      keys_order.forEach(segment => {
        if (translation_text[segment] === undefined) {
          translation_text[segment] = "";
        }
        let [openHtml, closeHtml] = html_text[segment].split(/{}/);
        html += `${openHtml}<span class="eng-lang" lang="en">${translation_text[segment]}</span>${closeHtml}\n\n`;
      });
      const scLink = `<p class="sc-link"><a href="https://suttacentral.net/${slug}/${language}/${translator}"><img height="20px" src="./images/favicon-sc.png"></a></p>`;
      suttaArea.innerHTML = scLink + html;
      const pageTile = document.querySelector("h1");
      document.title = pageTile.textContent;
      randomButton.innerText = "Random Sutta";
    })
    .catch(error => {
      console.log("Something went wrong");
      buildSutta(ids[Math.floor(Math.random() * ids.length)]);
    });
}

// initialize
if (document.location.search) {
  buildSutta(document.location.search.replace("?", ""));
} else {
  suttaArea.innerHTML = `<div class="instructions">
  Disclaimer: This random sutta generator is not to be used to somehow get an answer from the universe as to what Dhamma we need to hear most at this moment in time. It's just code. Better to ask a good kalyanamitta what Dhamma you need to reflect on.
</div>`;
  randomButton.innerText = "Random Sutta";
}
