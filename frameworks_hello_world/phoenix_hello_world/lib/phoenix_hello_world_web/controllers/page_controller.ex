defmodule PhoenixHelloWorld.PageController do
  use PhoenixHelloWorld, :controller

  def home(conn, _params) do
    html(conn, "<h1>Hello, World!</h1>")
  end
end
