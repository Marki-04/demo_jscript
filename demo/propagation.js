const parent = document.getElementById('parent');
const enfant = document.getElementById('enfant');

parent.addEventListener('click', e => {
    alert("Clic sur le parent")
}, {capture:true});

enfant.addEventListener('click', e => {
    alert("Clic sur l'enfant")
    // Stoppe la propagation à l'élément parent
    // event.stopPropagation();
});
