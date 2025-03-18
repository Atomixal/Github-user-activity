#!/usr/bin/env node
import readline from "readline-sync";

// Fetch user's public events from GitHub
function fetchUser(username, numberOfEvents) {
    const url = `https://api.github.com/users/${username}/events/public`;
    let count = 0;

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
        console.log(`Event type: ${event.type}`);
        console.log(`Repository: ${event.repo.name}`);
        console.log(`Created at: ${event.created_at}`);
        console.log('---');
        count++;
        });
    })
    .catch(error => {
        console.error('Error fetching user events:', error);
    });
}

function main() {
    const username = readline.question('Enter a GitHub username: ');
    const numberOfEvents = readline.question('Enter the number of events you would like to see');
    fetchUser(username, numberOfEvents);
    console.log("\n");
}

main();