const NISAB_TAHUN = 91681728; 

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("nisab-tahun").value = formatRupiah(NISAB_TAHUN.toString());
});

const inputsUang = document.querySelectorAll('.format-uang');
inputsUang.forEach(input => {
    input.addEventListener('keyup', function(e) {
        this.value = formatRupiah(this.value);
        hitungZakatPerdagangan(); 
    });
});

function formatRupiah(angka) {
    let number_string = angka.replace(/[^,\d]/g, '').toString(),
        split = number_string.split(','),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
        let separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }
    return rupiah;
}

function bersihkanAngka(rupiah) {
    return parseInt(rupiah.replace(/\./g, '')) || 0;
}

function hitungZakatPerdagangan() {
    let asetLancar = bersihkanAngka(document.getElementById("aset-lancar").value);
    let laba = bersihkanAngka(document.getElementById("laba").value);
    let hasilZakatElement = document.getElementById("hasil-zakat");
    
    let totalHarta = asetLancar + laba;

    if (totalHarta >= NISAB_TAHUN) {
        let zakat = totalHarta * 0.025;
        hasilZakatElement.value = formatRupiah(Math.round(zakat).toString());
    } else {
        hasilZakatElement.value = "0";
    }
}