// Dapatkan elemen audio dari HTML
const birthdayAudio = document.getElementById('birthdayMusic');
const musicBtn = document.getElementById('musicBtn'); // Dapatkan juga elemen tombol musik

// Variabel untuk melacak status musik
// Ini adalah satu-satunya tempat variabel ini akan diubah secara langsung (selain saat inisialisasi)
let musicPlaying = false;

// Fungsi untuk memulai musik (tanpa mengubah status tombol)
function playAudio() {
    birthdayAudio.play().catch(error => {
        console.error("Gagal memutar audio:", error);
        // Mungkin tampilkan pesan ke pengguna jika autoplay diblokir
    });
}

// Fungsi untuk menghentikan musik (tanpa mengubah status tombol)
function stopAudio() {
    birthdayAudio.pause();
    birthdayAudio.currentTime = 0; // Kembalikan ke awal
}

// Fungsi untuk mengontrol tombol musik (ON/OFF)
function toggleMusic() {
    if (musicPlaying) {
        stopAudio();
        musicPlaying = false;
        musicBtn.textContent = 'Music OFF';
        musicBtn.classList.remove('playing');
    } else {
        playAudio();
        musicPlaying = true;
        musicBtn.textContent = 'Music ON';
        musicBtn.classList.add('playing');
    }
}

// Fungsi untuk menampilkan kartu ulang tahun
function showBirthday() {
    const nameInput = document.getElementById('nameInput');
    const name = nameInput.value.trim();
    
    // Validasi nama tidak boleh kosong
    if (name === '') {
        alert("HEY! What's your name?");
        nameInput.focus();
        return;
    }

    const inputSection = document.getElementById('inputSection');
    const birthdaySection = document.getElementById('birthdaySection');
    
    // Mulai animasi geser keluar untuk bagian input
    inputSection.classList.add('slide-out');
    
    // Mulai musik secara otomatis saat tombol "Let's Celebrate" ditekan
    // Kita panggil playAudio() dan kemudian perbarui status tombol secara manual
    playAudio();
    musicPlaying = true;
    musicBtn.textContent = 'Music ON';
    musicBtn.classList.add('playing');


    // Tunggu animasi geser keluar selesai (1 detik)
    setTimeout(() => {
        // Tampilkan nama yang dimasukkan pengguna
        document.getElementById('displayName').textContent = name;
        
        // Mulai animasi geser masuk untuk bagian ulang tahun
        birthdaySection.classList.add('slide-in');
        
        // Buat confetti setelah bagian ulang tahun terlihat
        setTimeout(() => {
            createConfetti();
        }, 500);
        
    }, 1000); // Sesuaikan dengan durasi transisi CSS
}

// Fungsi untuk kembali ke layar input nama
function goBack() {
    const inputSection = document.getElementById('inputSection');
    const birthdaySection = document.getElementById('birthdaySection');
    
    // Mulai animasi geser keluar untuk bagian ulang tahun
    birthdaySection.classList.remove('slide-in');
    
    // Hentikan musik saat kembali ke layar input dan reset status tombol
    stopAudio();
    musicPlaying = false;
    musicBtn.textContent = 'Music OFF';
    musicBtn.classList.remove('playing');

    // Tunggu animasi geser keluar selesai (1 detik)
    setTimeout(() => {
        // Reset bagian input dan fokuskan kembali input nama
        inputSection.classList.remove('slide-out');
        
        document.getElementById('nameInput').value = '';
        document.getElementById('nameInput').focus();
        
        // Hapus confetti yang ada
        const confetti = document.querySelectorAll('.confetti');
        confetti.forEach(c => c.remove());
    }, 1000); // Sesuaikan dengan durasi transisi CSS
}

// Fungsi untuk membuat efek confetti
function createConfetti() {
    const container = document.querySelector('.container');
    const colors = ['#f39c12', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6', '#f1c40f'];
    
    // Buat 50 potongan confetti
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            // Atur posisi acak di lebar kontainer
            confetti.style.left = Math.random() * 100 + '%';
            // Atur warna acak dari daftar warna
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            // Atur durasi animasi acak untuk variasi
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            container.appendChild(confetti);
            
            // Hapus confetti setelah animasinya selesai
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.remove();
                }
            }, 5000); // Sesuaikan dengan durasi animasi confetti-fall di CSS
        }, i * 100); // Tunda pembuatan setiap confetti sedikit
    }
}

// Tambahkan event listener agar tombol Enter juga bisa mengirim nama
document.getElementById('nameInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        showBirthday();
    }
});

// Fokuskan input nama saat halaman dimuat
window.onload = function() {
    document.getElementById('nameInput').focus();
};