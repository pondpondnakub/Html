document.getElementById("platform").addEventListener("change", () => {
    const p = document.getElementById("platform").value;
    const price = p === "PC" ? 150 : p === "Mobile" ? 100 : 200;
    document.getElementById("price").value = price;
});

function register() {
    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        platform: document.getElementById("platform").value,
        price: document.getElementById("price").value
    };

    fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(r => r.json())
    .then(res => {
        document.getElementById("status").innerText = res.message;
    });
}
