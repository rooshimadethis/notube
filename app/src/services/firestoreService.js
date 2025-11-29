import { doc, setDoc, getDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase';
import { Alternative } from '@rooshi/notube-shared';

/**
 * Validates that an Alternative has all required fields
 * @param {Object} data - The alternative data to validate
 * @returns {boolean} - True if all required fields are present and non-empty
 */
const isValidAlternative = (data) => {
    if (!data) return false;

    const requiredFields = ['title', 'url', 'description', 'category'];
    return requiredFields.every(field => {
        const value = data[field];
        return value && typeof value === 'string' && value.trim().length > 0;
    });
};

/**
 * Converts data to Alternative object, returns null if invalid
 * @param {Object} data - The alternative data
 * @returns {Object|null} - Alternative object or null if invalid
 */
const toAlternativeObject = (data) => {
    if (!isValidAlternative(data)) {
        console.warn('Invalid alternative data, skipping:', data);
        return null;
    }

    const alt = new Alternative();
    alt.setTitle(data.title);
    alt.setUrl(data.url);
    alt.setDescription(data.description);
    alt.setCategory(data.category);
    return alt.toObject();
};

export const saveUserAlternatives = async (userId, alternatives) => {
    if (!userId) return;
    try {
        // Sanitize data using the shared model and filter out invalid alternatives
        const sanitizedAlternatives = alternatives
            .map(toAlternativeObject)
            .filter(alt => alt !== null);

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
            // Ensure all fetched data conforms to the model and filter out invalid alternatives
            return data
                .map(toAlternativeObject)
                .filter(alt => alt !== null);
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching alternatives from Firestore:", error);
        throw error;
    }
};

/**
 * Merges local and cloud alternatives.
 * Cloud items take precedence for conflicts (same URL).
 * Local items are added only if they are not present in the cloud list.
 * This matches the Flutter app's merge behavior.
 */
export const mergeAlternatives = (localAlternatives, cloudAlternatives) => {
    const mergedMap = new Map();

    // 1. Add all cloud items (they win conflicts)
    cloudAlternatives.forEach(item => {
        const key = item.url || item.title;
        if (key) {
            mergedMap.set(key, item);
        }
    });

    // 2. Add local items only if they don't exist in cloud
    localAlternatives.forEach(item => {
        const key = item.url || item.title;
        if (key && !mergedMap.has(key)) {
            mergedMap.set(key, item);
        }
    });

    return Array.from(mergedMap.values());
};

/**
 * Adds a single alternative to the user's cloud data using arrayUnion
 */
export const addAlternative = async (userId, alternative) => {
    if (!userId) return;
    try {
        const sanitized = toAlternativeObject(alternative);
        if (!sanitized) {
            console.warn('Cannot add invalid alternative');
            return;
        }

        await setDoc(doc(db, 'users', userId), {
            alternatives: arrayUnion(sanitized),
            lastUpdated: new Date()
        }, { merge: true });

        console.log('Added alternative to Firestore');
    } catch (error) {
        console.error('Error adding alternative to Firestore:', error);
        throw error;
    }
};

/**
 * Removes a single alternative from the user's cloud data using arrayRemove
 */
export const removeAlternative = async (userId, alternative) => {
    if (!userId) return;
    try {
        const sanitized = toAlternativeObject(alternative);
        if (!sanitized) {
            console.warn('Cannot remove invalid alternative');
            return;
        }

        await setDoc(doc(db, 'users', userId), {
            alternatives: arrayRemove(sanitized)
        }, { merge: true });

        console.log('Removed alternative from Firestore');
    } catch (error) {
        console.error('Error removing alternative from Firestore:', error);
        throw error;
    }
};
