from flask import Flask, render_template, request
import subprocess

app = Flask(__name__)
def add_newline_after_input(code):
    lines = code.split('\n')
    output_lines = []
    for line in lines:
        output_lines.append(line)
        if 'input' in line:
            output_lines.append('print()')

    out_code = '\n'.join(output_lines)
    return(out_code)
    #print(out_code,flush=True)


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":

        code = request.form["code"]
        out_code=(add_newline_after_input(code))
        userInput = request.form["userInput"]
        userInput = userInput.replace('\r', '')
   
        try:
            
         result = subprocess.run(["python", "-c", out_code], \
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
    
    #app.run(debug=True)
    app.run()
