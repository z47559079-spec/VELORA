
/* =========================
   VELORA | JAVASCRIPT
========================= */

let currentLanguage = "fa";

// ---------- LANGUAGE SWITCH ----------

const languageToggle = document.getElementById("languageToggle");

function changeLanguage() {
    currentLanguage = currentLanguage === "fa" ? "en" : "fa";

    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === "fa" ? "rtl" : "ltr";

    document.body.classList.toggle("lang-en", currentLanguage === "en");

    languageToggle.textContent = currentLanguage === "fa" ? "EN" : "FA";

    document.querySelectorAll("[data-fa][data-en]").forEach(element => {
        element.innerHTML = element.getAttribute(
            currentLanguage === "fa" ? "data-fa" : "data-en"
        );
    });
}

languageToggle.addEventListener("click", changeLanguage);


// ---------- TOAST MESSAGE ----------

const toast = document.getElementById("toast");
let toastTimer;

function showToast(messageFa, messageEn) {
    toast.textContent = currentLanguage === "fa" ? messageFa : messageEn;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}


// ---------- FAVORITES ----------

let favorites = JSON.parse(localStorage.getItem("veloraFavorites")) || [];

function updateFavorites() {
    localStorage.setItem("veloraFavorites", JSON.stringify(favorites));
}

document.querySelectorAll("[data-fav]").forEach(button => {
    const id = button.dataset.fav;

    if (favorites.includes(id)) {
        button.classList.add("active");
        button.textContent = "♥";
    }

    button.addEventListener("click", () => {
        if (favorites.includes(id)) {
            favorites = favorites.filter(item => item !== id);

            button.classList.remove("active");
            button.textContent = "♡";

            showToast(
                "از علاقه‌مندی‌ها حذف شد",
                "Removed from favorites"
            );
        } else {
            favorites.push(id);

            button.classList.add("active");
            button.textContent = "♥";

            showToast(
                "به علاقه‌مندی‌ها اضافه شد ♥",
                "Added to favorites ♥"
            );
        }

        updateFavorites();
    });
});


// ---------- ADD TO BAG ----------

document.querySelectorAll(".quick-add").forEach(button => {
    button.addEventListener("click", () => {
        showToast(
            "عطر به سبد خرید شما اضافه شد ✨",
            "Perfume added to your bag ✨"
        );
    });
});


// ---------- NEWSLETTER ----------

const newsletterForm = document.getElementById("newsletterForm");

newsletterForm.addEventListener("submit", function(event) {
    event.preventDefault();

    showToast(
        "با موفقیت عضو خبرنامه VELORA شدی ✨",
        "Welcome to the VELORA newsletter ✨"
    );

    newsletterForm.reset();
});


// ---------- SCROLL REVEAL ----------

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

revealElements.forEach(element => {
    observer.observe(element);
});


// ---------- INITIALIZE ----------

window.addEventListener("load", () => {
    document.querySelectorAll(".hero .reveal").forEach(element => {
        element.classList.add("visible");
    });
});
