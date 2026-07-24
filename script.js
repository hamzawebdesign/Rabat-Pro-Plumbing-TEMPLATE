// =========================
// GALLERY LIGHTBOX
// =========================


const galleryImages = document.querySelectorAll(".gallery-item img");

const lightbox = document.getElementById("lightbox");

const lightboxImg = document.getElementById("lightbox-img");

const closeBtn = document.querySelector(".close");



if (lightbox && lightboxImg && closeBtn) {


    galleryImages.forEach((image) => {


        image.addEventListener("click", () => {


            lightbox.style.display = "flex";

            lightboxImg.src = image.src;


        });


    });



    closeBtn.addEventListener("click", () => {


        lightbox.style.display = "none";


    });



    lightbox.addEventListener("click", (event) => {


        if (event.target === lightbox) {


            lightbox.style.display = "none";


        }


    });


}





// =========================
// COUNTER ANIMATION
// =========================


const counters = document.querySelectorAll(
    ".stat h3:not(.no-counter)"
);



function animateCounter(counter) {


    const target = parseInt(counter.innerText);



    if (isNaN(target)) return;



    let count = 0;

    const speed = target / 100;



    function updateCounter() {


        count += speed;



        if (count < target) {


            counter.innerText = Math.floor(count) + "+";


            requestAnimationFrame(updateCounter);


        } else {


            counter.innerText = target + "+";


        }


    }



    updateCounter();


}





const counterObserver = new IntersectionObserver((entries) => {


    entries.forEach((entry) => {


        if (entry.isIntersecting) {


            animateCounter(entry.target);


            counterObserver.unobserve(entry.target);


        }


    });


});





counters.forEach((counter) => {


    counterObserver.observe(counter);


});







// =========================
// SCROLL REVEAL ANIMATION
// =========================


const sections = document.querySelectorAll("section");



const sectionObserver = new IntersectionObserver((entries) => {


    entries.forEach((entry) => {


        if (entry.isIntersecting) {


            entry.target.classList.add("show");


        }


    });


});





sections.forEach((section) => {


    section.classList.add("hidden");


    sectionObserver.observe(section);


});

// ===========================
// CONTACT FORM → WHATSAPP
// ===========================

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const message = document.getElementById("message").value.trim();

        const whatsappNumber = "212600000000"; // Replace with the client's number

        const text =
`Hello, I need a plumbing service.

Name: ${name}
Phone: ${phone}

Problem:
${message}`;

        const url =
`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

        window.open(url, "_blank");

    });

}