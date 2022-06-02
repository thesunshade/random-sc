import { ids } from "./ids.js";

const randomButton = document.getElementById("get-random");
const suttaArea = document.getElementById("sutta");
const translatorInfo = document.getElementById("translator-info");

// BUILDING YOUR OWN VERSION OF THIS APP
// [ ] remove Google Tracking Script from end of index.html
// [ ] update <meta> tags at top of index.html
// [ ] change language and translator as needed
const language = "en";
const translator = "sujato";
// [ ] below needs to be translated when changing to a new language
const disclaimer =
  "Disclaimer: This random sutta generator is not to be used to somehow get an answer from the universe as to what Dhamma we need to hear most at this moment in time. It’s just code. Better to ask a good kalyanamitta what Dhamma you need to reflect on.";
const buttonText = "Random Sutta";
translatorInfo.innerText = "All translations are by Bhikkhu Sujato as found on SuttaCentral.net";

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
      randomButton.innerText = buttonText;
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
  suttaArea.innerHTML = `<div class="instructions">${disclaimer}</div>`;
  randomButton.innerText = buttonText;
}
