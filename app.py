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
@app.route("/javascript_view/:filename")
def javascript_view(filename):
  "Get javascript view files"
  return static_file(filename, root = "javascript_view")
@app.route("/css/:filename")
def css(filename):
  "Get css file"
  return static_file(filename, root = "css")

if __name__ == "__main__":
  run(app, host="localhost", port="8080")
