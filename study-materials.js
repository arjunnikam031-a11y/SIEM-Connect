const materialsDB = new Promise((resolve, reject) => {
    const request = indexedDB.open("SIEMStudyMaterials", 1);

    request.onupgradeneeded = function () {
        const db = request.result;

        if (!db.objectStoreNames.contains("materials")) {
            db.createObjectStore("materials", {
                keyPath: "id",
                autoIncrement: true
            });
        }
    };

    request.onsuccess = function () {
        resolve(request.result);
    };

    request.onerror = function () {
        reject(request.error);
    };
});

async function saveMaterial(material) {
    const db = await materialsDB;

    return new Promise((resolve, reject) => {
        const transaction = db.transaction("materials", "readwrite");
        const store = transaction.objectStore("materials");
        const request = store.add(material);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function getMaterials() {
    const db = await materialsDB;

    return new Promise((resolve, reject) => {
        const transaction = db.transaction("materials", "readonly");
        const store = transaction.objectStore("materials");
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function deleteMaterial(id) {
    const db = await materialsDB;

    return new Promise((resolve, reject) => {
        const transaction = db.transaction("materials", "readwrite");
        const store = transaction.objectStore("materials");
        const request = store.delete(id);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}