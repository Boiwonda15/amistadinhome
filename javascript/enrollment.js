document.addEventListener("DOMContentLoaded", () => {
  const availabilitySettings = {
    infants: { available: false, slots: 0 },
    toddlers: { available: true, slots: 1 }
  };

  document.querySelectorAll(".availability-card").forEach((card) => {
    const ageGroup = card.dataset.ageGroup;
    const settings = availabilitySettings[ageGroup];
    const status = card.querySelector(".availability-status");
    const spots = card.querySelector(".availability-spots");
    const slotCount = Math.max(0, Number(settings?.slots) || 0);
    const isAvailable = Boolean(settings?.available) && slotCount > 0;

    card.classList.toggle("is-available", isAvailable);
    card.classList.toggle("is-full", !isAvailable);
    status.textContent = isAvailable ? "Available" : "Currently full";
    spots.textContent = isAvailable ? `${slotCount} spots available` : "Join the interest list";
  });

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

  const form = document.querySelector(".enrollment-form");
  if (!form) {
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    const message = Object.fromEntries(formData.entries());
    message["child-name"] = formData.getAll("child-name[]");
    message._subject = `Enrollment request from ${formData.get("parent-name")}`;
    message._template = "table";

    submitButton.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
      });
      const responseData = await response.json().catch(() => ({}));

      if (!response.ok || !responseData.success || responseData.success === "false") {
        throw new Error(responseData.message || "The email service rejected the enrollment request.");
      }

      window.location.assign(form.dataset.successUrl);
    } catch (error) {
      window.alert(`We could not send your enrollment request: ${error.message} Please try again.`);
      submitButton.disabled = false;
    }
  });
});
