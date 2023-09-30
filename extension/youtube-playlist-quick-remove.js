// ==UserScript==
// @name         YouTube Playlist Quick Remove
// @namespace    https://github.com/kylecorry31
// @version      1.0.0
// @description  Adds a quick remove button to YouTube playlists.
// @author       Kyle Corry
// @match        https://*.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

let isButtonAdderRunning = false;

const remove = (row) => {
    // Show the menu
    const menuButton = row.querySelector('#button.dropdown-trigger');
    menuButton?.click();

    // Wait for the menu to show
    setTimeout(() => {
        // Click the remove menu item
        const menuItems = [...document.querySelectorAll('ytd-menu-service-item-renderer')];
        const removeButton = menuItems.find(i => i.innerText.toLowerCase().includes('remove'));
        removeButton?.click();
    }, 200);    
};

const addRemoveButtons = () =>
{
    if (!window.location.href.includes('youtube.com/playlist') || isButtonAdderRunning){
        return;
    }

    try {

        isButtonAdderRunning = true;

        const rows = [...document.querySelectorAll('ytd-playlist-video-renderer')];

        // Add the remove button if it doesn't exist
        rows.forEach(row => {
            const removeButton = row.querySelector('#custom-remove-button');
            if (!removeButton) {
                const button = document.createElement('button');
                button.id = 'custom-remove-button';
                button.innerText = 'X';

                // Remove background color
                button.style.backgroundColor = 'transparent';
                button.style.color = 'white';
                button.style.border = 'none';
                button.style.cursor = 'pointer';
                button.style.fontSize = '1.5em';
                button.style.fontWeight = 'bold';
                button.style.padding = '32px';
                button.style.margin = '0';

                button.onclick = () => remove(row);
                row.appendChild(button);
            }
        });
        
    } finally {
        isButtonAdderRunning = false;
    }
}

const process = () => {
    addRemoveButtons();
}

const observer = new MutationObserver(process);
observer.observe(document, {
    childList:  true,
    subtree:    true,
});

process();
