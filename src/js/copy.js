import copy from 'copy-to-clipboard';

function onClickGenerator(element) {
  function onClick(event) {
    const value = element.textContent;
    const width = element.getBoundingClientRect().width;
    const align = element.style.textAlign;

    if (value === 'Copied!') {
      return;
    }

    copy(value);
    element.textContent = 'Copied!';
    element.style.width = `${width}px`;
    element.style.textAlign = 'center';

    setTimeout(() => {
      element.textContent = value;
      element.style.width = 'auto';
      element.style.textAlign = align;
    }, 1250);
  }

  element.addEventListener('click', onClick);
}

(function() {
  const elements = document.querySelectorAll('[data-copy]');

  elements.forEach((element) => onClickGenerator(element));
})();
