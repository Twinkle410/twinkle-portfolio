/* =========================================================
   TWINKLE SHARMA — PORTFOLIO
   Interactive JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. ELEMENTS
       ===================================================== */

    const cursor = document.querySelector(".cursor-ring");
    const doodle = document.querySelector(".doodle");
    const doodleImage = doodle
        ? doodle.querySelector("img")
        : null;

    const menuButton = document.querySelector(".menu");
    const navLinks = document.querySelector(".navlinks");


    /* =====================================================
       02. MOUSE POSITION
       ===================================================== */

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let smoothMouseX = mouseX;
    let smoothMouseY = mouseY;


    document.addEventListener("mousemove", (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        /* -----------------------------------------------
           Custom Cursor
           ----------------------------------------------- */

        if (cursor) {

            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;

        }

    });


    /* =====================================================
       03. SMOOTH CURSOR ANIMATION
       ===================================================== */

    function animateCursor() {

        smoothMouseX +=
            (mouseX - smoothMouseX) * 0.15;

        smoothMouseY +=
            (mouseY - smoothMouseY) * 0.15;

        if (cursor) {

            cursor.style.left =
                `${smoothMouseX}px`;

            cursor.style.top =
                `${smoothMouseY}px`;

        }

        requestAnimationFrame(animateCursor);
    }

    animateCursor();


    /* =====================================================
       04. CURSOR HOVER EFFECT
       ===================================================== */

    const interactiveElements =
        document.querySelectorAll(
            "a, button, .card, .tag"
        );


    interactiveElements.forEach((element) => {

        element.addEventListener("mouseenter", () => {

            if (!cursor) return;

            cursor.style.width = "48px";
            cursor.style.height = "48px";

            cursor.style.borderColor =
                "rgba(167, 255, 79, 0.9)";

        });


        element.addEventListener("mouseleave", () => {

            if (!cursor) return;

            cursor.style.width = "28px";
            cursor.style.height = "28px";

            cursor.style.borderColor =
                "rgba(167, 255, 79, 0.65)";

        });

    });


    /* =====================================================
       05. ANIMATED GIRL — CURSOR FOLLOW
       ===================================================== */

    let girlX = 0;
    let girlY = 0;

    let targetGirlX = 0;
    let targetGirlY = 0;


    function animateGirl() {

        if (doodle && doodleImage) {

            const rect =
                doodle.getBoundingClientRect();

            const girlCenterX =
                rect.left + rect.width / 2;

            const girlCenterY =
                rect.top + rect.height / 2;


            const distanceX =
                mouseX - girlCenterX;

            const distanceY =
                mouseY - girlCenterY;


            /*
             * Keep the movement subtle.
             * The girl should follow the cursor,
             * not fly across the screen.
             */

            targetGirlX =
                Math.max(
                    -12,
                    Math.min(
                        12,
                        distanceX / 35
                    )
                );

            targetGirlY =
                Math.max(
                    -10,
                    Math.min(
                        10,
                        distanceY / 40
                    )
                );


            girlX +=
                (targetGirlX - girlX) * 0.08;

            girlY +=
                (targetGirlY - girlY) * 0.08;


            doodleImage.style.transform =
                `translate(${girlX}px, ${girlY}px)`;

        }

        requestAnimationFrame(animateGirl);
    }

    animateGirl();


    /* =====================================================
       06. EYE / FACE DIRECTION
       ===================================================== */

    /*
     * If the SVG contains elements with these classes,
     * they will move toward the cursor:
     *
     * .eye-left
     * .eye-right
     *
     * The script also supports:
     *
     * #eyeLeft
     * #eyeRight
     */

    const eyeLeft =
        document.querySelector(
            ".eye-left, #eyeLeft"
        );

    const eyeRight =
        document.querySelector(
            ".eye-right, #eyeRight"
        );


    function moveEyes() {

        if (!eyeLeft && !eyeRight) {
            return;
        }


        const eyes = [
            eyeLeft,
            eyeRight
        ].filter(Boolean);


        eyes.forEach((eye) => {

            const rect =
                eye.getBoundingClientRect();

            const eyeCenterX =
                rect.left + rect.width / 2;

            const eyeCenterY =
                rect.top + rect.height / 2;


            const dx =
                mouseX - eyeCenterX;

            const dy =
                mouseY - eyeCenterY;


            const angle =
                Math.atan2(dy, dx);


            const distance =
                Math.min(
                    4,
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    ) / 100
                );


            const moveX =
                Math.cos(angle) * distance;

            const moveY =
                Math.sin(angle) * distance;


            eye.style.transform =
                `translate(${moveX}px, ${moveY}px)`;

        });

    }


    function animateEyes() {

        moveEyes();

        requestAnimationFrame(
            animateEyes
        );
    }

    animateEyes();


    /* =====================================================
       07. MOBILE NAVIGATION
       ===================================================== */

    if (menuButton && navLinks) {

        menuButton.addEventListener(
            "click",
            () => {

                navLinks.classList.toggle(
                    "open"
                );

            }
        );


        /*
         * Close menu after clicking a link.
         */

        navLinks
            .querySelectorAll("a")
            .forEach((link) => {

                link.addEventListener(
                    "click",
                    () => {

                        navLinks.classList.remove(
                            "open"
                        );

                    }
                );

            });

    }


    /* =====================================================
       08. SCROLL REVEAL
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        (element) => {

            revealObserver.observe(
                element
            );

        }
    );


    /* =====================================================
       09. 3D CARD TILT
       ===================================================== */

    const tiltCards =
        document.querySelectorAll(
            ".tilt"
        );


    tiltCards.forEach((card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                /*
                 * Disable strong tilt on small screens.
                 */

                if (
                    window.innerWidth < 700
                ) {
                    return;
                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;


                const rotateX =
                    (y - centerY) /
                    18;

                const rotateY =
                    (centerX - x) /
                    18;


                card.style.transform =
                    `
                    perspective(900px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-5px)
                    scale3d(1.01,1.01,1.01)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });


    /* =====================================================
       10. MAGNETIC BUTTON EFFECT
       ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".btn"
        );


    buttons.forEach((button) => {

        button.addEventListener(
            "mousemove",
            (event) => {

                if (
                    window.innerWidth < 700
                ) {
                    return;
                }


                const rect =
                    button.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;


                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;


                button.style.transform =
                    `
                    translate(
                        ${x * 0.12}px,
                        ${y * 0.12}px
                    )
                    `;

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform =
                    "";

            }
        );

    });


    /* =====================================================
       11. PARALLAX EFFECT
       ===================================================== */

    const parallaxElements =
        document.querySelectorAll(
            "[data-parallax]"
        );


    window.addEventListener(
        "scroll",
        () => {

            const scrollY =
                window.scrollY;


            parallaxElements.forEach(
                (element) => {

                    const speed =
                        parseFloat(
                            element.dataset.parallax
                        ) || 0.15;


                    element.style.transform =
                        `translateY(${scrollY * speed}px)`;

                }
            );

        },
        {
            passive: true
        }
    );


    /* =====================================================
       12. ACTIVE NAVIGATION
       ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop();


    if (currentPage) {

        document
            .querySelectorAll(
                ".navlinks a"
            )
            .forEach((link) => {

                const linkPage =
                    link
                        .getAttribute("href")
                        .split("/")
                        .pop();


                if (
                    linkPage ===
                    currentPage
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            });

    }


    /* =====================================================
       13. SMOOTH ANCHOR SCROLL
       ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach((anchor) => {

            anchor.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        anchor.getAttribute(
                            "href"
                        );


                    if (
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (target) {

                        event.preventDefault();


                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        });


    /* =====================================================
       14. MOUSE PARALLAX FOR DOODLE
       ===================================================== */

    document.addEventListener(
        "mousemove",
        (event) => {

            if (
                !doodle ||
                window.innerWidth < 700
            ) {
                return;
            }


            const x =
                (event.clientX /
                    window.innerWidth -
                    0.5);


            const y =
                (event.clientY /
                    window.innerHeight -
                    0.5);


            doodle.style.marginRight =
                `${x * 10}px`;

            doodle.style.marginBottom =
                `${y * 8}px`;

        }
    );


    /* =====================================================
       15. PAGE LOAD ANIMATION
       ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );


    /* =====================================================
       16. KEYBOARD ACCESSIBILITY
       ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            /*
             * Press Escape to close mobile menu.
             */

            if (
                event.key === "Escape" &&
                navLinks
            ) {

                navLinks.classList.remove(
                    "open"
                );

            }

        }
    );


    /* =====================================================
       17. PREVENT IMAGE DRAGGING
       ===================================================== */

    document
        .querySelectorAll("img")
        .forEach((image) => {

            image.setAttribute(
                "draggable",
                "false"
            );

        });


    /* =====================================================
       18. CONSOLE MESSAGE
       ===================================================== */

    console.log(
        "%cTwinkle Sharma — Portfolio",
        "font-size:18px;font-weight:bold;"
    );

    console.log(
        "Data • Analytics • BI • Automation"
    );

});
