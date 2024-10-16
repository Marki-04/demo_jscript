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

// Ajouter l'événement "change" pour detecter le changement de personnages
selectbalise.addEventListener('change', function() {
    const nomPersonnage = this.value; // Récupérer la valeur sélectionnée
    afficherInfoPersonnage(nomPersonnage); // Appeler la fonction pour afficher les infos
});


// Achat au magasin
const items_achetes = [];

document.getElementById("btnAjouter").addEventListener("click", function () {
    const table = document.getElementById("tableau");
    const rangees = table.querySelectorAll('tbody tr');
    const selectpers = document.getElementById('selectPirate');
    const personnge = selectpers.textContent;

    rangees.forEach((row, index)=>{
        const checkbox = row.getElementsByTagName('input');
        if (checkbox.checked){
            const nomitem = row.cells[0].textContent;
            const pvroff = row.cells[1].textContent;
            const pvrdeff = row.cells[2].textContent;
            const cout = row.cells[3].textContent;


        }

    });
});

// Ajout d'un objet au magasin

// Gestion des alerts