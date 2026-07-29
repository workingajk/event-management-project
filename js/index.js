
document.addEventListener("DOMContentLoaded", (event) => {
    // gsap code here!

    console.clear(); // Start with a clean console on refesh
    gsap.registerPlugin(Draggable, DrawSVGPlugin, EaselPlugin, Flip, GSDevTools, InertiaPlugin, MotionPathHelper, MotionPathPlugin, MorphSVGPlugin, Observer, Physics2DPlugin, PhysicsPropsPlugin, PixiPlugin, ScrambleTextPlugin, ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText, TextPlugin, RoughEase, ExpoScaleEase, SlowMo, CustomEase, CustomBounce, CustomWiggle);

    // card deck stuff
    const slider = document.querySelector(".slider");
    const items = gsap.utils.toArray(".item");
    const offset = 30;


    function moveCard() {
        const lastItem = slider.querySelector(".item:last-child");

        if (slider && lastItem) {
            lastItem.style.display = "none"; // Hide the last item
            const newItem = document.createElement("img");
            newItem.className = lastItem.className; // Set the same class name
            newItem.src = lastItem.src; // Set the same class name
            slider.insertBefore(newItem, slider.firstChild); // Insert the new item at the beginning of the slider
        }
    }

    document.body.addEventListener("click", (e) => {
        let state = Flip.getState(".item");

        moveCard();

        Flip.from(state, {
            targets: ".item",
            ease: "sine.inOut",
            absolute: true,
            onEnter: (elements) => {
                return gsap.from(elements, {
                    duration: 0.3,
                    yPercent: 20,
                    opacity: 0,
                    ease: "expo.out"
                });
            },
            onLeave: (element) => {
                return gsap.to(element, {
                    duration: 0.3,
                    yPercent: 5,
                    xPercent: -5,
                    transformOrigin: "bottom left",
                    opacity: 0,
                    ease: "expo.out",
                    onComplete() {
                        console.log("logging", element[0])
                        slider.removeChild(element[0]);
                    }
                });
            }
        });
    });

    // flair stuff
    function playAnimation(shape) {
        // the timeline
        let tl = gsap.timeline();
        tl.from(shape, {
            opacity: 0,
            scale: 0,
            ease: "elastic.out(1,0.3)",
        })
            .to(shape, {
                rotation: "random([-360, 360])",
            }, "<")
            .to(shape, {
                y: "120vh",
                ease: "back.in(.4)",
                duration: 1,
            }, 0)

    }
    // interaction props
    let gap = 100; // this number spaces the 'lil shapes out
    let flair = gsap.utils.toArray(".flair");
    let index = 0;
    let wrapper = gsap.utils.wrap(0, flair.length);
    gsap.defaults({ duration: 1 })

    let mousePos = { x: 0, y: 0 };
    let lastMousePos = mousePos;
    let cachedMousePos = mousePos;

    window.addEventListener("mousemove", (e) => {
        mousePos = {
            x: e.x,
            y: e.y
        };
    });

    gsap.ticker.add(ImageTrail);

    function ImageTrail() {
        let travelDistance = Math.hypot(
            lastMousePos.x - mousePos.x,
            lastMousePos.y - mousePos.y
        );

        // keep the previous mouse position for animation
        cachedMousePos.x = gsap.utils.interpolate(
            cachedMousePos.x || mousePos.x,
            mousePos.x,
            0.1
        );
        cachedMousePos.y = gsap.utils.interpolate(
            cachedMousePos.y || mousePos.y,
            mousePos.y,
            0.1
        );

        if (travelDistance > gap) {
            animateImage();
            lastMousePos = mousePos;
        }
    }

    function animateImage() {
        let wrappedIndex = wrapper(index);

        console.log(index, flair.length);

        let img = flair[wrappedIndex];
        gsap.killTweensOf(img);

        gsap.set(img, {
            clearProps: "all",
        });


        gsap.set(img, {
            opacity: 1,
            left: mousePos.x,
            top: mousePos.y,
            xPercent: -50,
            yPercent: -50,
        });

        playAnimation(img);

        index++;
    }

    // fade-up stagger animation with gsap 
    gsap.fromTo(".fade-up",
        {
            opacity: 0,
            y: 70,
            // x: 70
        },
        {
            duration: 1,
            opacity: 1,
            y: 0,
            // x:0,
            delay: 0.5,
            stagger: 0.3,
            ease: "sine.out",
            scrollTrigger: {
                trigger: ".fade-up",
                start: "top 60%",
                toggleActions: "play none none reset"
            }
        }
    );

    // other stuff to be added

});

