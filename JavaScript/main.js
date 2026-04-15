const tbody = document.getElementById("tableBody");

let filters = {
    name: "",
    coat: "",
    purpose: "",
    size: "",
    activityFrom: "",
    activityTo: ""
};

let sortLevels = [
    { field: "none", order: "asc" },
    { field: "none", order: "asc" },
    { field: "none", order: "asc" }
];

function renderTable(data) {
    tbody.innerHTML = "";

    data.forEach((dog, index) => {
        const row = `<tr>
            <td>${index + 1}</td>
            <td>${dog.name.trim()}</td>
            <td>${dog.size.trim()}</td>
            <td>${dog.coat.trim()}</td>
            <td>${dog.purpose.trim()}</td>
            <td>${dog.activity.trim()}</td>
            <td>${dog.apartment.trim()}</td>
        </tr>`;

        tbody.innerHTML += row;
    });
}

function filterData(data) {
    return data.filter(dog => {
        const nameMatch = !filters.name || dog.name.toLowerCase().includes(filters.name.toLowerCase());
        const coatMatch = !filters.coat || dog.coat.toLowerCase().includes(filters.coat.toLowerCase());
        const purposeMatch = !filters.purpose || dog.purpose.toLowerCase().includes(filters.purpose.toLowerCase());
        const sizeMatch = !filters.size || dog.size.toLowerCase().includes(filters.size.toLowerCase());

        return nameMatch && coatMatch && purposeMatch && sizeMatch;
    });
}

function sortData(data) {
    return [...data].sort((a, b) => {
        for (let i = 0; i < 3; i++) {
            const { field, order } = sortLevels[i];

            if (field !== "none") {
                let valA = a[field] ? a[field].trim() : "";
                let valB = b[field] ? b[field].trim() : "";

                if (field === "size") {
                    const sizeMap = {
                        "маленький": 1,
                        "средний": 2,
                        "большой": 3,
                        "гигантский": 4
                    };
                    valA = sizeMap[valA] || 0;
                    valB = sizeMap[valB] || 0;
                }

                if (field === "activity") {
                    const activityMap = {
                        "низкая": 1,
                        "средняя": 2,
                        "высокая": 3
                    };
                    valA = activityMap[valA] || 0;
                    valB = activityMap[valB] || 0;
                }

                let cmp = 0;
                if (valA > valB) cmp = 1;
                else if (valA < valB) cmp = -1;

                if (cmp !== 0) {
                    return order === "asc" ? cmp : -cmp;
                }
            }
        }

        return 0;
    });
}

function getPreparedData() {
    const filtered = filterData(dogs);
    const sorted = sortData(filtered);
    return sorted;
}

function updateTable() {
    const prepared = getPreparedData();
    renderTable(prepared);

    if (typeof VIZ !== "undefined") {
        VIZ.render(prepared);
    }
}

function updateSortOptions() {
    const usedFields = sortLevels
        .filter(level => level.field !== "none")
        .map(level => level.field);

    for (let i = 0; i < 3; i++) {
        const select = document.getElementById(`sort${i + 1}Field`);
        if (!select) continue;

        const currentField = sortLevels[i].field;

        for (const opt of select.options) {
            if (opt.value !== "none" && opt.value !== currentField) {
                opt.disabled = usedFields.includes(opt.value);
            } else {
                opt.disabled = false;
            }
        }
    }
}

window.getPreparedDogsData = getPreparedData;

document.addEventListener("DOMContentLoaded", () => {
    const filterSize = document.getElementById("filterSize");
    const filterCoat = document.getElementById("filterCoat");
    const filterPurpose = document.getElementById("filterPurpose");

    if (filterSize) {
        filterSize.addEventListener("change", e => {
            filters.size = e.target.value;
            updateTable();
        });
    }

    if (filterCoat) {
        filterCoat.addEventListener("change", e => {
            filters.coat = e.target.value;
            updateTable();
        });
    }

    if (filterPurpose) {
        filterPurpose.addEventListener("change", e => {
            filters.purpose = e.target.value;
            updateTable();
        });
    }

    for (let i = 0; i < 3; i++) {
        const fieldSelect = document.getElementById(`sort${i + 1}Field`);
        const orderSelect = document.getElementById(`sort${i + 1}Order`);

        if (fieldSelect) {
            fieldSelect.addEventListener("change", e => {
                sortLevels[i].field = e.target.value;
                updateSortOptions();
                updateTable();
            });
        }

        if (orderSelect) {
            orderSelect.addEventListener("change", e => {
                sortLevels[i].order = e.target.value;
                updateTable();
            });
        }
    }

    const findBtn = document.getElementById("findBtn");
    const clearBtn = document.getElementById("clearBtn");

    if (findBtn) {
        findBtn.addEventListener("click", () => {
            filters.name = document.getElementById("structure").value;
            filters.coat = document.getElementById("category").value;
            filters.purpose = document.getElementById("country").value;
            filters.size = document.getElementById("city").value;

            updateTable();
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            document.getElementById("filter").reset();

            filters = {
                name: "",
                coat: "",
                purpose: "",
                size: "",
                activityFrom: "",
                activityTo: ""
            };

            updateTable();
        });
    }

    updateSortOptions();
    updateTable();
});