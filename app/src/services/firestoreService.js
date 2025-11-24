import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Alternative } from '@rooshi/notube-shared';

const toAlternativeObject = (data) => {
    const alt = new Alternative();
    alt.setTitle(data.title || '');
    alt.setUrl(data.url || '');
    alt.setDescription(data.description || '');
    alt.setCategory(data.category || '');
    return alt.toObject();
};

export const saveUserAlternatives = async (userId, alternatives) => {
    if (!userId) return;
    try {
        // Sanitize data using the shared model
        const sanitizedAlternatives = alternatives.map(toAlternativeObject);

        await setDoc(doc(db, 'users', userId), {
            alternatives: sanitizedAlternatives,
            lastUpdated: new Date()
        }, { merge: true });
    } catch (error) {
        console.error("Error saving alternatives to Firestore:", error);
        throw error;
    }
};

export const getUserAlternatives = async (userId) => {
    if (!userId) return [];
    try {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data().alternatives || [];
            // Ensure all fetched data conforms to the model
            return data.map(toAlternativeObject);
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching alternatives from Firestore:", error);
        throw error;
    }
};

export const mergeAlternatives = (localAlternatives, cloudAlternatives) => {
    // Create a map of local alternatives by URL for easy lookup
    const localMap = new Map(localAlternatives.map(alt => [alt.url, alt]));

    // Start with local alternatives (they take precedence for description/details)
    const merged = [...localAlternatives];

    // Add cloud alternatives that don't exist locally
    cloudAlternatives.forEach(cloudAlt => {
        if (!localMap.has(cloudAlt.url)) {
            merged.push(cloudAlt);
        }
    });

    return merged;
};
