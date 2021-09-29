const FIREBASE_DOMAIN =
    "https://to-do-b3d7d-default-rtdb.asia-southeast1.firebasedatabase.app/";

export async function getAllCollection() {
    const response = await fetch(`${FIREBASE_DOMAIN}/collection.json`);
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Could not fetch collections..");
    }

    const transformedCollection = [];
    for (const key in data) {
        const collectionObj = {
            id: key,
            ...data[key],
        };
        transformedCollection.push(collectionObj);
    }
    return transformedCollection;
}

export async function addCollection(CollectionData) {
    const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`, {
        method: "POST",
        body: JSON.stringify(CollectionData),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Could not create quote.");
    }

    return null;
}
