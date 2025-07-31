const senha1 = document.getElementById('senha1');
const senha2 = document.getElementById('senha2');
const botao = document.getElementById('botao');
const mensagem = document.getElementById('mensagem');

botao.addEventListener('click', async (e) => {
    e.preventDefault();
    if (senha1.value === senha2.value && senha1.value !== "") {

        const userId = localStorage.getItem("userId");
        if (!userId) {
            mensagem.textContent = "Usuário não identificado.";
            return;
        }
        const resposta = await fetch(`http://localhost:4000/api/user/${userId}/senha`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ novaSenha: senha1.value })
        });
        if (resposta.ok) {
            alert("Senha alterada com sucesso!");
            senha1.value = "";
            senha2.value = "";
            mensagem.textContent = "";
        } else {
            mensagem.textContent = "Erro ao atualizar senha.";
        }
    } else {
        mensagem.textContent = "As senhas não coincidem.";
    }
});