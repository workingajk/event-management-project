gsap.registerPlugin(ScrollTrigger);

gsap.from(".form-container",{
    y:100,
    opacity:0,
    duration:1,
    ease:"power3.out",
    scrollTrigger:{
        trigger:".form-container",
        start:"top 80%"
    }
});



gsap.from(".form-group",{
    y:50,
    opacity:0,
    stagger:0.15,
    duration:0.8,
    ease:"power2.out",
    scrollTrigger:{
        trigger:".form-container",
        start:"top 75%"
    }
});
gsap.to(".contact-bg",{
    y:80,
    duration:5,
    repeat:-1,
    yoyo:true,
    ease:"sine.inOut"
});

gsap.to(".icon",{
    y:20,
    repeat:-1,
    yoyo:true,
    duration:2,
    stagger:0.3
});
gsap.from(".text-3xl",{
    y:80,
    opacity:0,
    duration:1,
    ease:"power4.out",
    scrollTrigger:{
        trigger:".text-3xl",
        start:"top 85%"
    }
});