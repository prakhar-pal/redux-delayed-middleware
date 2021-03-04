export default function nameChangeHandler(onChange){
    const nameEl = document.getElementById('name');
    nameEl.onkeydown = e => {
        onChange(e.target.value);
    }
    function updateName(name){
        nameEl.innerHTML = name;
    }
    return updateName;
}