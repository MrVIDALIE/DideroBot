async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  const userText = input.value.trim();
  if (!userText) return;

  chatBox.innerHTML += `<div><strong>Élève:</strong> ${userText}</div>`;
  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch("https://diderobot-backend.onrender.com/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: userText })
    });

    const data = await response.json();
    if (!data.choices || !data.choices[0]) {
      chatBox.innerHTML += `<div><strong>DideRobot:</strong> Oups… je n’ai pas compris. Réessaie !</div>`;
      return;
    }

    const botReply = data.choices[0].message.content;
    chatBox.innerHTML += `<div><strong>DideRobot:</strong> ${botReply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (error) {
    chatBox.innerHTML += `<div><strong>DideRobot:</strong> Une erreur est survenue. Vérifie ta connexion.</div>`;
  }
}
