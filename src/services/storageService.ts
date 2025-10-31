class StorageService {
  async getSelectedText(): Promise<string | null> {
    return new Promise((resolve) => {
      chrome.storage.local.get("selectedText", ({ selectedText }: { selectedText?: string }) => {
        if (selectedText) {
          chrome.storage.local.remove("selectedText");
          resolve(selectedText);
        } else {
          resolve(null);
        }
      });
    });
  }
}

export const storageService = new StorageService();