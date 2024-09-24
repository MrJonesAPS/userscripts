// ==UserScript==
// @name         Open in Colab and GitHub Button for Notebooks
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Adds buttons to open .ipynb files in Google Colab from GitHub and back to GitHub from Colab.
// @author       YourName
// @match        https://github.com/*/*.ipynb
// @match        https://colab.research.google.com/github/*/*.ipynb
// @grant        none
// @updateURL    https://raw.githubusercontent.com/mrjonesaps/userscripts/main/jupyter_github_colab.user.js
// @downloadURL  https://raw.githubusercontent.com/mrjonesaps/userscripts/main/jupyter_github_colab.user.js 
// ==/UserScript==

(function() {
    'use strict';

    // Function to create the "Open in Colab" button on GitHub
    const createColabButton = () => {
        const colabButton = document.createElement('a');
        colabButton.textContent = 'Open in Colab';
        colabButton.style.backgroundColor = '#f9d423'; // Bright yellow color
        colabButton.style.color = '#000';
        colabButton.style.padding = '6px 10px';
        colabButton.style.marginLeft = '10px';
        colabButton.style.borderRadius = '5px';
        colabButton.style.fontSize = '14px';
        colabButton.style.fontWeight = 'bold';
        colabButton.style.textDecoration = 'none';

        // Transform the GitHub URL to a Colab URL
        const colabUrl = window.location.href.replace('https://github.com/', 'https://colab.research.google.com/github/');
        colabButton.href = colabUrl;
        colabButton.target = '_blank'; // Open in a new tab

        return colabButton;
    };

    // Function to create the "Back to GitHub" button on Colab
    const createGitHubButton = () => {
        const githubButton = document.createElement('a');
        githubButton.textContent = 'Back to GitHub';
        githubButton.style.backgroundColor = '#0366d6'; // GitHub blue color
        githubButton.style.color = '#fff';
        githubButton.style.padding = '6px 10px';
        githubButton.style.marginLeft = '10px';
        githubButton.style.borderRadius = '5px';
        githubButton.style.fontSize = '14px';
        githubButton.style.fontWeight = 'bold';
        githubButton.style.textDecoration = 'none';

        // Transform the Colab URL back to the GitHub URL
        const githubUrl = window.location.href.replace('https://colab.research.google.com/github/', 'https://github.com/');
        githubButton.href = githubUrl;
        githubButton.target = '_blank'; // Open in a new tab

        return githubButton;
    };

    // Function to insert the "Open in Colab" button on the GitHub notebook page
    const insertColabButton = () => {
        const actionsDiv = document.querySelector('.react-blob-header-edit-and-raw-actions');
        if (actionsDiv && !document.querySelector('.open-in-colab')) {  // Avoid duplicate buttons
            const colabButton = createColabButton();
            colabButton.classList.add('open-in-colab');
            actionsDiv.appendChild(colabButton);
        }
    };

    // Function to insert the "Back to GitHub" button in the Colab page
    const insertGitHubButton = () => {
        const expandedOptions = document.querySelector('span.expanded-options');
        if (expandedOptions && !document.querySelector('.back-to-github')) {  // Avoid duplicate buttons
            const githubButton = createGitHubButton();
            githubButton.classList.add('back-to-github');
            expandedOptions.appendChild(githubButton);
        }
    };

    // Observe changes in GitHub and Colab to detect the appropriate section for the buttons
    const observer = new MutationObserver(() => {
        if (window.location.href.includes('github.com') && window.location.href.includes('.ipynb')) {
            insertColabButton();
        } else if (window.location.href.includes('colab.research.google.com')) {
            insertGitHubButton();
        }
    });

    // Start observing the entire document for changes
    observer.observe(document.body, { childList: true, subtree: true });
})();
