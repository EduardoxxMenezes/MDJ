document.addEventListener("DOMContentLoaded", () => {

    const fotoBtn = document.getElementById("fotoBtn");
    const divInfos = document.getElementById("divInfos");


    if (fotoBtn) {
        fotoBtn.addEventListener("click", (e) => {
            divInfos.classList.toggle("hidden");
        });
    }
});