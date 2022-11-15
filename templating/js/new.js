function addIngredient(currentElement) {
  const index = currentElement - 1;
  const nextElement = currentElement + 1;
  const newInput = `<div class="ingredients-input" data-ingredient="${nextElement}">
  <input type="text" name="ingredients[]" id="ingredients" required>
  <button class="add-ingredient" title="Ingrediënt toevoegen"><i class="fas fa-plus-circle"></i></button>
  <button class="delete-ingredient" title="Ingrediënt verwijderen"><i class="fas fa-minus-circle"></i></button>
</div>`;

  const ingredientsList = document.querySelector('.ingredients-list');
  const ingredientsInput = ingredientsList.children;
  const currentInput = ingredientsInput[index];
  currentInput.removeChild(currentInput.querySelectorAll('button')[0]);
  if (currentInput.querySelectorAll('button').length === 1) {
    currentInput.removeChild(currentInput.querySelector('button'));
  }

  ingredientsList.insertAdjacentHTML('beforeend', newInput);
}

function deleteIngredient(currentElement) {
  const index = currentElement - 1;

  const ingredientsList = document.querySelector('.ingredients-list');
  const ingredientsInput = ingredientsList.children;
  const previousElement = currentElement - 2;
  const previousInput = ingredientsInput[previousElement];
  const currentInput = ingredientsInput[index];
  ingredientsList.removeChild(currentInput);

  if (currentElement === 2) {
    const addBtn = `<button class="add-ingredient" title="Ingrediënt toevoegen"><i class="fas fa-plus-circle"></i></button>`;
    previousInput.insertAdjacentHTML('beforeend', addBtn);
  } else {
    const addBtns = `<button class="add-ingredient" title="Ingrediënt toevoegen"><i class="fas fa-plus-circle"></i></button>
      <button class="delete-ingredient" title="Ingrediënt verwijderen"><i class="fas fa-minus-circle"></i></button>`;
    previousInput.insertAdjacentHTML('beforeend', addBtns);
  }
}

function clickHandler(e) {
  const element = e.target;

  if (element.className === 'add-ingredient') {
    e.preventDefault();
    const currentElement = element.parentElement.dataset['ingredient'];
    addIngredient(parseInt(currentElement));
  }

  if (element.parentElement.className === 'add-ingredient') {
    e.preventDefault();
    const currentElement =
      element.parentElement.parentElement.dataset['ingredient'];
    addIngredient(parseInt(currentElement));
  }

  if (element.className === 'delete-ingredient') {
    e.preventDefault();
    const currentElement = element.parentElement.dataset['ingredient'];
    deleteIngredient(parseInt(currentElement));
  }

  if (element.parentElement.className === 'delete-ingredient') {
    e.preventDefault();
    const currentElement =
      element.parentElement.parentElement.dataset['ingredient'];
    deleteIngredient(parseInt(currentElement));
  }
}

document.addEventListener('click', clickHandler);
