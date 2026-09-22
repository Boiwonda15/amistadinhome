document.addEventListener("DOMContentLoaded", () => {
  const childCount = document.querySelector("#number-of-children");
  const childNameFields = document.querySelector("#child-name-fields");

  if (!childCount || !childNameFields) {
    return;
  }

  const updateChildNameFields = () => {
    const numberOfChildren = Number(childCount.value);
    childNameFields.replaceChildren();

    for (let childNumber = 1; childNumber <= numberOfChildren; childNumber += 1) {
      const label = document.createElement("label");
      const input = document.createElement("input");
      const field = document.createElement("div");

      label.htmlFor = `child-name-${childNumber}`;
      label.textContent = `Child ${childNumber} name`;
      input.id = `child-name-${childNumber}`;
      input.name = "child-name[]";
      input.type = "text";
      input.required = true;
      field.append(label, input);
      childNameFields.append(field);
    }
  };

  childCount.addEventListener("change", updateChildNameFields);
});
