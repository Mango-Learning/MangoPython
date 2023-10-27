from flask import Flask, render_template, request
import subprocess

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":

        code = request.form["code"]
        userInput = request.form["userInput"]
        userInput = userInput.replace('\r', '')
   
        try:
            
         result = subprocess.run(["python", "-c", code], \
                                 input=userInput,\
                                 capture_output = True,\
                                 text = True)

         if "EOFError: EOF when reading a line" in result.stderr:

             output=result.stdout+"\nERROR: Missing user input\n"
                
         else:

             output=result.stdout+result.stderr
         
        except Exception as e:

            output = f"An error occurred"
            
        return render_template("index.html", code=code, output=output, userInput=userInput)

    return render_template("index.html", code="", output="Output appears here")

if __name__ == "__main__":
    
    app.run(debug=True)
