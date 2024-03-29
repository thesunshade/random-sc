import getIncludedIds from "./getIncludedIds.js";
import bookOptions from "./bookOptions.js";
import { prettySlug } from "./prettySlug.js";

const randomButton = document.getElementById("get-random");
const suttaArea = document.getElementById("sutta");
const translatorInfo = document.getElementById("translator-info");
const getDaily = document.getElementById("get-daily");
const clickInstruction = document.getElementById("click-instruction");

// BUILDING YOUR OWN VERSION OF THIS APP
// [ ] remove Google Tracking Script from end of index.html
// [ ] update/translate specified tags in <head>  at top of index.html
// [ ] change language and translator below as needed
const language = "en";
const translator = "sujato";
// [ ] below needs to be translated when changing to a new language
const disclaimer =
  "Disclaimer: This random sutta generator is not to be used to somehow get an answer from the universe as to what Dhamma we need to hear most at this moment in time. It’s just code. Better to ask a good kalyanamitta what Dhamma you need to reflect on.";
clickInstruction.innerText = "Click to get a";
const buttonText = "Random Sutta";
translatorInfo.innerText = "All translations are by Bhikkhu Sujato as found on SuttaCentral.net";
getDaily.innerHTML = `Get a new sutta by email each day from <a href="http://daily.readingfaithfully.org" title="Daily Suttas" rel="noreferrer" target="_blank">Daily.ReadingFaithfully.org</a>`;
// end of building your own version

bookOptions();

randomButton.addEventListener("click", e => {
  e.preventDefault();
  const ids = getIncludedIds();
  // console.log(ids);
  const randomNumber = Math.floor(Math.random() * ids.length);
  // console.log(randomNumber);
  // console.log(ids[randomNumber]);
  // document.location.search = "?" + ids[randomNumber];
  console.log(ids[randomNumber]);
  buildSutta(ids[randomNumber]);
  history.pushState({ page: ids[randomNumber] }, "", `?q=${ids[randomNumber]}`);
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
      const scLink = `<a href="https://suttacentral.net/${slug}/${language}/${translator}"  title="Open in SuttaCentral.net" rel="noreferrer" target="_blank"><img height="20px" src="./images/favicon-sc.png"></a>`;
      const scLightLink = `<a href="https://sc.readingfaithfully.org/?q=${slug}"  title="Open in SC Light" rel="noreferrer" target="_blank"><img height="15px" src="./images/favicon-sc-light-tan.png"></a>`;
      const citationHelperLink = `<a href="https://sutta.readingfaithfully.org/?q=${slug}"  title="Open in Citation Helper" rel="noreferrer" target="_blank"><img height="17px" src="./images/favicon-CH.png" ></a>`;
      suttaArea.innerHTML = '<p class="sc-link">' + scLink + citationHelperLink + scLightLink + "</p>" + html;
      const pageTile = document.querySelector("h1");
      document.title = pageTile.textContent;
      pageTile.innerHTML = `<span class="citation">${prettySlug(slug)}</span> ${pageTile.textContent}`;
      randomButton.innerText = buttonText;
    })
    .catch(error => {
      console.log("Something went wrong");
      buildSutta(ids[Math.floor(Math.random() * ids.length)]);
    });
}

// initialize
if (document.location.search) {
  buildSutta(document.location.search.replace("?q=", ""));
} else {
  suttaArea.innerHTML = `<div class="instructions">${disclaimer}</div>`;
  randomButton.innerText = buttonText;
}
