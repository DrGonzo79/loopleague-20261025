import {expect,test} from "@playwright/test";
test("filters, validates, queues, and verifies",async({page},testInfo)=>{
  await page.goto("/");
  await expect(page.locator("main")).toHaveAttribute("data-hydrated","true",{timeout:15000});
  await expect(page.getByRole("heading",{name:/Turn school energy/})).toBeVisible();
  await page.getByRole("button",{name:"North",exact:true}).click();
  await expect(page.getByText("East Ridge")).toHaveCount(0);
  await page.getByRole("button",{name:"Add to review queue"}).click();
  await expect(page.getByRole("status")).toContainText("secure video link");
  await page.getByLabel("School").fill("Westfield High");
  await page.getByLabel("Video link").fill("https://example.com/clip");
  await page.getByRole("button",{name:"Add to review queue"}).click();
  await expect(page.getByText("Westfield High")).toBeVisible();
  await page.getByRole("button",{name:"Verify demo"}).last().click();
  await expect(page.getByRole("status")).toContainText("Ranking recalculated");
  await page.screenshot({path:testInfo.project.name==="mobile"?"evidence/mobile.png":"evidence/desktop.png",fullPage:true});
});
test("mobile has no horizontal page overflow",async({page},testInfo)=>{
  test.skip(testInfo.project.name!=="mobile"); await page.goto("/");
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth);
  expect(overflow).toBeFalsy();
});
