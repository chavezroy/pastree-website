// background.js - Runs in the background
// This script runs as a service worker in Chrome (Manifest V3)
console.log("Background script running");

// Use browser for Firefox and chrome for Chrome
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;
const isFirefox = typeof browser !== 'undefined';

// Handle connection from popup
browserAPI.runtime.onConnect.addListener((port) => {
  console.log("Background received connection from:", port.name);
  
  if (port.name === "popup") {
    // Send confirmation to popup that connection is established
    setTimeout(() => {
      port.postMessage({ status: 'connected', message: 'Background service worker connected' });
    }, 100);
    
    // Listen for messages on this port
    port.onMessage.addListener((message) => {
      console.log("Background received port message:", message);
      
      // Handle specific port messages here if needed
      if (message.action === "requestClipboard") {
        port.postMessage({ 
          action: "clipboardData",
          clipboard: clipboard
        });
      }
    });
    
    // Handle disconnection
    port.onDisconnect.addListener(() => {
      console.log("Popup disconnected");
    });
  }
});

// Initialize context menu as soon as the background script loads
browserAPI.runtime.onInstalled.addListener(() => {
  console.log("Extension installed/updated, creating context menu");
  createContextMenu();
  
  // Initialize storage if needed
  initializeStorage();
});

// Re-create context menu when the extension is started
if (browserAPI.contextMenus) {
  try {
    createContextMenu();
  } catch (error) {
    console.error("Error creating context menu on startup:", error);
  }
}

// Initialize storage with default values if needed
function initializeStorage() {
  browserAPI.storage.local.get(['clipboard', 'syncEnabled'], (result) => {
    // Create empty clipboard if not exists
    if (!result.clipboard) {
      browserAPI.storage.local.set({ clipboard: [] });
    }
    
    // Initialize sync setting if not set
    if (result.syncEnabled === undefined) {
      browserAPI.storage.local.set({ syncEnabled: false });
    }
  });
}

// Store clipboard items (max 10)
let clipboard = [];
const CLIPBOARD_LIMIT = 10;

// Load clipboard from storage
browserAPI.storage.local.get('clipboard', (result) => {
  if (result.clipboard) {
    clipboard = result.clipboard;
  }
});

// Create context menu items
function createContextMenu() {
  console.log("Creating context menu");
  
  // First remove existing items to avoid duplicates
  browserAPI.contextMenus.removeAll(() => {
    if (browserAPI.runtime.lastError) {
      console.error("Error removing existing menus:", browserAPI.runtime.lastError);
      return;
    }
    
    try {
      // Create main Pastree menu item
      browserAPI.contextMenus.create({
        id: "pastetree-main",
        title: "Pastree",
        contexts: ["all"]
      }, () => {
        if (browserAPI.runtime.lastError) {
          console.error("Error creating main context menu:", browserAPI.runtime.lastError);
          return;
        }
        
        // Add clipboard items to the context menu
        updateContextMenuItems();
      });
    } catch (error) {
      console.error("Error creating context menu:", error);
    }
  });
}

// Update context menu items with current clipboard contents
function updateContextMenuItems() {
  browserAPI.storage.local.get('clipboard', (result) => {
    if (result.clipboard && result.clipboard.length > 0) {
      // Add clipboard items to the context menu
      result.clipboard.forEach((item, index) => {
        if (index < 10) {
          const displayText = item.text.length > 30 ? 
            item.text.substring(0, 30) + "..." : 
            item.text;
            
          try {
            browserAPI.contextMenus.create({
              id: `pastetree-item-${index}`,
              title: displayText,
              parentId: "pastetree-main",
              contexts: ["all"]
            }, () => {
              if (browserAPI.runtime.lastError) {
                console.log("Error adding menu item:", browserAPI.runtime.lastError);
                // Non-fatal error, continue
              }
            });
          } catch (error) {
            console.error("Error creating menu item:", error);
          }
        }
      });
    } else {
      // Add a "No items" entry if clipboard is empty
      try {
        browserAPI.contextMenus.create({
          id: "pastetree-empty",
          title: "No clipboard items yet",
          parentId: "pastetree-main",
          contexts: ["all"],
          enabled: false
        }, () => {
          if (browserAPI.runtime.lastError) {
            console.log("Error adding empty menu item:", browserAPI.runtime.lastError);
          }
        });
      } catch (error) {
        console.error("Error creating empty menu item:", error);
      }
    }
  });
}

