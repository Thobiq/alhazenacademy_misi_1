
const HARGA_EMAS = 1300000;
const NISAB_TAHUN = HARGA_EMAS * 85; 
const NISAB_BULAN = NISAB_TAHUN / 12;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("nisab-tahun").value = formatRupiah(NISAB_TAHUN.toString());
    document.getElementById("nisab-bulan").value = formatRupiah(Math.round(NISAB_BULAN).toString());
});

const inputsUang = document.querySelectorAll('.format-uang');

inputsUang.forEach(input => {
    input.addEventListener('keyup', function(e) {
        this.value = formatRupiah(this.value);
        hitungZakatPenghasilan(); 
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

function hitungZakatPenghasilan() {
    let gaji = bersihkanAngka(document.getElementById("gaji").value);
    let lainnya = bersihkanAngka(document.getElementById("lainnya").value);
    
    let totalPenghasilan = gaji + lainnya;

    let hasilZakatElement = document.getElementById("hasil-zakat");

    if (totalPenghasilan >= NISAB_BULAN) {
        let zakat = totalPenghasilan * 0.025;
        hasilZakatElement.value = formatRupiah(Math.round(zakat).toString());
    } else {
        hasilZakatElement.value = "0";
    }
}