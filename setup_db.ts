import sqlite3 from "sqlite3";

const db = new sqlite3.Database("form_selectors.sqlite");

db.serialize(() => {
  db.run("DROP TABLE IF EXISTS selectors");
  db.run(`CREATE TABLE selectors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        field_name TEXT,
        selector TEXT,
        property TEXT,
        value TEXT
    )`);

  const stmt = db.prepare(
    "INSERT INTO selectors (field_name, selector, property, value) VALUES (?, ?, ?, ?)",
  );

  stmt.run("title", "#Title", "select", "Ms");
  stmt.run("first_name", "#FirstName", "value", "Nofar");
  stmt.run("last_name", "#LastName", "value", "Yam");
  stmt.run("dob_day", "#dob_day", "select", "15");
  stmt.run("dob_month", "#dob_month", "select", "06");
  stmt.run("dob_year", "#dob_year", "select", "1995");
  stmt.run("phone", "#DayTimeTelephone", "value", "+442071234567");
  stmt.run("house_number", "#houseId", "value", "1");
  stmt.run("postcode", "#postCode", "value", "SW1A 1AA");

  stmt.run("find_address_btn", "#searchAddressImageButton", "click", "");
  stmt.run("select_address", "#addressSelect", "select", "Buckingham Palace#");

  stmt.run("email", "#Email", "value", "refl.test@example.com");
  stmt.run("confirm_email", "#ConfirmEmail", "value", "refl.test@example.com");
  stmt.run("password", "#Password", "value", "SecurePass123!");
  stmt.run("confirm_password", "#confirmPassword", "value", "SecurePass123!");

  stmt.run("final_submit", "#applybutton", "click", "");
  stmt.run("final_submit", "#applybutton", "click", "");

  stmt.run(
    "select_pay_now",
    "#checkOrderForm > div.main-container.noBackground > div.confirmContainerWrapper > div.paymentChoiceContainer.cashPaymentContainer.cashPaymentContainerNewCredit.ats-Cash",
    "click",
    "",
  );

  stmt.run("card_holder", "#CardHolderName", "value", "Nofar Yam");
  stmt.run("card_number", "#CardNumber", "value", "4580123456789012");
  stmt.run("expiry_date", "#ExpiryDateMonthYear", "value", "12/28");
  stmt.run("cvv", "#CardSecurityCode", "value", "123");

  stmt.run("uncheck_remember_card", "#RememberCardDetails", "click", "");
  stmt.run("final_pay_button", "#applybutton", "click", "");

  stmt.finalize();
  console.log("Database populated with all fields! 🚀");
});

db.close();
