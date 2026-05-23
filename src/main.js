const navItems = document.querySelectorAll(".header__item");

function setActiveNavItem(item) {
    const navActive = document.querySelector(".header__item--active");

    navActive?.classList.remove("header__item--active");
    item.classList.add("header__item--active");
}

navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
        if (item.getAttribute("href") === "#!") {
            e.preventDefault();
        }

        setActiveNavItem(item);
    });
});

const testimonialList = document.querySelector(".testimonial__list");
const testimonialCards = document.querySelectorAll(".testimonial-card");
const testimonialDotsWrapper = document.querySelector(".testimonial__dots");
let testimonialDots = [];
let activeTestimonialPage = 0;

function getTestimonialCardsPerPage() {
    if (!testimonialList || testimonialCards.length === 0) {
        return 1;
    }

    const firstCard = testimonialCards[0];
    const cardWidth = firstCard.offsetWidth;
    const listStyle = getComputedStyle(testimonialList);
    const cardGap = parseFloat(listStyle.columnGap) || 0;

    if (cardWidth === 0) {
        return 1;
    }

    return Math.max(
        1,
        Math.floor(
            (testimonialList.clientWidth + cardGap) / (cardWidth + cardGap),
        ),
    );
}

function getTestimonialPageCount() {
    const cardsPerPage = getTestimonialCardsPerPage();

    return Math.ceil(testimonialCards.length / cardsPerPage);
}

function updateActiveTestimonialDot(activeIndex) {
    testimonialDots.forEach((dot, index) => {
        dot.classList.toggle("testimonial__dot--active", index === activeIndex);
    });
}

function renderTestimonialDots() {
    if (!testimonialDotsWrapper || testimonialCards.length === 0) {
        return;
    }

    const pageCount = getTestimonialPageCount();

    if (testimonialDots.length === pageCount) {
        updateActiveTestimonialDot(activeTestimonialPage);
        return;
    }

    testimonialDotsWrapper.innerHTML = "";
    testimonialDots = [];

    for (let index = 0; index < pageCount; index++) {
        const dot = document.createElement("button");

        dot.type = "button";
        dot.className = "testimonial__dot";
        dot.setAttribute("aria-label", `Show testimonial page ${index + 1}`);
        dot.addEventListener("click", () => {
            scrollToTestimonialPage(index);
        });

        testimonialDotsWrapper.append(dot);
        testimonialDots.push(dot);
    }

    updateActiveTestimonialDot(activeTestimonialPage);
}

function scrollToTestimonialPage(pageIndex) {
    if (!testimonialList || testimonialCards.length === 0) {
        return;
    }

    const cardsPerPage = getTestimonialCardsPerPage();
    const pageCount = getTestimonialPageCount();
    const nextPageIndex = Math.min(pageIndex, pageCount - 1);
    const targetCardIndex = Math.min(
        nextPageIndex * cardsPerPage,
        testimonialCards.length - 1,
    );
    const targetCard = testimonialCards[targetCardIndex];

    activeTestimonialPage = nextPageIndex;
    testimonialList.scrollTo({
        left: targetCard.offsetLeft - testimonialList.offsetLeft,
        behavior: "smooth",
    });
    updateActiveTestimonialDot(nextPageIndex);
}

renderTestimonialDots();

window.addEventListener("resize", () => {
    renderTestimonialDots();
    scrollToTestimonialPage(activeTestimonialPage);
});
