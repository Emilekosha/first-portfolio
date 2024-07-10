const prenomInput = document.getElementById('prenom');
const nomInput = document.getElementById('nom');
const emailInput = document.getElementById('email');
const messageTextarea = document.getElementById('message');
const contactForm = document.getElementById('contact-form');
const messagesContainer = document.getElementById('messages-container');

contactForm.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault(); // Empêche le rechargement par défaut de la page

    const prenom = prenomInput.value;
    const nom = nomInput.value;
    const email = emailInput.value;
    const message = messageTextarea.value;

    // Stocker les messages dans le stockage local
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    storedMessages.push({ prenom, nom, email, message });
    localStorage.setItem('messages', JSON.stringify(storedMessages));

    // Afficher les nouveaux messages
    displayMessages();

    // Envoyer les données au serveur en utilisant JSONPlaceholder
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prenom, nom, email, message })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Données envoyées au serveur:', data);
        // Gérer la réponse du serveur (par exemple, afficher un message de succès ou d'erreur)
    })
    .catch(error => {
        console.error("Erreur lors de l'envoi des données:", error);
    });
}

function displayMessages() {
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    messagesContainer.innerHTML = ''; // Vider le conteneur des messages
    storedMessages.forEach((msg, index) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerHTML = `
            <p><strong>Prénom:</strong> ${msg.prenom}</p>
            <p><strong>Nom:</strong> ${msg.nom}</p>
            <p><strong>Email:</strong> ${msg.email}</p>
            <p><strong>Message:</strong> ${msg.message}</p>
            <button onclick="deleteMessage(${index})">Supprimer</button>
        `;
        messagesContainer.appendChild(messageElement);
    });
}

// Fonction pour supprimer un message
function deleteMessage(index) {
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    storedMessages.splice(index, 1); // Supprimer le message à l'index donné
    localStorage.setItem('messages', JSON.stringify(storedMessages));
    displayMessages(); // Mettre à jour l'affichage
}

// Afficher les messages lors du chargement de la page
window.onload = displayMessages;
