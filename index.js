import { ids } from "./ids.js";

const randomButton = document.getElementById("get-random");
const suttaArea = document.getElementById("sutta");
const translatorInfo = document.getElementById("translator-info");
const getDaily = document.getElementById("get-daily");
const clickInstruction = document.getElementById("click-instruction");

// BUILDING YOUR OWN VERSION OF THIS APP
// [ ] remove Google Tracking Script from end of index.html
// [ ] update/translate specified tags in <head>  at top of index.html
// [ ] change language and translator below as needed
const language = "de";
const translator = "sabbamitta";
// [ ] below needs to be translated when changing to a new language
const disclaimer =
  "";
clickInstruction.innerText = "Klicken für ein";
const buttonText = "Zufälliges Sutta";
translatorInfo.innerText = "Alle Übersetzungen sind von Sabbamitta, wie sie auf SuttaCentral.net vorliegen.";
getDaily.innerHTML = ``;
// end of building your own version

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
