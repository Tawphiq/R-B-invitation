// Google Apps Script: receives RSVPs from index.html and appends them to a Google Sheet.
// Setup steps are in README.md.

const SHEET_NAME = "RSVPs";

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Received", "Attendance", "Full name(s)", "Guests"]);
      sheet.setFrozenRows(1);
    }
    const p = e.parameter || {};
    sheet.appendRow([new Date(), clean(p.attendance), clean(p.name), clean(p.guests)]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Keep values as plain text so a name like "=..." is never run as a formula.
function clean(value) {
  const s = String(value || "").slice(0, 200);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}
