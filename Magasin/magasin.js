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
        document.getElementById('argent_pers').textContent = `Argent : $${personnage.argent}`;
    }
}

// Afficher le premier personnage de la classe
afficherInfoPersonnage(personnages[0].nom);

// Ajouter l'événement "change" pour detecter le changement de personnages
selectbalise.addEventListener('change', function() {
    const nomPersonnage = this.value; // Récupérer la valeur sélectionnée
    afficherInfoPersonnage(nomPersonnage); // Appeler la fonction pour afficher les infos
});


document.getElementById("btnAcheter").addEventListener("click", function () {
    const table = document.getElementById("tableau");
    const rangees = table.querySelectorAll('tbody tr');
    const selectpers = document.getElementById('selectPirate');
    const personnageAchat = personnages.find(p => p.nom === selectpers.value);

    rangees.forEach(row => {
        const checkbox = row.getElementsByTagName('input')[0];
        if (checkbox.checked) {
            const nomitem = row.cells[0].textContent;
            const pvroff = Number(row.cells[1].textContent);
            const pvrdeff = Number(row.cells[2].textContent);
            const cout = Number(row.cells[3].textContent.replace(' $', ''));

            if (personnageAchat.argent >= cout) {
                personnageAchat.atq += pvroff;
                personnageAchat.def += pvrdeff;
                personnageAchat.argent -= cout;

                alert(`${nomitem} acheté avec succès!`);
            } else {
                alert(`Pas assez d'argent pour acheter ${nomitem}.`);
            }
        }
        afficherInfoPersonnage(personnageAchat.nom);
    });
});

// Ajout d'un objet au magasin

// Classe pour le tableau
function Objet(nom, atq, def, argent) {
    this.nom = nom;
    this.atq = atq;
    this.def = def;
    this.argent = argent;
}

// Liste d'objets
let objets = [];

function AjouterTableau(objets){
    // Selectionner le tableau
    let tableaubody = document.querySelector('#tableau tbody');

    //Créer et remplir les cellules avec les objets
    objets.forEach(function (objet){
        let newRow = tableaubody.insertRow();
        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        let cell3 = newRow.insertCell(2);
        let cell4 = newRow.insertCell(3);
        let cell5 = newRow.insertCell(4);

        // Créer un checkbox
        let cb = document.createElement("input")
        cb.setAttribute("type", "checkbox");

        cell1.textContent = objet.nom
        cell2.textContent = objet.atq
        cell3.textContent = objet.def
        cell4.textContent = objet.argent + ' $'
        cell5.appendChild(cb)
    })
}

let obj1 = new Objet("Gros Marteau", 10,12, 23);
objets.push(obj1);
AjouterTableau(objets);


// Clic sur le bouton Ajouter
document.getElementById("btnAjouter").addEventListener("click", function () {
    event.preventDefault();

    // Récuperer les valeurs des champs
    let nom = document.getElementById("nom").value;
    let atq = Number(document.getElementById("puissOff").value)
    let def = Number(document.getElementById("puissDeff").value)
    let cout = Number(document.getElementById("cout").value)

    // Créer le nouvel Objet
    const objTemp = new Objet(nom, atq, def, cout);
    objets.push(objTemp);

    // Afficher le tableau
    AjouterTableau(objets);

    // Réinitialiser le formulaire
    document.querySelector('form').reset();
})


// Gestion des alerts