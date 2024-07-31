

// Function to display output in the output div
function printOutput(line) {
    const outputDiv = document.getElementById("output");
    if (outputDiv.textContent.endsWith('\n')) {
        outputDiv.textContent = outputDiv.textContent.slice(0, -1);
    }
    outputDiv.textContent += line + '\n';
    outputDiv.scrollTop = outputDiv.scrollHeight;
}

// Start running the code when the "Run" button is clicked
document.getElementById("runButton").addEventListener("click", () => {
	
	let outputDiv = document.getElementById("output");
    outputDiv.textContent = '';
	
    worker = new Worker("worker.js");
	
	// Handle messages from the worker
worker.onmessage = (event) => {
    if (event.data.type === "OUTPUT") {
        printOutput(event.data.data);
    } else if (event.data.type === "DONE") {
        console.log("Execution finished");
    } else if (event.data.type === "ERROR") {
        printOutput("Error: " + event.data.data);
    }
};
	
    const code = document.getElementById("code").value;
    const userInput = document.getElementById("userInput").value.split('\n');
    worker.postMessage({ type: "RUN", code, userInput });
	
	// Initialize worker and load Pyodide
worker.postMessage({ type: "INIT" });
});

// Stop the execution when the "Stop" button is clicked
document.getElementById("stopButton").addEventListener("click", () => {
	if (worker) {
        worker.terminate();
		console.log("Execution stopped.");
        printOutput("Execution stopped.");
        worker = null; // Clear the reference to the terminated worker
    }
    //worker.postMessage({ type: "STOP" });
});

