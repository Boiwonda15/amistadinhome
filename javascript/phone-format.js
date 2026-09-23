document.addEventListener("DOMContentLoaded", () => {
  const phoneInputs = document.querySelectorAll('input[type="tel"]');

  phoneInputs.forEach((phoneInput) => {
    phoneInput.addEventListener("input", () => {
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
  });
});