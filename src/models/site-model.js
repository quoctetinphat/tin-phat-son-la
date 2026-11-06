export const siteModel = Object.freeze({
  contactEmail: 'tinphatsonlaa@gmail.com',
  leadEndpoint: 'https://script.google.com/macros/s/AKfycbwZtEJ_yf2QysgDrhY-P5_C375DCTpL-FAKtQfM63x1l4eYr8uYtY_thSht0mruGKH2/exec',
  form: {
    requiredFields: ['name', 'phone', 'need'],
    consentField: 'ok'
  },
  messages: {
    invalid: 'Vui lòng điền đủ thông tin và đồng ý để chúng tôi liên hệ.',
    sending: 'Đang lưu thông tin của bạn...',
    saved: 'Đã nhận thông tin. Tín Phát Sơn La sẽ liên hệ với bạn sớm.',
    unavailable: 'Chưa cấu hình nơi lưu dữ liệu. Vui lòng liên hệ trực tiếp qua số điện thoại.'
  }
});
