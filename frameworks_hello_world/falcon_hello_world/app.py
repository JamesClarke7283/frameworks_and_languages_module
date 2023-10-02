import falcon

class HelloWorldResource:
    def on_get(self, req, resp):
        resp.content_type = falcon.MEDIA_HTML
        resp.body = "<h1>Hello, World!</h1>"

app = falcon.App()
app.add_route('/', HelloWorldResource())

if __name__ == '__main__':
    from wsgiref import simple_server

    httpd = simple_server.make_server('127.0.0.1', 8000, app)
    httpd.serve_forever()
