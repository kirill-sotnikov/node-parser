const puppeteer = require("puppeteer");
const fs = require("fs");

async function start() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 4000 });
  await page.goto("https://www.kinopoisk.ru/lists/movies/top250/?page=1");

  //   await page
  //     .waitForSelector(".gallery__item")
  //     .then(() => console.log("selector detected"))
  let allFilms = [];
  let imgAll = [];
  let allObj = [];

  for (let i = 1; i < 6; i++) {
    await page.goto(
      "https://www.kinopoisk.ru/lists/movies/top250/?page=".concat(i)
    );
    console.log(i);
    /// ---
    const films = await page.evaluate(() => {
      let filmsName = [];
      let titleAndUrl = [];
      const title = document.querySelectorAll(".styles_mainTitle__IFQyZ");

      const titles = Array.from(title);
      const massTitles = titles.map((item) => item.innerText);

      let imgUrl = [];
      const imgs = document.querySelectorAll(".styles_image__gRXvn");
      const arrayImg = Array.from(imgs);
      const massImg = arrayImg.map((item) =>
        item.src.replace("68x102", "600x900")
      );

      for (let i = 0; i < titles.length; i++) {
        titleAndUrl.push({ title: massTitles[i], imgUrl: massImg[i] });
      }

      return titleAndUrl;
    });
    allObj.push(films);

    /// ---
    // imgAll[i - 1] = imgs;
    // allFilms[i - 1] = films;
    // await films.forEach((item) => allFilms.push(item));
    // console.log(films);
    // console.log(imgs);
    console.log("- - - - - - - - - - - - - ");
  }

  allObj = [
    ...allObj[0],
    ...allObj[1],
    ...allObj[2],
    ...allObj[3],
    ...allObj[4],
  ];
  //   imgAll = [
  //     ...imgAll[0],
  //     ...imgAll[1],
  //     ...imgAll[2],
  //     ...imgAll[3],
  //     ...imgAll[4],
  //   ];
  //   allFilms = [
  //     ...allFilms[0],
  //     ...allFilms[1],
  //     ...allFilms[2],
  //     ...allFilms[3],
  //     ...allFilms[4],
  //   ];

  //   const imgUrl = await page.evaluate(() => {
  //     let filmsName = [];
  //     const title = document.querySelectorAll(".nbl-slimPosterBlock__title");
  //     const b = Array.from(title);
  //     b.forEach((item) => filmsName.push(item.innerText));
  //     return filmsName;
  //   });

  //   function filmsToAllItem(films) {
  //     films.forEach((item) => {
  //       if (!item in allFilms) {
  //         allFilms.push(item);
  //       }
  //     });
  //   }

  //   console.log(allFilms);

  await browser.close();

  fs.unlink("./db-kinopoisk.json", (err) => {
    if (!err) console.log("ok");
  });
  for (i of allObj) {
    fs.appendFile("./db-kinopoisk.json", `${JSON.stringify(i)},\n`, (err) => {
      if (!err) console.log("ok");
    });
  }
}

start();

// const films = await page.evaluate(() => {
//     let filmsName = [];
//     const title = document.querySelectorAll(".styles_mainTitle__IFQyZ");

//     const b = Array.from(title);
//   //   b.forEach((item) => filmsName.push(item.innerText));
//     return filmsName;
//   });

//   const imgs = await page.evaluate(() => {
//     let imgUrl = [];
//     const imgs = document.querySelectorAll(".styles_image__gRXvn");
//     const arrayImg = Array.from(imgs);

//     arrayImg.forEach((item) => {
//       imgUrl.push(item.src);
//     });
//     return imgUrl;
//   });
