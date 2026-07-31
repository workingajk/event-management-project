gsap.registerPlugin(ScrollTrigger);

gsap.from(".contact-form",{
    y:100,
    opacity:0,
    duration:1.2,
    ease:"power3.out",
    scrollTrigger:{
        trigger:".contact-form",
        start:"top 80%"
    }
});
gsap.from(".form-item", {
    y: 40,
    opacity: 0,
    stagger: 0.15,
    duration: 0.7,
    ease: "power2.out",
    delay: 0.2,
    scrollTrigger: {
        trigger: ".contact-form",
        start: "top 80%"
    }
});



gsap.from(".form-group", {
    y: 50,
    opacity: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".form-container",
        start: "top 75%"
    }
});
gsap.to(".contact-bg", {
    y: 80,
    duration: 5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

gsap.to(".icon", {
    y: 20,
    repeat: -1,
    yoyo: true,
    duration: 2,
    stagger: 0.3
});
gsap.from(".text-3xl", {
    y: 80,
    opacity: 0,
    duration: 1,
    ease: "power4.out",
    scrollTrigger: {
        trigger: ".text-3xl",
        start: "top 85%"
    }
});
gsap.from(".text-2xl",{
    y:80,
    opacity:0,
    duration:1,
    ease:"power4.out",
    scrollTrigger:{
        trigger:".text-2xl",
        start:"top 85%"
    }
});
gsap.from(".text-xl",{
    y:80,
    opacity:0,
    duration:1,
    ease:"power4.out",
    scrollTrigger:{
        trigger:".text- xl",
        start:"top 85%"
    }
});





// Testimonial carousel: drag and buttons only (no ScrollTrigger / page pinning).
gsap.registerPlugin(Draggable);

const cards = gsap.utils.toArray(".cards li");
const spacing = 0.1;
const snapTime = gsap.utils.snap(spacing);
const playhead = { offset: 0 };

if (cards.length) {
    gsap.set(cards, { xPercent: 400, opacity: 0, scale: 0 });

    const seamlessLoop = buildSeamlessLoop(cards, spacing, element => {
        const timeline = gsap.timeline();
        timeline
            .fromTo(
                element,
                { scale: 0, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    zIndex: 100,
                    duration: 0.5,
                    yoyo: true,
                    repeat: 1,
                    ease: "power1.in",
                    immediateRender: false
                }
            )
            .fromTo(
                element,
                { xPercent: 400 },
                { xPercent: -400, duration: 1, ease: "none", immediateRender: false },
                0
            );
        return timeline;
    });

    const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());
    const scrub = gsap.to(playhead, {
        offset: 0,
        duration: 0.5,
        ease: "power3",
        paused: true,
        onUpdate() {
            seamlessLoop.time(wrapTime(playhead.offset));
        }
    });

    const moveTo = offset => {
        scrub.vars.offset = snapTime(offset);
        scrub.invalidate().restart();
    };

    document.querySelector(".next")?.addEventListener("click", () => {
        moveTo(scrub.vars.offset + spacing);
    });

    document.querySelector(".prev")?.addEventListener("click", () => {
        moveTo(scrub.vars.offset - spacing);
    });

    Draggable.create(".drag-proxy", {
        type: "x",
        trigger: ".cards",
        onPress() {
            this.startOffset = scrub.vars.offset;
        },
        onDrag() {
            moveTo(this.startOffset + (this.startX - this.x) * 0.001);
        },
        onDragEnd() {
            moveTo(scrub.vars.offset);
        }
    });
}

function buildSeamlessLoop(items, spacing, animateFunc) {
    const overlap = Math.ceil(1 / spacing);
    const startTime = items.length * spacing + 0.5;
    const loopTime = (items.length + overlap) * spacing + 1;
    const rawSequence = gsap.timeline({ paused: true });
    const seamlessLoop = gsap.timeline({ paused: true, repeat: -1 });
    const length = items.length + overlap * 2;

    for (let i = 0; i < length; i += 1) {
        const time = i * spacing;
        rawSequence.add(animateFunc(items[i % items.length]), time);
    }

    rawSequence.time(startTime);
    seamlessLoop
        .to(rawSequence, { time: loopTime, duration: loopTime - startTime, ease: "none" })
        .fromTo(
            rawSequence,
            { time: overlap * spacing + 1 },
            {
                time: startTime,
                duration: startTime - (overlap * spacing + 1),
                immediateRender: false,
                ease: "none"
            }
        );

    return seamlessLoop;
}
