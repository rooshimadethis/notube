# NoTube Sync Behavior Documentation

## Overview
Both the Flutter mobile app and Chrome extension now follow the same synchronization behavior for managing alternatives before/after login and when adding/removing items.

## Sync Behavior

### Before Login (Not Authenticated)

**Initial Load:**
- Loads data from local storage (SharedPreferences for Flutter, chrome.storage.local for extension)
- If no local data exists, loads default alternatives from `notube-shared` package
- All changes are saved to local storage only

**Add/Remove Items:**
- Updates local state immediately
- Saves to local storage
- No cloud synchronization occurs

### After Login (Authenticated)

**Initial Sync on Login:**

1. **Fetch cloud data** from Firestore for the user's UID

2. **Three possible scenarios:**

   a. **Cloud is empty:**
      - Automatically pushes local items to cloud
      - No user interaction required
      - Local data becomes the source of truth

   b. **Cloud has data AND it differs from local:**
      - Shows a sync dialog with two options:
        - **"Use cloud data"**: Overwrites local data with cloud data
        - **"Merge cloud and local data"**: 
          - Cloud items take precedence for conflicts (same URL)
          - New local items are added to the merged list
          - Merged result is saved back to cloud

   c. **Cloud has data AND it matches local:**
      - No action needed
      - Already in sync

**Add/Remove Items (While Logged In):**

When adding an item:
1. Updates local state immediately
2. Saves to local storage
3. Uses Firestore `arrayUnion` to atomically add to cloud

When removing an item:
1. Updates local state immediately
2. Saves to local storage
3. Uses Firestore `arrayRemove` to atomically remove from cloud

## Key Implementation Details

### Merge Logic
- **Cloud wins conflicts**: When the same URL exists in both local and cloud, the cloud version is kept
- **New local items are preserved**: Items that exist locally but not in cloud are added to the merged result
- **Comparison key**: Items are compared by URL (or title if URL is empty)

### Atomic Operations
- Add/remove operations use Firestore's `arrayUnion` and `arrayRemove` for atomic updates
- This prevents race conditions and ensures data consistency
- No debouncing needed for individual add/remove operations

### Data Validation
- All alternatives must have: `title`, `url`, `description`, and `category`
- Invalid alternatives are filtered out during load and save operations
- Ensures data integrity across platforms

### Sync State Management
- Uses a `hasInitializedSync` flag to prevent multiple sync dialogs
- Flag is reset when user logs out
- Prevents sync dialog from appearing on every state change

## Files Modified

### Chrome Extension
- `/app/src/services/firestoreService.js`:
  - Updated `mergeAlternatives` to match Flutter's cloud-wins logic
  - Added `addAlternative` function with `arrayUnion`
  - Added `removeAlternative` function with `arrayRemove`

- `/app/src/App.jsx`:
  - Removed debounced full-save on localItems change
  - Added sync dialog modal
  - Updated login sync logic to match Flutter's three scenarios
  - Changed add/remove handlers to use atomic operations

### Flutter App
No changes needed - already implemented correctly with:
- `/lib/services/firestore_service.dart`: Atomic add/remove operations
- `/lib/screens/home_screen.dart`: Sync dialog and merge logic

## Benefits of This Approach

1. **Consistency**: Both platforms behave identically
2. **User Control**: Users can choose how to handle conflicts
3. **Data Safety**: Cloud data is never overwritten without user consent (except when cloud is empty)
4. **Performance**: Atomic operations are faster than full document updates
5. **Reliability**: Prevents race conditions and data loss
