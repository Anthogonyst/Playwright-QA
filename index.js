const { chromium } = require("playwright");
const fs = require("fs");

async function saveHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  const domain = "https://news.ycombinator.com/"

  // go to Hacker News
  await page.goto(domain + "newest");

  // grabs the table section
  const artsTable = await articlesTable(page);

  // saves data to strings
  const fullPage0 = await page.locator("xpath=//html").innerHTML().then((x) => { return x; });
  const artsTablePage0 = await artsTable.innerHTML().then((x) => { return x; });
  concatTables = artsTablePage0;

  // writes files with an abridged version of file and full website html
  fs.writeFile("pages/ycombinator/page0.html", fullPage0, function(err) { });
  fs.writeFile("pages/ycombinator-tables/page0.html", artsTablePage0, function(err) { });

  for (let i = 1; i < 4; i++) {
    page2Promise = await nextPage(artsTable);
    page2Url = domain + page2Promise;

    await page.goto(page2Url);

    /// repeats the above steps, but with an index; could be more DRY
    // grabs the table section
    arts2Table = await articlesTable(page);

    // saves data to strings
    full2Page0 = await page.locator("xpath=//html").innerHTML().then((x) => { return x; });
    arts2TablePage0 = await artsTable.innerHTML().then((x) => { return x; });
    concatTables += arts2TablePage0;

    // writes files with an abridged version of file and full website html
    fs.writeFile("pages/ycombinator/page" + i + ".html", full2Page0, function(err) { });
    fs.writeFile("pages/ycombinator-tables/page" + i + ".html", arts2TablePage0, function(err) { });
  }

  fs.writeFile("pages/ycombinator-combined/concat-table.html", concatTables, function(err) { });
  page.close();
}

async function articlesTable(currentPage) {
  //const mainTable = await currentPage.locator("table", { name: "hnmain" }).locator("xpath=tbody/tr[3]/td/table");
  return await currentPage.locator("xpath=//html/body/center/table/tbody/tr[3]/td/table");
}

async function nextPage(currentPage) {
  return await currentPage
    .getByRole("link", { name: "More", exact: true })
    .getAttribute("href");
}

// function evaluatePromise(promiseObj) {
//   return promiseObj.then((x) => { return x; });
// }

(async () => {
  await saveHackerNewsArticles();
})();
