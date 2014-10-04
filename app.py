from bottle import Bottle, run, template, static_file

app = Bottle()

@app.route("/")
def index():
  "Get index page"
  return template("view/index")
@app.route("/javascript/:filename")
def javascript(filename):
  "Get javascript files"
  return static_file(filename, root = "javascript")
@app.route("/css/:filename")
def css(filename):
  "Get css file"
  return static_file(filename, root = "css")

run(app, host="localhost", port="8080")