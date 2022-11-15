const modal = document.querySelector('#modal');
const btnsDelete = document.querySelectorAll('.menu-item-admin .fa-trash');
const btnClose = document.querySelector('.close-modal');

btnsDelete.forEach((btnDelete) => {
  btnDelete.addEventListener('click', (e) => {
    const menuBlock = e.target.parentElement.parentElement.parentElement;
    const menuId = menuBlock.dataset.dishid;
    const menuItem = menuBlock.querySelector('.menu-item-title');
    modal.showModal();
    const dialogForm = document.querySelector('.dialog-form');
    dialogForm.action = `/dish/${menuId}?_method=DELETE`;
    const dialogItem = document.querySelector('.dialog-item');
    dialogItem.innerText = menuItem.innerText;
  });
});

btnClose.addEventListener('click', () => {
  modal.close();
});
