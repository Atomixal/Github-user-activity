#!/usr/bin/env node
import readline from "readline-sync";

// Fetch user's public events from GitHub
function fetchUser(username) {
    const url = `https://api.github.com/users/${username}/events/public`;

    fetch(url)
    .then(response => {
        if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(events => {
        // Process the array of events
        events.forEach(event => {
        console.log('---');
        console.log(`Event type: ${event.type}`);
        console.log(`Repository: ${event.repo.name}`);
        console.log(`Created at: ${event.created_at}`);
        console.log('---');
        });
    })
    .catch(error => {
        console.error('Error fetching user events:', error);
    });
}

function main() {
    const username = readline.question('Enter a GitHub username: ');
    fetchUser(username);
    console.log("\n");
}

main();