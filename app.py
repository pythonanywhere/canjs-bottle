from bottle import Bottle, run, template

app = Bottle()

@app.route("/")
def index():
  "Get index page"
  return template("view/index")

run(app, host="localhost", port="8080")