const modal = document.querySelector('#modal');
const btnsDelete = document.querySelectorAll('.menu-item-admin .fa-trash');
const btnClose = document.querySelector('.close-modal');

btnsDelete.forEach((btnDelete) => {
  btnDelete.addEventListener('click', () => {
    modal.showModal();
  });
});

btnClose.addEventListener('click', () => {
  modal.close();
});
