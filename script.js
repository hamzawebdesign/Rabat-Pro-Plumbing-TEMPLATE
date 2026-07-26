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
        `🔧 NEW WEBSITE REQUEST

        👤 Name:
        ${name}

        📞 Phone:
        ${phone}

        📝 Problem:
        ${message}

        📍 Sent from:
        Rabat Pro Plumbing Website`;

        const url =
`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

        window.open(url, "_blank");

    });

}

/* =========================
   DARK MODE
========================= */

const themeToggle = document.getElementById("theme-toggle");

const savedTheme = localStorage.getItem("website-theme");

if(savedTheme === "dark"){

    document.body.classList.add("dark-mode");

    themeToggle.textContent = "☀️";

}


themeToggle.addEventListener("click", function(){

    document.body.classList.toggle("dark-mode");

    const darkModeActive =
        document.body.classList.contains("dark-mode");

    if(darkModeActive){

        themeToggle.textContent = "☀️";

        localStorage.setItem("website-theme", "dark");

    }else{

        themeToggle.textContent = "🌙";

        localStorage.setItem("website-theme", "light");

    }

});

/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
    "section, .card, .stat, .gallery-item, .review-card, .contact-card"
);

revealElements.forEach(function(element){
    element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
    function(entries){

        entries.forEach(function(entry){

            if(entry.isIntersecting){

                entry.target.classList.add("show");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold:0.15
    }
);

revealElements.forEach(function(element){
    revealObserver.observe(element);
});

/* =========================
   PAGE LOADER
========================= */

window.addEventListener("load", function(){

    const pageLoader =
        document.getElementById("page-loader");

    if(pageLoader){

        setTimeout(function(){

            pageLoader.classList.add("hide");

        }, 700);

    }

});

/* =========================
   ALWAYS START FROM TOP
========================= */

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

window.addEventListener("load", function () {

    window.scrollTo(0, 0);

    document.documentElement.scrollTop = 0;

    document.body.scrollTop = 0;

});

window.addEventListener("beforeunload", function () {

    window.scrollTo(0, 0);

});

/* =========================
   BACK TO TOP
========================= */

document.addEventListener("DOMContentLoaded", function () {

    const backToTopButton =
        document.getElementById("back-to-top");

    if (!backToTopButton) {
        return;
    }

    window.addEventListener("scroll", function () {

        if (window.scrollY > 300) {

            backToTopButton.classList.add("show");

        } else {

            backToTopButton.classList.remove("show");

        }

    });

    backToTopButton.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});