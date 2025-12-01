function loadData() {
    fetch("/get-data")
    .then(r => r.json())
    .then(data => {
        const tbody = document.getElementById("dataTable");
        tbody.innerHTML = "";

        data.forEach(item => {
            tbody.innerHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.platform}</td>
                    <td>${item.price}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="openEdit(${item.id})">แก้ไข</button>
                    </td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="del(${item.id})">ลบ</button>
                    </td>
                </tr>
            `;
        });

        document.getElementById("totalUsers").innerText =
            "จำนวนผู้ลงทะเบียนทั้งหมด: " + data.length;

        document.getElementById("totalRevenue").innerText =
            "ยอดเงินรวมทั้งหมด: " + data.reduce((sum, x) => sum + Number(x.price), 0) + " บาท";
    });
}


function del(id) {
    fetch(`/delete/${id}`, { method: "DELETE" })
        .then(() => loadData());
}

function openEdit(id) {
    fetch("/get-data")
    .then(r => r.json())
    .then(list => {
        const d = list.find(x => x.id === id);

        document.getElementById("edit_id").value = d.id;
        document.getElementById("edit_name").value = d.name;
        document.getElementById("edit_email").value = d.email;
        document.getElementById("edit_package").value = d.platform || d.package; // ตามข้อมูลจริง
        document.getElementById("edit_price").value = d.price;

        new bootstrap.Modal(document.getElementById("editModal")).show();
    });
}

function saveEdit() {
    const id = document.getElementById("edit_id").value;

    const body = {
        name: document.getElementById("edit_name").value,
        email: document.getElementById("edit_email").value,
        platform: document.getElementById("edit_package").value,
        price: document.getElementById("edit_price").value
    };

    fetch(`/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })
    .then(() => {
        loadData();
        bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();
    });
}

loadData();
document.getElementById("saveEditBtn").addEventListener("click", saveEdit);