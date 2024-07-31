function clearFields() {
 document.getElementById("code").value=""
 document.getElementById("userInput").value=""
 document.getElementById("output").value="Output appears here"
}

//document.getElementById("clear-button").onclick = clearFields;

function saveFileAs() {
	if (promptFilename = prompt("Save file as", "")) {
		var textBlob = new Blob([document.getElementById("code").value], {type:'text/plain'});
		var downloadLink = document.createElement("a");
		downloadLink.download = promptFilename;
		downloadLink.innerHTML = "Download File";
		downloadLink.href = window.URL.createObjectURL(textBlob);
		downloadLink.click();
    delete downloadLink;
    delete textBlob;
	}
}

//document.getElementById("save-button").onclick = saveFileAs;

