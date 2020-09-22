const dropEl = document.querySelector('[data-id=drop-area]');
const pictures = document.querySelector('.pictures');
const root = document.getElementById('root');
const fileEl = document.querySelector('.overlapped');

root.addEventListener('click', (event) => {
  if (event.target.classList.contains('close')) {
    event.target.closest('.box').remove();
  }
});
dropEl.addEventListener('dragover', (evt) => {
  evt.preventDefault();
});

const createImg = (file) => {
  const img = document.createElement('img');
  const box = document.createElement('div');
  const close = document.createElement('div');
  close.classList.add('close');
  box.classList.add('box');
  close.innerHTML = '&#10006';
  img.src = URL.createObjectURL(file);
  box.appendChild(img);
  box.appendChild(close);
  pictures.appendChild(box);
  img.addEventListener('load', () => {
    URL.revokeObjectURL(img.src);
  });
};
dropEl.addEventListener('drop', (evt) => {
  evt.preventDefault();
  const file = evt.dataTransfer.files[0];
  createImg(file);
});

dropEl.addEventListener('click', () => {
  fileEl.dispatchEvent(new MouseEvent('click'));
});

fileEl.addEventListener('change', (evt) => {
  const files = Array.from(evt.currentTarget.files);
  const file = files[0];
  createImg(file);
});
