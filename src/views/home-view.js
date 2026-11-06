export function createHomeView(document) {
  return {
    revealElements: document.querySelectorAll('.rv'),
    form: document.getElementById('lead'),
    message: document.getElementById('msg'),
    sharpBackground: document.getElementById('sharp'),
    revealMarker: document.querySelector('.reveal'),
    gapElements: document.querySelectorAll('.gap, .reveal'),
    hero: document.querySelector('.hero'),
    splitElements: document.querySelectorAll(
      '.hero>.rv:first-child,.about>.rv:first-child,.head>div:first-child,h3.sub,.consult>.rv:first-child'
    ),
    setMessage(message) {
      this.message.textContent = message;
    }
  };
}
