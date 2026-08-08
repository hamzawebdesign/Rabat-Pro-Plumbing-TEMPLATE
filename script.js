// =========================================================
// RABAT PRO PLUMBING — COMPLETE SCRIPT.JS
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;

    const header = document.getElementById("site-header");

    const themeToggle = document.getElementById("theme-toggle");

    const menuToggle = document.getElementById("menu-toggle");

    const nav = document.getElementById("main-nav");

    const backToTop = document.getElementById("back-to-top");

    const navLinks = [
        ...document.querySelectorAll(".main-nav a")
    ];


    // =====================================================
    // DARK MODE
    // =====================================================

    const savedTheme = localStorage.getItem("rpp-theme");


    if (savedTheme === "dark") {

        body.classList.add("dark-mode");

    }


    function updateThemeIcon() {

        if (!themeToggle) return;

        themeToggle.textContent =
            body.classList.contains("dark-mode")
                ? "☀"
                : "☾";

    }


    updateThemeIcon();


    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            body.classList.toggle("dark-mode");


            const currentTheme =
                body.classList.contains("dark-mode")
                    ? "dark"
                    : "light";


            localStorage.setItem(
                "rpp-theme",
                currentTheme
            );


            updateThemeIcon();

        });

    }


    // =====================================================
    // MOBILE MENU
    // =====================================================

    function closeMenu() {

        if (nav) {

            nav.classList.remove("open");

        }


        if (menuToggle) {

            menuToggle.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        body.classList.remove("menu-open");

    }


    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                !nav.classList.contains("open");


            nav.classList.toggle(
                "open",
                isOpen
            );


            menuToggle.classList.toggle(
                "open",
                isOpen
            );


            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );


            body.classList.toggle(
                "menu-open",
                isOpen
            );

        });

    }


    navLinks.forEach((link) => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


    document.addEventListener("click", (event) => {

        if (
            !nav ||
            !menuToggle ||
            !nav.classList.contains("open")
        ) {
            return;
        }


        const clickedInside =
            nav.contains(event.target) ||
            menuToggle.contains(event.target);


        if (!clickedInside) {

            closeMenu();

        }

    });


    // =====================================================
    // HEADER SCROLL
    // =====================================================

    function handleScroll() {

        const scrollY = window.scrollY;


        if (header) {

            header.classList.toggle(
                "scrolled",
                scrollY > 15
            );

        }


        if (backToTop) {

            backToTop.classList.toggle(
                "show",
                scrollY > 500
            );

        }

    }


    window.addEventListener(
        "scroll",
        handleScroll,
        {
            passive: true
        }
    );


    handleScroll();


    // =====================================================
    // BACK TO TOP
    // =====================================================

    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }


    // =====================================================
    // SMOOTH INTERNAL LINKS
    // =====================================================

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (!target) return;


            event.preventDefault();


            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });


            closeMenu();

        });

    });


    // =====================================================
    // SCROLL REVEAL
    // =====================================================

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(

                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        entry.target.classList.add(
                            "show"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    });

                },

                {
                    threshold: 0.12
                }

            );


        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add("show");

        });

    }


    // =====================================================
    // ACTIVE NAVIGATION
    // =====================================================

    const sections = [
        ...document.querySelectorAll(
            "main section[id]"
        )
    ];


    if ("IntersectionObserver" in window) {

        const sectionObserver =
            new IntersectionObserver(

                (entries) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        navLinks.forEach((link) => {

                            const active =
                                link.getAttribute("href") ===
                                `#${entry.target.id}`;


                            link.classList.toggle(
                                "active",
                                active
                            );

                        });

                    });

                },

                {
                    rootMargin:
                        "-35% 0px -55% 0px"
                }

            );


        sections.forEach((section) => {

            sectionObserver.observe(section);

        });

    }


    // =====================================================
    // COUNTERS
    // =====================================================

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );


    function animateCounter(element) {

        const target =
            Number(
                element.dataset.counter || 0
            );


        const duration = 1200;

        const start = performance.now();


        function tick(now) {

            const progress =
                Math.min(
                    (now - start) / duration,
                    1
                );


            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            const current =
                Math.floor(
                    target * eased
                );


            element.textContent =
                `${current}+`;


            if (progress < 1) {

                requestAnimationFrame(tick);

            } else {

                element.textContent =
                    `${target}+`;

            }

        }


        requestAnimationFrame(tick);

    }


    if ("IntersectionObserver" in window) {

        const counterObserver =
            new IntersectionObserver(

                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        animateCounter(
                            entry.target
                        );


                        observer.unobserve(
                            entry.target
                        );

                    });

                },

                {
                    threshold: 0.5
                }

            );


        counters.forEach((counter) => {

            counterObserver.observe(counter);

        });

    } else {

        counters.forEach((counter) => {

            animateCounter(counter);

        });

    }


    // =====================================================
    // IMAGE LIGHTBOX
    // HERO + PROJECT PHOTOS
    // =====================================================

    const clickableImages =
       document.querySelectorAll(
           ".hero-image-wrap img, .work-section img"
       );


    let currentOverlay = null;


    function closeImageLightbox() {

        if (!currentOverlay) {
            return;
        }


        currentOverlay.remove();

        currentOverlay = null;

        body.style.overflow = "";

    }


    clickableImages.forEach((image) => {

        image.style.cursor = "zoom-in";


        image.addEventListener("click", () => {

            closeImageLightbox();


            // ---------------------------------------------
            // OVERLAY
            // ---------------------------------------------

            const overlay =
                document.createElement("div");


            overlay.className =
                "js-image-lightbox";


            overlay.style.cssText = `
                position: fixed;
                inset: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(2, 10, 20, 0.94);
                z-index: 999999;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 30px;
                box-sizing: border-box;
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
                opacity: 0;
                transition: opacity .25s ease;
            `;


            // ---------------------------------------------
            // IMAGE WRAPPER
            // ---------------------------------------------

            const imageWrapper =
                document.createElement("div");


            imageWrapper.style.cssText = `
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                max-width: 95vw;
                max-height: 92vh;
                transform: scale(.94);
                opacity: 0;
                transition:
                    transform .3s ease,
                    opacity .3s ease;
            `;


            // ---------------------------------------------
            // FULL IMAGE
            // ---------------------------------------------

            const fullImage =
                document.createElement("img");


            fullImage.src =
                image.currentSrc ||
                image.src;


            fullImage.alt =
                image.alt ||
                "Plumbing project";


            fullImage.style.cssText = `
                display: block;
                width: auto;
                height: auto;
                max-width: 95vw;
                max-height: 88vh;
                object-fit: contain;
                border-radius: 16px;
                box-shadow:
                    0 30px 100px
                    rgba(0, 0, 0, .55);
                user-select: none;
                -webkit-user-drag: none;
            `;


            // ---------------------------------------------
            // CLOSE BUTTON
            // ---------------------------------------------

            const closeButton =
                document.createElement("button");


            closeButton.type =
                "button";


            closeButton.setAttribute(
                "aria-label",
                "Close image"
            );


            closeButton.innerHTML =
                "&times;";


            closeButton.style.cssText = `
                position: fixed;
                top: 22px;
                right: 25px;
                width: 48px;
                height: 48px;
                border: 1px solid rgba(255,255,255,.18);
                border-radius: 50%;
                background: rgba(255,255,255,.12);
                color: #ffffff;
                font-size: 34px;
                line-height: 42px;
                text-align: center;
                cursor: pointer;
                z-index: 1000001;
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                transition:
                    background .2s ease,
                    transform .2s ease;
            `;


            // ---------------------------------------------
            // ADD ELEMENTS
            // ---------------------------------------------

            imageWrapper.appendChild(
                fullImage
            );


            overlay.appendChild(
                imageWrapper
            );


            overlay.appendChild(
                closeButton
            );


            body.appendChild(
                overlay
            );


            currentOverlay =
                overlay;


            body.style.overflow =
                "hidden";


            // ---------------------------------------------
            // OPEN ANIMATION
            // ---------------------------------------------

            requestAnimationFrame(() => {

                overlay.style.opacity =
                    "1";


                imageWrapper.style.opacity =
                    "1";


                imageWrapper.style.transform =
                    "scale(1)";

            });


            // ---------------------------------------------
            // CLOSE BUTTON
            // ---------------------------------------------

            closeButton.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                    closeImageLightbox();

                }
            );


            // ---------------------------------------------
            // CLICK OUTSIDE IMAGE
            // ---------------------------------------------

            overlay.addEventListener(
                "click",
                (event) => {

                    if (
                        event.target === overlay
                    ) {

                        closeImageLightbox();

                    }

                }
            );


            // ---------------------------------------------
            // BUTTON HOVER
            // ---------------------------------------------

            closeButton.addEventListener(
                "mouseenter",
                () => {

                    closeButton.style.background =
                        "rgba(255,255,255,.22)";


                    closeButton.style.transform =
                        "scale(1.06)";

                }
            );


            closeButton.addEventListener(
                "mouseleave",
                () => {

                    closeButton.style.background =
                        "rgba(255,255,255,.12)";


                    closeButton.style.transform =
                        "scale(1)";

                }
            );

        });

    });


    // =====================================================
    // ESC KEY
    // =====================================================

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key !== "Escape") {
                return;
            }


            closeImageLightbox();

            closeMenu();

        }
    );


    // =====================================================
    // CONTACT FORM → WHATSAPP
    // =====================================================

    const contactForm =
        document.getElementById(
            "contact-form"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const name =
                    document
                        .getElementById("name")
                        ?.value
                        .trim() || "";


                const phone =
                    document
                        .getElementById("phone")
                        ?.value
                        .trim() || "";


                const service =
                    document
                        .getElementById("service")
                        ?.value ||
                    "Plumbing Service";


                const message =
                    document
                        .getElementById("message")
                        ?.value
                        .trim() || "";


                if (!name) {

                    alert(
                        "Please enter your name."
                    );

                    return;

                }


                if (!phone) {

                    alert(
                        "Please enter your phone number."
                    );

                    return;

                }


                if (!message) {

                    alert(
                        "Please describe the plumbing problem."
                    );

                    return;

                }


                // CHANGE THIS NUMBER TO CLIENT NUMBER
                const whatsappNumber =
                    "212600000000";


                const text = [

                    "NEW PLUMBING REQUEST",

                    "",

                    `Name: ${name}`,

                    `Phone: ${phone}`,

                    `Service: ${service}`,

                    "",

                    "Problem:",

                    message,

                    "",

                    "Sent from Rabat Pro Plumbing website"

                ].join("\n");


                const whatsappURL =
                    `https://wa.me/${whatsappNumber}` +
                    `?text=${encodeURIComponent(text)}`;


                window.open(
                    whatsappURL,
                    "_blank"
                );

            }
        );

    }


    // =====================================================
    // PHONE INPUT — SIMPLE CLEANUP
    // =====================================================

    const phoneInput =
        document.getElementById("phone");


    if (phoneInput) {

        phoneInput.addEventListener(
            "input",
            () => {

                phoneInput.value =
                    phoneInput.value.replace(
                        /[^0-9+\s-]/g,
                        ""
                    );

            }
        );

    }


    // =====================================================
    // HERO IMAGE PREVENT DRAG
    // =====================================================

    const heroImage =
        document.querySelector(
            ".hero-image-wrap > img"
        );


    if (heroImage) {

        heroImage.setAttribute(
            "draggable",
            "false"
        );

    }


    // =====================================================
    // PROJECT IMAGES PREVENT DRAG
    // =====================================================

    clickableImages.forEach((image) => {

        image.setAttribute(
            "draggable",
            "false"
        );

    });


});


// =====================================================
// PREMIUM SMOOTH SCROLL
// =====================================================

const smoothLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


smoothLinks.forEach((link) => {

    link.addEventListener(
        "click",
        (event) => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(
                    targetId
                );


            if (!target) {
                return;
            }


            event.preventDefault();


            const headerOffset =
                header
                    ? header.offsetHeight + 15
                    : 15;


            const targetTop =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerOffset;


            window.scrollTo({

                top: targetTop,

                behavior: "smooth"

            });


            closeMenu();

        }
    );

});


// =========================================================
// PAGE LOADER
// =========================================================

window.addEventListener("load", () => {

    const loader =
        document.getElementById(
            "page-loader"
        );


    if (!loader) {
        return;
    }


    setTimeout(() => {

        loader.classList.add(
            "hide"
        );


        setTimeout(() => {

            loader.style.display =
                "none";

        }, 500);

    }, 350);

});