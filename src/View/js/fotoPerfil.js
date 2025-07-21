const label = document.querySelector("label")

function onEnter()  {
    label.classList.add("active")
}

function onLeave()  {
    label.classList.remove("active")
}

label.addEventListener("dragenter", onEnter);
label.addEventListener("drop", onLeave);
label.addEventListener("dregend", onLeave);
label.addEventListener("dragleave", onLeave);

const input = document.querySelector("#file");
const dropzone = document.querySelector("#drop-zone")

input.addEventListener("change", event => {
    if(input.files.length > 0) {
        const type = input.files[0].type
        const formats = ["image/jpeg", "image/png", "image/jpg"]
        if(!formats.includes(type)){
            alert("Selecione uma imagem JPEG, PNG ou JPEG")
            return;
        }

        if(document.querySelector("#cover")){
            dropzone.removeChild(document.querySelector("#cover"))
        }

        const img = document.createElement("img");
        img.id = "cover";
        img.src = URL.createObjectURL(input.files[0]);

        dropzone.appendChild(img);
    }
})