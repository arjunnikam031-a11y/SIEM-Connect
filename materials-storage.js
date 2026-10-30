const DB_NAME = "CollegeStudyMaterialsDB";
const STORE_NAME = "materials";
const DB_VERSION = 1;

// Open or create the IndexedDB database
function openMaterialsDB() {
    return new Promise(function(resolve, reject) {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = function(event) {
            const db = event.target.result;

            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, {
                    keyPath: "id",
                    autoIncrement: true
                });
            }
        };

        request.onsuccess = function() {
            resolve(request.result);
        };

        request.onerror = function() {
            reject(request.error);
        };
    });
}

// Save a PDF study material
async function saveMaterial(material) {
    const db = await openMaterialsDB();

    return new Promise(function(resolve, reject) {
        const transaction = db.transaction(
            STORE_NAME, "readwrite"
        );

        const store = transaction.objectStore(STORE_NAME);

        store.add({
            title: material.title,
            subject: material.subject,
            file: material.file,
            uploadedAt: new Date().toLocaleString()
        });

        transaction.oncomplete = function() {
            db.close();
            resolve();
        };

        transaction.onerror = function() {
            db.close();
            reject(transaction.error);
        };
    });
}

// Get all saved study materials
async function getMaterials() {
    const db = await openMaterialsDB();

    return new Promise(function(resolve, reject) {
        const transaction = db.transaction(
            STORE_NAME, "readonly"
        );

        const request = transaction
            .objectStore(STORE_NAME)
            .getAll();

        request.onsuccess = function() {
            resolve(request.result);
        };

        request.onerror = function() {
            reject(request.error);
        };

        transaction.oncomplete = function() {
            db.close();
        };
    });
}

// Delete a study material
async function deleteMaterial(id) {
    const db = await openMaterialsDB();

    return new Promise(function(resolve, reject) {
        const transaction = db.transaction(
            STORE_NAME, "readwrite"
        );

        transaction.objectStore(STORE_NAME).delete(id);

        transaction.oncomplete = function() {
            db.close();
            resolve();
        };

        transaction.onerror = function() {
            db.close();
            reject(transaction.error);
        };
    });
}