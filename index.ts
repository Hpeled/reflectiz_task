import puppeteer, { Page, Browser } from "puppeteer";
import sqlite3 from "sqlite3";
import { promisify } from "util";

// Interface for the database rows
interface FormSelector {
  field_name: string;
  selector: string;
  property: string;
  value: string;
}

const db = new sqlite3.Database("form_selectors.sqlite");
const dbAll = promisify(db.all).bind(db);

async function run(): Promise<void> {
  console.log("Uploading browser");
  const browser: Browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });

  const page: Page = await browser.newPage();

  try {
    console.log("Navigating to Freemans...");
    await page.goto("https://www.freemans.com", { waitUntil: "networkidle2" });

    console.log(
      "ACTION: Please add a product to the cart and click 'Checkout' manually.",
    );

    // Wait for the 'New Customer' registration link
    await page.waitForSelector("#registerLink", { visible: true, timeout: 0 });
    await page.click("#registerLink");

    console.log("Reached registration form. Loading fields from database...");

    // Ensure the first field exists before fetching from DB
    await page.waitForSelector("#Title", { visible: true, timeout: 60000 });

    const selectors = (await dbAll(
      "SELECT * FROM selectors",
    )) as FormSelector[];
    console.log(
      `Successfully fetched ${selectors.length} fields from database.`,
    );

    for (const row of selectors) {
      console.log(`Processing field: ${row.field_name}`);

      try {
        // Wait for element to be present and visible
        await page.waitForSelector(row.selector, {
          visible: true,
          timeout: 10000,
        });

        if (row.property === "value") {
          await page.type(row.selector, row.value);
        } else if (row.property === "select") {
          await page.select(row.selector, row.value);
        } else if (row.property === "click") {
          console.log(`Executing expert click on: ${row.field_name}`);

          // force click throu the DOM
          await page.evaluate((sel) => {
            const el = document.querySelector(sel) as HTMLElement;
            if (el) {
              el.scrollIntoView();
              el.click();
              el.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
              el.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
              el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
            }
          }, row.selector);
          //Radio botton click
          if (row.field_name === "select_pay_now") {
            await new Promise((r) => setTimeout(r, 2000));
          }
          console.log(`Successfully interacted with: ${row.field_name}`);
        }

        // Small delay between actions for better reliability
        await new Promise((r) => setTimeout(r, 700));
      } catch (err: any) {
        console.warn(
          `Could not process field ${row.field_name}: ${err.message}`,
        );
        // Continuing to the next field instead of crashing
      }
    }

    console.log(
      "Automation task finished! Check the browser to see the result. 🚀",
    );
  } catch (error) {
    console.error("A critical automation error occurred:", error);
  }
}

run();
