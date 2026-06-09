const cartButtons = document.querySelectorAll(".add-to-cart");

cartButtons.forEach(button => {
    button.addEventListener("click", () => {
        const productName =
            button.parentElement.querySelector("h3").textContent;

        alert(`${productName} added to cart!`);
    });
});

let selectedAddress = "";

function closeLocationModal() {
    const modal = document.getElementById("location-modal");

    if (!modal) {
        return;
    }

    modal.classList.remove("modal-visible");
    modal.setAttribute("aria-hidden", "true");
}

function openLocation(branchName, address) {
    const modal = document.getElementById("location-modal");
    const branchNameElement = document.getElementById("modal-branch-name");
    const addressElement = document.getElementById("modal-address");

    if (!modal || !branchNameElement || !addressElement) {
        return;
    }

    selectedAddress = address;
    branchNameElement.textContent = branchName;
    addressElement.textContent = address;

    modal.classList.add("modal-visible");
    modal.setAttribute("aria-hidden", "false");
}

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("location-modal");
    const confirmButton = document.getElementById("confirm-btn");
    const cancelButton = document.getElementById("cancel-btn");

    if (!modal || !confirmButton || !cancelButton) {
        return;
    }

    confirmButton.addEventListener("click", () => {
        const mapsUrl =
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedAddress)}`;

        window.open(mapsUrl, "_blank");
        closeLocationModal();
    });

    cancelButton.addEventListener("click", closeLocationModal);

    modal.addEventListener("click", event => {
        if (event.target === modal) {
            closeLocationModal();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeLocationModal();
        }
    });
});
