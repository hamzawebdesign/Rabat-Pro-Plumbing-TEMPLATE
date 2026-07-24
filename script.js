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