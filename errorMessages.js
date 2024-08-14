function replaceErrorMessage(errorMessage) {
    
	const searchString = 'File "<string>",';
    const startIndex = errorMessage.indexOf(searchString);
	let extractedMessage = '';

    if (startIndex !== -1) {
        extractedMessage = errorMessage.substring(startIndex + searchString.length).trim();
		//console.log(extractedMessage);
		//return extractedMessage
		} 
	else {	return "Could not find the specific error details in the message."; }
	
	
	if (errorMessage.includes("IndentationError: expected an indented block")) {
		const lines = extractedMessage.split('\n');
        return `Error on or around ${extractedMessage}\n
This error means that you need to use spaces or tabs to make your code line up properly.\n
This is called indentation.\n
To fix this try indenting \n\n${lines[1]}\n\n on ${lines[0]}.\n
Indent your code by pressing Space bar or the Tab key.`;
    }
		
	if (errorMessage.includes("SyntaxError: EOL while scanning string literal")) {
		const lines = extractedMessage.split('\n');
        return `Error on or around ${extractedMessage}\n 
When you use quotation marks to write words, you need to close them correctly.\n
This error maybe because one quotation mark is missing\n
Make sure you start and end your words with the same type of quotation marks, for example:\n
print("Hello world")\n
To fix this try adding a speech mark (") to \n\n${lines[1]}\n\n on ${lines[0]}.\n
Every time you open a quote ("), remember to close it with another quote.`;
    }
	
	if (errorMessage.includes("ModuleNotFoundError: No module named")) {
		const lines = extractedMessage.split('\n');
        return `Error on or around ${extractedMessage}\n 
You need to call the module by its correct name.\n
Make sure you are using the right names for all modules you want to use.`;
    }
	
    if (errorMessage.includes("ZeroDivisionError: division by zero")) {
        return `Error on or around ${extractedMessage}\n
You cannot divide a number by zero.\n
Check your maths to make sure you are not trying to divide by zero.`;
    }
	
	if (errorMessage.includes("IndexError: list index out of range")) {
        return `Error on or around ${extractedMessage}\n
The computer tried to get something from a list, but the item it looked at did not exist.\n
Every item in a list has a specific position, starting from 0. For example, in a list of three items, the positions are 0 for the first item, 1 for the second item, and 2 for the third item.\n
You tried to access an item from a position that is not there\n
Check Your List: Make sure the list has enough items.\n 
For instance, if you are trying to get the third item, make sure your list has at least three items.`;
    }

	if (errorMessage.includes("EOFError: EOF when reading a line")) {
        return `Error on or around ${extractedMessage}\n
This error occurs when the computer expects more input and reaches the end of the input.\n
Make sure you have provided all the necessary input, and there are no missing pieces in your code.\n
For example, when using \`input()\`, ensure the prompt is correct and ready to accept input.`;
    }

    if (errorMessage.includes("ValueError: invalid literal for int() with base 10")) {
        return `Error on or around ${extractedMessage}\n 
The computer tried to turn some text into a number, but it could not understand it.\n
Make sure you only use numbers when you convert text to a number.\n
For example, \`int('5')\` works because '5' is a number, but \`int('s')\` does not work because 's' is not a number.`;
    }

    if (errorMessage.includes("SyntaxError: unexpected EOF while parsing")) {
        return `Error on or around ${extractedMessage}\n
This error means that your code ended before it was supposed to.\n
Check to make sure that you have closed \`)\` all open brackets \`(\`and quotes.`;
    }

    if (errorMessage.includes("SyntaxError: Missing parentheses")) {
        return `Error on or around ${extractedMessage}\n
This error occurs when you forget to use brackets.\n
Check to make sure that you have closed \`)\` all open brackets \`(\``;
    }

    if (errorMessage.includes("SyntaxError: invalid syntax")) {
        return `Error on or around ${extractedMessage}\n
The computer could not understand your code.\n
Check for any typos or missing symbols.\n
Make sure everything is spelled correctly and in the right order.`;
    }

    if (errorMessage.includes("NameError: name")) {
        return `Error on or around ${extractedMessage}\n 
It looks like you tried to use a name that the computer does not know.\n
Check that you spelled everything correctly.\n
Check that you have assigned variables`;
    }
	
    return extractedMessage;
}