// Handle context menu clicks
browserAPI.contextMenus.onClicked.addListener((info, tab) => {
  // Check if the clicked item is a clipboard item
  if (info.menuItemId.startsWith("pastetree-item-")) {
    const index = parseInt(info.menuItemId.split("-")[2]);
    
    browserAPI.storage.local.get('clipboard', (result) => {
      if (result.clipboard && result.clipboard.length > index) {
        const text = result.clipboard[index].text;
        
        // Send message to content script to paste the text
        browserAPI.tabs.sendMessage(tab.id, {
          action: "pasteText",
          text: text
        }).catch(error => {
          console.log("Could not paste directly to page:", error);
          
          // If Firefox, copy to clipboard as fallback
          if (isFirefox) {
            navigator.clipboard.writeText(text).catch(err => {
              console.error("Failed to copy to clipboard:", err);
            });
          }
        });
      }
    });
  }
});

// Add text to clipboard
function addToClipboard(text) {
  // Don't add empty text
  if (!text || text.trim() === '') {
    return;
  }
  
  // Check if this text already exists in clipboard
  const existingIndex = clipboard.findIndex(item => item.text === text);
  
  // If it exists, remove it (so we can add it to the top)
  if (existingIndex !== -1) {
    clipboard.splice(existingIndex, 1);
  }
  
  // Create a clipboard item with text and timestamp
  const item = {
    text: text,
    timestamp: Date.now()
  };
  
  // Add to beginning of array (newest first)
  clipboard.unshift(item);
  
  // Limit to CLIPBOARD_LIMIT items
  if (clipboard.length > CLIPBOARD_LIMIT) {
    clipboard = clipboard.slice(0, CLIPBOARD_LIMIT);
  }
  
  // Save to storage
  browserAPI.storage.local.set({ clipboard }, () => {
    console.log("Clipboard saved to storage");
    
    // Update context menu with new clipboard items
    if (browserAPI.contextMenus) {
      try {
        // For Chrome Manifest V3, we need to recreate the entire menu
        // This is because Chrome's context menu API in MV3 has limitations
        createContextMenu();
      } catch (error) {
        console.error("Error updating context menu:", error);
      }
    }
  });
}

// Listen for messages from popup or content script
browserAPI.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Background received message:", message.action);
  
  if (message.action === "addToClipboard") {
    // Add to clipboard
    addToClipboard(message.text);
    sendResponse({ success: true });
    
  } else if (message.action === "getClipboard") {
    // Return the clipboard items
    sendResponse({ clipboard: clipboard });
    
  } else if (message.action === "updateClipboard") {
    // Update the background's clipboard cache with the one from the popup
    console.log("Updating background clipboard cache from popup");
    clipboard = message.clipboard;
    
    // Update context menu if needed
    if (browserAPI.contextMenus) {
      createContextMenu();
    }
    
    sendResponse({ success: true });
    
  } else if (message.action === "clearClipboard") {
    // Clear the clipboard
    clipboard = [];
    browserAPI.storage.local.set({ clipboard }, () => {
      sendResponse({ success: true });
      // Update context menu
      if (browserAPI.contextMenus) {
        createContextMenu();
      }
    });
    return true; // Required for async response
  }
});

// Handle command shortcuts
browserAPI.commands.onCommand.addListener((command) => {
  console.log("Command received:", command);
  
  // Handle paste commands from keyboard shortcuts
  if (command.startsWith("paste_item_")) {
    const index = parseInt(command.split("_")[2]) - 1; // Convert to zero-based
    
    // Get clipboard and send paste message to content script
    browserAPI.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs && tabs[0] && tabs[0].id) {
        if (clipboard && clipboard.length > index) {
          browserAPI.tabs.sendMessage(tabs[0].id, {
            action: "pasteText",
            text: clipboard[index].text
          }).catch(error => {
            console.error("Error sending paste command:", error);
          });
        }
      }
    });
  }
});

// Keep service worker alive for Chrome
browserAPI.runtime.onConnect.addListener((port) => {
  console.log("Connection established with", port.name);
  
  port.onDisconnect.addListener(() => {
    console.log("Port disconnected");
  });
});