/**
 * Our Edge Media - Google Sheet Integration API
 * 
 * Google Spreadsheet:
 * https://docs.google.com/spreadsheets/d/1j11WN6BBb75lK5c1h86FZ-3X_loliBpskUBaMtPBAd4/edit?usp=sharing
 * 
 * Instructions:
 * 1. Open your Google Sheet
 * 2. Click Extensions > Apps Script
 * 3. Paste the code from GoogleAppsScript.gs and Deploy as Web App
 * 4. Paste the Web App URL below into GOOGLE_SHEET_SCRIPT_URL:
 */

const GOOGLE_SHEET_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwYOUR_DEPLOYED_SCRIPT_ID/exec";

/**
 * Universal helper to send form & chat data to Google Sheet
 * @param {Object} data 
 * @returns {Promise<boolean>}
 */
async function sendToGoogleSheet(data) {
    if (!data.timestamp) {
        data.timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    }

    // If script URL is still placeholder, notify in console but keep UI smooth
    if (!GOOGLE_SHEET_SCRIPT_URL || GOOGLE_SHEET_SCRIPT_URL.includes("YOUR_DEPLOYED_SCRIPT_ID")) {
        console.warn(
            "[Google Sheets] Web App URL not configured yet.\n" +
            "Please follow the setup steps in GoogleAppsScript.gs to get your Web App URL and paste it in sheet-api.js."
        );
        return true;
    }

    try {
        await fetch(GOOGLE_SHEET_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify(data)
        });
        return true;
    } catch (err) {
        console.error("[Google Sheets] Network error saving data:", err);
        return false;
    }
}

