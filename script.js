// Update the copyright year
document.getElementById("year").textContent =
    new Date().getFullYear();


// Contact form interaction
document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value.trim();

    const formMessage = document.getElementById("formMessage");

    if (!name || !email || !phone || !service || !message) {
        formMessage.textContent = "Please fill in all the fields.";
        return;
    }

    formMessage.textContent = "Submitting your enquiry...";

    // Step 1: Save enquiry in the backend database
    try {
        const response = await fetch(
            "https://sabarish-home-decor-backend1.onrender.com/api/contact",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone: phone,
                    service: service,
                    message: message
                })
            }
        );

        if (!response.ok) {
            throw new Error("Unable to save your enquiry.");
        }

    } catch (error) {
        console.error("Contact form error:", error);

        formMessage.textContent =
            "Unable to submit your enquiry. Please try again later.";

        return;
    }

    // Step 2: Send enquiry notification using EmailJS
    try {
        await emailjs.send(
            "service_nn7fyd5",
            "template_7f8g4jn",
            {
                name: name,
                email: email,
                phone: phone,
                service: service,
                message: message
            }
        );

        formMessage.textContent =
            "Thank you, " + name +
            "! Your enquiry has been submitted successfully.";

        this.reset();

    } catch (emailError) {
        console.error("EmailJS error:", emailError);

        formMessage.textContent =
            "Your enquiry was saved, but email notification failed. Please contact us on WhatsApp.";

        this.reset();
    }
});