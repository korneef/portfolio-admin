interface LocalStorageSchema {
  showSidebar: boolean;
}

export default class LocalStorageService {
  /**
   * Saves a value to localStorage.
   * The value is automatically converted to a string using JSON.stringify.
   * @param {keyof LocalStorageSchema} key - The key under which the value will be stored.
   * @param {LocalStorageSchema[K]} value - The value to store, typed according to the schema.
   * @throws Will throw an error if saving to localStorage fails (e.g., if localStorage is full).
   */
  public static setItem<K extends keyof LocalStorageSchema>(
    key: K,
    value: LocalStorageSchema[K]
  ): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage', error);
    }
  }

  /**
   * Retrieves a value from localStorage by key.
   * The value is automatically parsed from JSON.
   * @param {keyof LocalStorageSchema} key - The key used to retrieve the value.
   * @returns {LocalStorageSchema[K] | null} The value associated with the key, or null if the key is not found or a parsing error occurs.
   */
  public static getItem<K extends keyof LocalStorageSchema>(
    key: K
  ): LocalStorageSchema[K] | null {
    const item = localStorage.getItem(key);
    if (item) {
      try {
        return JSON.parse(item) as LocalStorageSchema[K];
      } catch (error) {
        console.error('Error parsing JSON', error);
        this.removeItem(key); // Optionally, remove corrupted data
        return null;
      }
    }
    return null;
  }

  /**
   * Removes a value from localStorage.
   * @param {keyof LocalStorageSchema} key - The key of the value to remove.
   */
  public static removeItem<K extends keyof LocalStorageSchema>(key: K): void {
    localStorage.removeItem(key);
  }

  /**
   * Clears all data from localStorage.
   */
  public static clear(): void {
    localStorage.clear();
  }

  /**
   * Checks if a key exists in localStorage.
   * @param {keyof LocalStorageSchema} key - The key to check for.
   * @returns {boolean} True if the key exists, false otherwise.
   */
  public static hasItem<K extends keyof LocalStorageSchema>(key: K): boolean {
    return localStorage.getItem(key) !== null;
  }
}
