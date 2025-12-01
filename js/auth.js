import { apiRequest } from './api.js';

// Login User
async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Email dan Password wajib diisi");
        return;
    }

    const data = await apiRequest("/api/auth/login", {
        method: "POST",
        body: { email, password }
    });

    if (data.error) {
        alert(data.error);
    } else {
        alert("Login berhasil!");
        // Redirect ke dashboard atau home
        window.location.href = "dashboard.html";
    }
}

// Register User
async function registerUser() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password || !name) {
        alert("Semua data wajib diisi");
        return;
    }

    const data = await apiRequest("/api/auth/register", {
        method: "POST",
        body: { name, email, password }
    });

    if (data.error) {
        alert(data.error);
    } else {
        alert("Registrasi berhasil! Silakan login.");
        window.location.href = "login.html";
    }
}

// Expose fungsi ke window agar bisa dipanggil dari HTML onclick="..."
window.login = login;
window.registerUser = registerUser;