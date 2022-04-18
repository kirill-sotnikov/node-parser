const puppeteer = require("puppeteer");
const fs = require("fs");
async function start() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 4000 });
  await page.goto("https://www.ivi.ru/collections/top-100-best-movies");

  await page.click("button.nbl-button_style_ran");
  await page
    .waitForSelector(".gallery__item")
    .then(() => console.log("selector detected"));

  const films = await page.evaluate(() => {
    let filmsName = [];
    const title = document.querySelectorAll(".nbl-slimPosterBlock__title");
    const b = Array.from(title);
    b.forEach((item) => filmsName.push(item.innerText));
    return filmsName;
  });

  const imgUrl = await page.evaluate(() => {
    let filmsName = [];
    const title = document.querySelectorAll(".nbl-slimPosterBlock__title");
    const b = Array.from(title);
    b.forEach((item) => filmsName.push(item.innerText));
    return filmsName;
  });

  //   function filmsToAllItem(films) {
  //     films.forEach((item) => {
  //       if (!item in allFilms) {
  //         allFilms.push(item);
  //       }
  //     });
  //   }

  console.log(films);

  await browser.close();

  fs.writeFile("./db.json", JSON.stringify(films), (err) => {
    if (!err) console.log("ok");
  });
}

start();
