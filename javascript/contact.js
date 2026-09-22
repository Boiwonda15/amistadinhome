document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  const status = form?.querySelector(".form-status");

  if (!form || !status) {
    return;
  }

  const phoneInput = form.querySelector('input[name="phone"]');
  const fields = form.querySelectorAll("input, textarea");
  const validationMessages = {
    email: "Please enter a valid email address, such as name@example.com.",
    message: "Please tell us how we can help.",
    name: "Please enter your name.",
    phone: "Please enter a 10-digit phone number. We will format it for you."
  };

  fields.forEach((field) => {
    field.addEventListener("invalid", () => {
      field.setCustomValidity(validationMessages[field.name] || "Please complete this field.");
    });
    field.addEventListener("input", () => field.setCustomValidity(""));
  });

  phoneInput?.addEventListener("input", () => {
    const digits = phoneInput.value.replace(/\D/g, "").slice(0, 10);
    let formattedPhone = digits;

    if (digits.length > 6) {
      formattedPhone = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    } else if (digits.length > 3) {
      formattedPhone = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else if (digits.length > 0) {
      formattedPhone = `(${digits}`;
    }

    phoneInput.value = formattedPhone;
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const submitButton = form.querySelector("button[type=\"submit\"]");
    const message = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      _subject: `Contact message from ${formData.get("name")}`,
      _template: "table"
    };

    status.textContent = "Sending your message...";
    status.classList.add("is-visible");
    status.classList.remove("is-error");
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
        throw new Error(responseData.message || "The email service rejected the message.");
      }

      status.textContent = "Thank you for your message. It has been sent to Amistad.";
      status.classList.remove("is-error");
      form.reset();
    } catch (error) {
      status.textContent = `We could not send your message: ${error.message} Please try again, or call us at (402) 841-3428.`;
      status.classList.add("is-error");
    } finally {
      submitButton.disabled = false;
    }
  });
});
