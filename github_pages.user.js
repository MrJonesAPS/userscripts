// ==UserScript==
// @name         GitHub Pages and Repo Links
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Adds links between GitHub Pages and their corresponding GitHub repositories, and vice versa.
// @author       You
// @match        https://*.github.io/*
// @match        https://github.com/*/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/mrjonesaps/userscripts/main/github_pages.user.js
// @downloadURL  https://raw.githubusercontent.com/mrjonesaps/userscripts/main/github_pages.user.js 
// ==/UserScript==

(function() {
    'use strict';

    // Get the current URL
    const currentURL = window.location.href;

    // Handle GitHub Pages to Repo Link
    const pagesRegex = /https:\/\/([a-zA-Z0-9-]+)\.github\.io(\/[a-zA-Z0-9-]+)?/;
    const pagesMatch = currentURL.match(pagesRegex);

    if (pagesMatch) {
        const username = pagesMatch[1];
        const repo = pagesMatch[2] ? pagesMatch[2].replace('/', '') : `${username}.github.io`;

        // Create the corresponding GitHub repo URL
        const repoURL = `https://github.com/${username}/${repo}`;

        // Create the link element
        const link = document.createElement('a');
        link.href = repoURL;
        link.innerText = 'Go to Repo';
        link.style.position = 'fixed';
        link.style.top = '10px';
        link.style.right = '10px';
        link.style.backgroundColor = '#24292e';
        link.style.color = 'white';
        link.style.padding = '10px';
        link.style.borderRadius = '5px';
        link.style.textDecoration = 'none';
        link.style.fontFamily = 'Arial, sans-serif';
        link.style.fontSize = '14px';
        link.style.zIndex = 1000;

        // Add hover effect
        link.onmouseover = function() {
            link.style.backgroundColor = '#0366d6';
        };
        link.onmouseout = function() {
            link.style.backgroundColor = '#24292e';
        };

        // Append the link to the body
        document.body.appendChild(link);
    }

    // Handle GitHub Repo to Pages Link
    const repoRegex = /https:\/\/github\.com\/([a-zA-Z0-9-]+)\/([a-zA-Z0-9-]+)/;
    const repoMatch = currentURL.match(repoRegex);

    if (repoMatch) {
        const username = repoMatch[1];
        const repo = repoMatch[2];

        // Construct the GitHub Pages URL based on the repository name
        let pagesURL;

        // If the repo is username.github.io, the GitHub Pages URL is simply https://username.github.io/
        if (repo === `${username}.github.io`) {
            pagesURL = `https://${username}.github.io/`;
        } else {
            // Otherwise, the URL is https://${username}.github.io/${repo}
            pagesURL = `https://${username}.github.io/${repo}`;
        }

       // Function to create the button
        const createGithubPagesButton = () => {
            const button = document.createElement('button');
            button.textContent = 'Open in Github Pages';
            button.classList.add('to_github_pages');
            return button;
        };

        // Function to insert the floating button on the GitHub page
        const insertGithubPagesButton = () => {
            const actionsDiv = document.querySelector('.react-blob-header-edit-and-raw-actions');
            if (actionsDiv && !document.querySelector('.to_github_pages')) {  // Avoid duplicate buttons
                const pagesButton = createGithubPagesButton();
                actionsDiv.appendChild(pagesButton);
            }
        };

        // Call the function to insert the floating button
        insertGithubPagesButton(); 
    }
})();
