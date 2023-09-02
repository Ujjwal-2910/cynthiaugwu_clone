const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim() {
    var t1 = gsap.timeline();
    t1.from('.boundingcontent', {
        duration: 1,
        y: '100%',
        ease: Expo
    })
        .from('.boundingcontent2', {
            duration: 1,
            y: '-100%',
            ease: Expo
        }, '<.5')
        .from('.boundingcontent3', {
            duration: 1,
            y: '-100%',
            ease: Expo
        }, '<.5')
        .from('.boundingcontent4', {
            duration: 1,
            y: '-100%',
            ease: Expo
        }, '<.25')
        .from('.boundingcontent5', {
            duration: 1,
            y: '-100%',
            ease: Expo
        }, '<')

}

var timeout;

function circleSkew() {
    var xscale = 1;
    var yscale = 1;

    var xprev = 1;
    var yprev = 1;
    window.addEventListener("mousemove", function (details) {
        clearTimeout(timeout);
        xscale = gsap.utils.clamp(.8, 1.2, Math.abs(details.clientX - xprev));
        yscale = gsap.utils.clamp(.8, 1.2, Math.abs(details.clientY - yprev));

        xprev = details.clientX;
        yprev = details.clientY;

        circleMouseFollower(xscale, yscale);

        timeout = setTimeout(function () {
            document.querySelector("#minicircle").style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(1, 1)`;
        }, 100);
    });
}

function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function (details) {
        document.querySelector("#minicircle").style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(${xscale}, ${yscale})`;
    })
}

circleSkew();
circleMouseFollower();
firstPageAnim();

document.querySelectorAll(".group").forEach(function (group) {
    var rotate = 0;
    var diffrot = 0;

    group.addEventListener("mouseleave", function (dets) {
        gsap.to(group.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.3
        });
        gsap.to(group.querySelector("h1"), {
            opacity: 1,
            ease: Expo,
            duration: .5
        });
        gsap.to(group.querySelector("h5"), {
            opacity: 1,
            ease: Expo,
            duration: .5
        });
    });

    group.addEventListener("mousemove", function (dets) {
        var diff = dets.clientY - group.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(group.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot),
            duration: 0.3
        });
        gsap.to(group.querySelector("h1"), {
            opacity: .3,
            ease: Expo,
            duration: .5
        });
        gsap.to(group.querySelector("h5"), {
            opacity: .3,
            ease: Expo,
            duration: .5
        });
    });
});