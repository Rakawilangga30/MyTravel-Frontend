const BASE = window.API_BASE || 'http://localhost:8080';

export async function apiRequest(path, { method = 'GET', body, headers = {} } = {}) {
    const opts = {
        method,
        headers: { ...headers },
        credentials: 'include', // <--- WAJIB: Agar Cookie Session dikirim ke Backend
    };

    if (body instanceof FormData) {
        // Jika FormData (upload foto), jangan set Content-Type (biar browser yang atur boundary)
        opts.body = body;
    } else if (body) {
        // Jika JSON biasa
        opts.body = JSON.stringify(body);
        opts.headers['Content-Type'] = 'application/json';
    }

    try {
        const res = await fetch(BASE + path, opts);
        const text = await res.text();
        try {
            return JSON.parse(text);
        } catch (e) {
            return text;
        }
    } catch (err) {
        console.error("API Error:", err);
        return { error: "Gagal terhubung ke server" };
    }
}