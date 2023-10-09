from sanic import Sanic
from sanic.response import html

app = Sanic("HelloWorldApp")

@app.route("/")
async def hello_world(request):
    return html("<h1>Hello, World!</h1>")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
