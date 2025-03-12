//your JS code here. If required.
document.addEventListener("DOMContentLoaded", function () {
    const outputTable = document.getElementById("output");
    const reloadButton = document.getElementById("reload");

    // Function to generate a random time between 1 and 3 seconds
    function getRandomTime() {
        return (Math.random() * 2 + 1).toFixed(3); // Generates a number between 1.000 to 3.000
    }

    // Function to create a promise that resolves after a random delay
    function createPromise(name) {
        return new Promise((resolve) => {
            const time = getRandomTime();
            setTimeout(() => resolve({ name, time }), time * 1000);
        });
    }

    function executePromises() {
        // Show loading message while promises are running
        outputTable.innerHTML = `<tr><td colspan="2" class="text-center">Loading...</td></tr>`;

        // Creating three promises with random resolve times
        const promises = [createPromise("Promise 1"), createPromise("Promise 2"), createPromise("Promise 3")];

        // Start timing
        const startTime = performance.now();

        // Execute all promises together
        Promise.all(promises).then((results) => {
            const endTime = performance.now();
            const totalTime = ((endTime - startTime) / 1000).toFixed(3);

            // Clear loading message
            outputTable.innerHTML = "";

            // Add each resolved promise's result to the table
            results.forEach((result) => {
                const row = `<tr><td>${result.name}</td><td>${result.time}</td></tr>`;
                outputTable.innerHTML += row;
            });

            // Add total execution time row
            outputTable.innerHTML += `<tr class="fw-bold"><td>Total</td><td>${totalTime}</td></tr>`;
        });
    }

    // Run the promises on page load
    executePromises();

    // Button click to run promises again
    reloadButton.addEventListener("click", executePromises);
});
