// ********* SECTION DE GESTION DES PERSONNAGES ET LEURS ATTRIBUTS **********

// Classe des personnages
const Personnage = class {
    constructor(nom, atq, def, argent ) {
        this.nom = nom;
        this.atq = atq;
        this.def = def;
        this.argent = argent;
    }
};
// Ajouter les deux personnages dans la classe
const personnage1 =  new Personnage('Bob le bricoleur',12,40,500);
const personnage2 = new Personnage('Jacques le pirate',30,23,350);

// Ajouter les personnages dans un tableau
const personnages = [personnage1, personnage2];


// Récupérer l'élément select
const selectbalise = document.querySelector('select');
// Ajouter chaque personnage au select sous forme d'option
personnages.forEach(personnage => {
    const nouvelleOption = document.createElement('option');
    nouvelleOption.value = personnage.nom; // Utiliser le nom comme valeur
    nouvelleOption.textContent = personnage.nom; // Texte visible dans le select
    selectbalise.appendChild(nouvelleOption); // Ajouter l'option au select
});
// Fonction pour afficher les informations du personnage sélectionné
function afficherInfoPersonnage(nomPersonnage) {
    // Trouver le personnage correspondant
    const personnage = personnages.find(p => p.nom === nomPersonnage);

    // Si le personnage existe, afficher ses informations
    if (personnage) {
        document.getElementById('attaque_pers').textContent = `Attaque : ${personnage.atq}`;
        document.getElementById('defense_pers').textContent = `Défense : ${personnage.def}`;
        document.getElementById('argent_pers').textContent = `Argent : $${personnage.argent.toFixed(2)}`;
    }
}

// Afficher le premier personnage de la classe
afficherInfoPersonnage(personnages[0].nom);

// Ajouter l'événement "change" pour detecter le changement de personnages
selectbalise.addEventListener('change', function() {
    const nomPersonnage = this.value; // Récupérer la valeur sélectionnée
    afficherInfoPersonnage(nomPersonnage); // Appeler la fonction pour afficher les infos
});


// ********* SECTION D'ACHAT D'ARTICLES, GESTION DES ATTRIBUTS DES PERSONNAGES AVEC LES ARTICLES **********

document.getElementById("btnAcheter").addEventListener("click", function () {
    const table = document.getElementById("tableau");
    const rangees = table.querySelectorAll('tbody tr');
    const selectpers = document.getElementById('selectPirate');
    const personnageAchat = personnages.find(p => p.nom === selectpers.value);

    rangees.forEach(row => {
        const checkbox = row.getElementsByTagName('input')[0];
        // Récupérer les lignes à supprimer après l'achat
        let lignesASupprimer = [];
        // Variable pour vérifier si un achat a réussi
        let achatReussi = false;

        if (checkbox.checked) {
            const nomitem = row.cells[0].textContent;
            const pvroff = Number(row.cells[1].textContent);
            const pvrdeff = Number(row.cells[2].textContent);
            const cout = Number(row.cells[3].textContent.replace(' $', ''));

            if (personnageAchat.argent >= cout) {
                personnageAchat.atq += pvroff;
                personnageAchat.def += pvrdeff;
                personnageAchat.argent -= cout;

                // Ajouter la ligne à la liste des lignes à supprimer
                lignesASupprimer.push(row);
                achatReussi = true;
            } else {
                alert(`Pas assez d'argent pour acheter ${nomitem}.`);
            }
        }
        // Supprimer les lignes du tableau
        lignesASupprimer.forEach(row => row.remove());

        // Afficher le message de confirmation si l'achat a réussi
        const confirmationMessage = document.getElementById("confirmationMessage");
        // Vider le message de confirmation
        confirmationMessage.textContent = ''
        if (achatReussi) {
            const messages = [
                "Merci de votre achat !",
                "Cela vous va à ravir !",
                "Mort à vos ennemis !"];

            // Randomiser les messages de confirmation
            confirmationMessage.textContent = messages[Math.floor(Math.random() * messages.length)];
            confirmationMessage.style.display = "block"; // Afficher le message
        }
        else {
            confirmationMessage.style.display = "none"; // Cacher le message si aucun achat n'est fait
        }
        // Mettre à jour l'affichage des informations du personnage
        afficherInfoPersonnage(personnageAchat.nom);
    });
});


// ********* SECTION D'AJOUT D'ARTICLES **********

// Classe pour le tableau
function Objet(nom, atq, def, argent) {
    this.nom = nom;
    this.atq = atq;
    this.def = def;
    this.argent = argent;
}

// Liste d'objets
let objets = [];

// Objets qui se trouveront dans le magasin
let obj1 = new Objet("Gros Marteau", 10,12, 23);
let obj2 = new Objet("Pantoufles discrètes", 0,8, 200);
let obj3 = new Objet("Sabre laser", 20,-5, 400);
let obj4 = new Objet("Plastron de receveur", 15,15, 75);
let obj5 = new Objet("Moulinet", 4,6, 15);
// Ajouter les objets dans la liste des objets et les afficher dans le tableau
objets.push(obj1, obj2, obj3, obj4, obj5);

// Fonction pour remplir le tableau d'objets prédéfinis
function remplirTableau() {
    objets.forEach(function(objet) {
        AjouterObjet(objet); // Ajouter chaque objet au tableau
    });
}
remplirTableau();

function AjouterObjet(objet) {
    // Sélectionner le corps du tableau
    let tableaubody = document.querySelector('#tableau tbody');

    // Créer une nouvelle ligne
    let newRow = tableaubody.insertRow();
    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);
    let cell4 = newRow.insertCell(3);
    let cell5 = newRow.insertCell(4);

    // Créer un checkbox
    let cb = document.createElement("input");
    cb.setAttribute("type", "checkbox");

    // Remplir les cellules avec les informations de l'objet
    cell1.textContent = objet.nom;
    cell2.textContent = objet.atq;
    cell3.textContent = objet.def;
    cell4.textContent = objet.argent.toFixed(2) + ' $';
    cell5.appendChild(cb);
}

// Clic sur le bouton Ajouter
document.getElementById("btnAjouter").addEventListener("click", function () {
    event.preventDefault();

    // Récuperer les valeurs des champs
    let nom = document.getElementById("nom").value;
    let atq = Number(document.getElementById("puissOff").value)
    let def = Number(document.getElementById("puissDeff").value)
    let cout = Number(document.getElementById("cout").value)

    // Validation des champs
    if (nom.length < 3 || nom.length > 30) {
        alert("Le nom doit avoir entre 3 et 30 caractères.");
        return; // Sortir de la fonction si la validation échoue
    }

    if (!Number.isInteger(atq) || atq < -50 || atq > 100) {
        alert("La puissance offensive doit être un entier entre -50 et 100.");
        return;
    }

    if (!Number.isInteger(def) || def < -50 || def > 100) {
        alert("La puissance défensive doit être un entier entre -50 et 100.");
        return;
    }

    if (isNaN(cout) || cout <= 0) {
        alert("Le coût doit être un nombre réel positif.");
        return;
    }

    // Créer le nouvel Objet
    const objTemp = new Objet(nom, atq, def, cout);
    objets.push(objTemp);

    // Afficher le tableau
    AjouterObjet(objTemp);

    // Réinitialiser le formulaire
    document.querySelector('form').reset();
})


// Gestion des alerts