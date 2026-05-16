const navItems = document.querySelectorAll(".header__item");

function setActiveNavItem(item) {
    const navActive = document.querySelector(".header__item--active");

    navActive?.classList.remove("header__item--active");
    item.classList.add("header__item--active");
}

navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
        e.preventDefault();
        setActiveNavItem(item);
    });
});
