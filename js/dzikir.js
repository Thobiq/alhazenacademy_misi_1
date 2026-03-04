let count = 0;
const display = document.getElementById('angka');
const notif = document.getElementById('notif');
const targetInp = document.getElementById('target');

function tambah() {
    count++;
    display.innerText = count;
    cekTarget();
}

function kurang() {
    if(count > 0) {
        count--;
        display.innerText = count;
        cekTarget();
    }
}

function reset() {
    count = 0;
    display.innerText = count;
    notif.style.display = 'none';
}

function cekTarget() {
    let target = parseInt(targetInp.value);
    if(target && count >= target && count !== 0) {
        notif.style.display = 'block';
    } else {
        notif.style.display = 'none';
    }
}

document.getElementById('hamburger').addEventListener('click', function() {
    document.getElementById('navLinks').classList.toggle('show');
});