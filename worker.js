self.importScripts("https://cdn.jsdelivr.net/pyodide/v0.18.1/full/pyodide.js");

let pyodide = null;
let pyodideReadyPromise = loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/" }).then((pyodideInstance) => {
    pyodide = pyodideInstance;
});
let shouldInterrupt = false;

self.onmessage = async (event) => {
    if (event.data.type === "RUN") {
        shouldInterrupt = false;
        let { code, userInput } = event.data;

        try {
            await pyodideReadyPromise;

            function getInput() {
                if (userInput.length === 0) return "";
                let input = userInput.shift() || '';
                self.postMessage({ type: "OUTPUT", data: input + '\n' });
                return input + '\n';
            }

            function printOutput(line) {
                self.postMessage({ type: "OUTPUT", data: line });
            }

            function checkInterrupt() {
                if (shouldInterrupt) throw new Error("Execution interrupted by user");
            }

            pyodide.globals.set("printOutput", printOutput);
            pyodide.globals.set("getInput", getInput);
            pyodide.globals.set("checkInterrupt", checkInterrupt);

            await pyodide.runPythonAsync(`
                import sys
                from io import StringIO
                import time

                class CustomInput:
                    def readline(self):
                        checkInterrupt()
                        return getInput()

                class CustomOutput:
                    def write(self, s):
                        checkInterrupt()
                        printOutput(s)

                    def flush(self):
                        checkInterrupt()

                sys.stdin = CustomInput()
                sys.stdout = CustomOutput()
                sys.stderr = CustomOutput()

                # Insert checks for interrupt in potential long-running operations
                exec(${JSON.stringify(code)})
            `);

            self.postMessage({ type: "DONE" });
        } catch (err) {
            self.postMessage({ type: "ERROR", data: err.message });
        } finally {
            pyodide.globals.delete("printOutput");
            pyodide.globals.delete("getInput");
            pyodide.globals.delete("checkInterrupt");
        }
    } else if (event.data.type === "STOP") {
        shouldInterrupt = true;
    }
};


