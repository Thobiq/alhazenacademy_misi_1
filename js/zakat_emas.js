// --- KONFIGURASI NISAB ---
const NISAB_EMAS_GRAM = 85; 

// --- FUNGSI FORMAT UANG ---
const inputsUang = document.querySelectorAll('.format-uang');
inputsUang.forEach(input => {
    input.addEventListener('keyup', function(e) {
        this.value = formatRupiah(this.value);
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

// --- EVENT LISTENER UNTUK PERHITUNGAN OTOMATIS ---
// Menggunakan class 'input-hitung' agar perhitungan berjalan saat mengetik di field manapun
const inputsHitung = document.querySelectorAll('.input-hitung');
inputsHitung.forEach(input => {
    input.addEventListener('keyup', hitungZakatEmas);
    input.addEventListener('change', hitungZakatEmas); // Mengakomodasi jika pengguna klik tanda panah atas/bawah di input number
});

// --- FUNGSI PERHITUNGAN ZAKAT EMAS ---
function hitungZakatEmas() {
    // Ambil nilai gram (bisa berupa angka desimal, jadi pakai parseFloat)
    let jumlahEmas = parseFloat(document.getElementById("jumlah-emas").value) || 0;
    
    // Ambil nilai harga (bersihkan dari format titik rupiah)
    let hargaEmas = bersihkanAngka(document.getElementById("harga-emas").value);
    
    let hasilZakatElement = document.getElementById("hasil-zakat");

    // Cek apakah mencapai nisab 85 gram
    if (jumlahEmas >= NISAB_EMAS_GRAM) {
        // Hitung total nilai emas dalam Rupiah
        let nilaiTotalEmas = jumlahEmas * hargaEmas;
        
        // Hitung zakat 2.5%
        let zakat = nilaiTotalEmas * 0.025;
        hasilZakatElement.value = formatRupiah(Math.round(zakat).toString());
    } else {
        // Jika emas di bawah 85 gram, tidak wajib zakat
        hasilZakatElement.value = "0";
    }
}