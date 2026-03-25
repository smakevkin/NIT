const tbody = document.getElementById("tableBody");

// 🔹 ФИЛЬТРЫ
let filters = {
    size: "all",
    coat: "all",
    purpose: "all"
};

// 🔹 СОРТИРОВКА (3 уровня)
let sortLevels = [
    { field: "none", order: "asc" },
    { field: "none", order: "asc" },
    { field: "none", order: "asc" }
];

// 🔹 РЕНДЕР ТАБЛИЦЫ
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

// 🔹 ФИЛЬТРАЦИЯ
function filterData(data) {
    return data.filter(dog => {
        const sizeMatch = filters.size === "all" || dog.size.trim() === filters.size;
        const coatMatch = filters.coat === "all" || dog.coat.trim() === filters.coat;
        const purposeMatch = filters.purpose === "all" || dog.purpose.trim() === filters.purpose;
        return sizeMatch && coatMatch && purposeMatch;
    });
}

// 🔹 СОРТИРОВКА (ВСЕ 3 УРОВНЯ)
function sortData(data) {
    return [...data].sort((a, b) => {
        for (let i = 0; i < 3; i++) {
            const { field, order } = sortLevels[i];
            
            if (field !== "none") {
                // 🔥 ВАЖНО: .trim() убирает пробелы из data.js
                let valA = a[field] ? a[field].trim() : "";
                let valB = b[field] ? b[field].trim() : "";
                
                // Словарь для size
                if (field === "size") {
                    const sizeMap = { "маленький": 1, "средний": 2, "большой": 3, "гигантский": 4 };
                    valA = sizeMap[valA] || 0;
                    valB = sizeMap[valB] || 0;
                }
                
                // Словарь для activity
                if (field === "activity") {
                    const activityMap = { "низкая": 1, "средняя": 2, "высокая": 3 };
                    valA = activityMap[valA] || 0;
                    valB = activityMap[valB] || 0;
                }
                
                // Сравниваем
                let cmp = 0;
                if (valA > valB) cmp = 1;
                else if (valA < valB) cmp = -1;
                
                // Если значения РАЗНЫЕ - возвращаем результат
                if (cmp !== 0) {
                    return order === "asc" ? cmp : -cmp;
                }
                // Если РАВНЫЕ - переходим к следующему уровню
            }
        }
        return 0;
    });
}

// 🔹 ОБНОВЛЕНИЕ ТАБЛИЦЫ
function updateTable() {
    let filtered = filterData(dogs);
    let sorted = sortData(filtered);
    renderTable(sorted);
}

// 🔹 БЛОКИРОВКА ПОВТОРНЫХ ПОЛЕЙ
function updateSortOptions() {
    const usedFields = sortLevels
        .filter(l => l.field !== "none")
        .map(l => l.field);
    
    for (let i = 0; i < 3; i++) {
        const select = document.getElementById(`sort${i + 1}Field`);
        if (!select) continue;
        
        const currentField = sortLevels[i].field;
        
        for (let opt of select.options) {
            if (opt.value !== "none" && opt.value !== currentField) {
                opt.disabled = usedFields.includes(opt.value);
            } else {
                opt.disabled = false;
            }
        }
    }
}

// 🔹 ИНИЦИАЛИЗАЦИЯ
document.addEventListener("DOMContentLoaded", () => {
    // Фильтры
    const filterSize = document.getElementById("filterSize");
    const filterCoat = document.getElementById("filterCoat");
    const filterPurpose = document.getElementById("filterPurpose");
    
    if (filterSize) filterSize.addEventListener("change", e => {
        filters.size = e.target.value;
        updateTable();
    });

    if (filterCoat) filterCoat.addEventListener("change", e => {
        filters.coat = e.target.value;
        updateTable();
    });

    if (filterPurpose) filterPurpose.addEventListener("change", e => {
        filters.purpose = e.target.value;
        updateTable();
    });

    // Сортировка (3 уровня)
    for (let i = 0; i < 3; i++) {
        const fieldSelect = document.getElementById(`sort${i + 1}Field`);
        const orderSelect = document.getElementById(`sort${i + 1}Order`);
        
        if (fieldSelect) fieldSelect.addEventListener("change", e => {
            sortLevels[i].field = e.target.value;
            updateSortOptions();
            updateTable();
        });
        
        if (orderSelect) orderSelect.addEventListener("change", e => {
            sortLevels[i].order = e.target.value;
            updateTable();
        });
    }

    updateSortOptions();
    updateTable();
});