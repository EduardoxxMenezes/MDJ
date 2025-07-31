const form = document.querySelector("#inputs");
const botaoConfirmar = document.querySelector("#botaoConfirmar");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.querySelector("#nome").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#senha").value;
    const confPassword = document.querySelector("#confSenha").value;

    if (password !== confPassword) {
        alert("A senha e a confirmação de senha devem ser iguais!");
        return;
    }

    try {
        const fotoRes = await fetch("https://randomuser.me/api/");
        const fotoData = await fotoRes.json();
        const fotoPerfil = fotoData.results[0].picture.large;

        const res = await fetch("http://localhost:4000/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({ name, email, password, profilePic: fotoPerfil })
         
        });

        if (res.ok) {
            alert("CADASTRO REALIZADO COM SUCESSO!");
            window.location.href = "../../index.html";
        } else {
            const data = await res.json();
            alert(data.message || "Erro ao cadastrar");
        }
    } catch (error) {
        alert("Erro na requisição: " + error.message);
    }
});
