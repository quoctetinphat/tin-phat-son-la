const SHEET_NAME = 'Khach hang';

function doPost(event) {
  const payload = JSON.parse(event.postData.contents);
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Thời gian', 'Họ và tên', 'Số điện thoại', 'Nhu cầu', 'Lời nhắn']);
  }

  sheet.appendRow([
    new Date(),
    String(payload.name || '').trim(),
    String(payload.phone || '').trim(),
    String(payload.need || '').trim(),
    String(payload.message || '').trim()
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
