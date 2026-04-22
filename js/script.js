const copyrightContent = document.getElementById("copyright");

if (copyrightContent) {
  copyrightContent.textContent = `© ${new Date().getFullYear()} Jacob Escoto`;
}

const contactForm = document.getElementById("contact-form");
const status = document.getElementById("form-status");

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const data = new FormData(event.target);
  const submitBtn = document.getElementById("submit-btn");

  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  try {
    const response = await fetch("https://formspree.io/f/mojyjbao", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      status.innerHTML = "Thanks! Your message have been sent.";
      status.style.color = "rgb(62, 194, 255)";
      contactForm.reset();

      setTimeout(() => {
        status.style.opacity = "0";

        setTimeout(() => {
          status.innerHTML = "";
          status.style.opacity = "1";
        }, 500);
      }, 5000);
    } else {
      status.innerHTML = "Oops! There was an error while sending.";
    }
  } catch (error) {
    status.innerHTML = "Connection error. Try again later!";
  } finally {
    submitBtn.textContent = "Send";
    submitBtn.disabled = false;
  }
});
