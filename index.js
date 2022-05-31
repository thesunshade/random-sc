import { ids } from "./ids.js";

const suttaArea = document.getElementById("sutta");

function buildSutta(slug) {
  slug = slug.toLowerCase();

  const contentResponse = fetch(`https://suttacentral.net/api/bilarasuttas/${slug}/sujato?lang=en`)
    .then(response => response.json())
    .catch(error => {
      console.log("Something went wrong");
    });

  // const suttaplex = fetch(`https://suttacentral.net/api/suttas/${slug}/sujato?lang=en&siteLanguage=en`).then(response =>
  //   response.json()
  // );

  Promise.all([contentResponse]).then(responses => {
    const [contentResponse] = responses;
    const { html_text, translation_text, keys_order } = contentResponse;
    let html = "";
    keys_order.forEach(segment => {
      if (translation_text[segment] === undefined) {
        translation_text[segment] = "";
      }
      let [openHtml, closeHtml] = html_text[segment].split(/{}/);
      // openHtml = openHtml.replace(/^<span class='verse-line'>/, "<br><span class='verse-line'>");
      html += `${openHtml}<span class="eng-lang" lang="en">${translation_text[segment]}</span>${closeHtml}\n\n`;
    });
    const scLink = `<p class="sc-link"><a href="https://suttacentral.net/${slug}/en/sujato"><img height="20px" src="./images/favicon-sc.png"></a></p>`;
    suttaArea.innerHTML = scLink + html;
    const pageTile = document.querySelector("h1");
    document.title = pageTile.textContent;
  });
}

// initialize
if (document.location.search) {
  buildSutta(document.location.search.replace("?", ""));
} else {
  suttaArea.innerHTML = `<div class="instructions">
  Disclaimer: This random sutta generator is not to be used to somehow get an answer from the universe as to what Dhamma we need to hear most at this moment in time. It's just code. Better to ask a good kalyanamitta what Dhamma you need to reflect on.
</div>`;
}

const randomButton = document.getElementById("get-random");

randomButton.addEventListener("click", e => {
  e.preventDefault();
  const randomNumber = Math.floor(Math.random() * ids.length);
  console.log(ids[randomNumber]);
  buildSutta(ids[randomNumber]);
  document.location.search = "?" + ids[randomNumber];
});

// citation.value = document.location.search.replace("?", "");
