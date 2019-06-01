export function renderText(text) {
    const htmlEl = document.createElement('h1');
    htmlEl.innerHTML = text;
    document.body.insertBefore(htmlEl, document.body.children[0]);
}