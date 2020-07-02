import copy from 'copy-to-clipboard';

function onClickGenerator(element) {
  function onClick(event) {
    const value = element.textContent;

    if (value === 'Copied!') {
      return;
    }

    copy(value);
    element.textContent = 'Copied!';

    setTimeout(() => element.textContent = value, 1250);
  }

  element.addEventListener('click', onClick);
}

(function() {
  const elements = document.querySelectorAll('[data-copy]');

  elements.forEach((element) => onClickGenerator(element));
})();
