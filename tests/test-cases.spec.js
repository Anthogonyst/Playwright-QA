import { test, expect } from '@playwright/test';
const path = require("path");

test('Test first 30 results on webpage', async ({ page }) => {
  const filepath = "/pages/ycombinator/page0.html"
  const localPath = "file:///" + path.relative("/", ".") + filepath;
  await page.goto(localPath);

  const ageTable = await page.getByTitle(new RegExp("\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}")).all();
  const promiseArray = await ageTable.map((x) => {
    return x.getAttribute("title").then((x) => { return x; });
  });
  const timeStrings = await Promise.all(promiseArray);
  const timeDates = timeStrings.map((x) => { return new Date(x); });

  for (let i = 1; i < timeDates.length; i++) {
    expect(timeDates[i]).toBeLessThanOrEqual(timeDates[i - 1]);
  }
})

test('Test next 30 results on webpage', async ({ page }) => {
  const filepath = "/pages/ycombinator/page1.html"
  const localPath = "file:///" + path.relative("/", ".") + filepath;
  await page.goto(localPath);

  const ageTable = await page.getByTitle(new RegExp("\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}")).all();
  const promiseArray = await ageTable.map((x) => {
    return x.getAttribute("title").then((x) => { return x; });
  });
  const timeStrings = await Promise.all(promiseArray);
  const timeDates = timeStrings.map((x) => { return new Date(x); });

  for (let i = 1; i < timeDates.length; i++) {
    expect(timeDates[i]).toBeLessThanOrEqual(timeDates[i - 1]);
  }
})

test('Test first 30 results on tables subset', async ({ page }) => {
  const filepath = "/pages/ycombinator-tables/page0.html"
  const localPath = "file:///" + path.relative("/", ".") + filepath;
  await page.goto(localPath);

  const ageTable = await page.getByTitle(new RegExp("\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}")).all();
  const promiseArray = await ageTable.map((x) => {
    return x.getAttribute("title").then((x) => { return x; });
  });
  const timeStrings = await Promise.all(promiseArray);
  const timeDates = timeStrings.map((x) => { return new Date(x); });

  for (let i = 1; i < timeDates.length; i++) {
    expect(timeDates[i]).toBeLessThanOrEqual(timeDates[i - 1]);
  }
})

test('Test 100 results on concated table', async ({ page }) => {
  const filepath = "/pages/ycombinator-combined/concat-table.html"
  const localPath = "file:///" + path.relative("/", ".") + filepath;
  await page.goto(localPath);

  const ageTable = await page.getByTitle(new RegExp("\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}")).all();
  const promiseArray = await ageTable.map((x) => {
    return x.getAttribute("title").then((x) => { return x; });
  });
  const timeStrings = await Promise.all(promiseArray);
  const timeDates = timeStrings.map((x) => { return new Date(x); });

  for (let i = 1; i < timeDates.length; i++) {
    expect(timeDates[i]).toBeLessThanOrEqual(timeDates[i - 1]);
  }
})