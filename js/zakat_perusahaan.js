const nasab = 91681728

const inputsUang = document.querySelectorAll('.format-uang');
inputsUang.forEach(input => {
    input.addEventListener('keyup', function(e) {
        this.value = formatRupiah(this.value);
        hitungZakatPerusahaan(); 
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

let subMenuAktif = 'jasa'; 

const btnJasa = document.getElementById('btn-jasa');
const btnDagang = document.getElementById('btn-dagang');
const formJasa = document.getElementById('sub-form-jasa');
const formDagang = document.getElementById('sub-form-dagang');
const hasilZakatElement = document.getElementById("hasil-zakat");

btnJasa.addEventListener('click', (e) => {
    e.preventDefault();
    subMenuAktif = 'jasa';
    
    btnJasa.classList.add('active');
    btnDagang.classList.remove('active');
    
    formJasa.classList.remove('hidden');
    formDagang.classList.add('hidden');
    
    hasilZakatElement.value = "0";
    hitungZakatPerusahaan();
});

btnDagang.addEventListener('click', (e) => {
    e.preventDefault();
    subMenuAktif = 'dagang';
    
    btnDagang.classList.add('active');
    btnJasa.classList.remove('active');
    
    formDagang.classList.remove('hidden');
    formJasa.classList.add('hidden');
    
    hasilZakatElement.value = "0";
    hitungZakatPerusahaan();
});

function hitungZakatPerusahaan() {
    let zakat = 0;

    if (subMenuAktif === 'jasa') {
        let pendapatan = bersihkanAngka(document.getElementById("pendapatan-jasa").value);
        if (pendapatan > nasab){
            zakat = pendapatan * 0.025;
        }
    } 
    else if (subMenuAktif === 'dagang') {
        let aktiva = bersihkanAngka(document.getElementById("aktiva-lancar").value);
        let pasiva = bersihkanAngka(document.getElementById("pasiva-lancar").value);
        let selisih = aktiva - pasiva;
        if (selisih > 0 && selisih > nasab) {
            zakat = selisih * 0.025;
        }
    }

    hasilZakatElement.value = formatRupiah(Math.round(zakat).toString());
}