defmodule PhoenixHelloWorld.Router do
  use PhoenixHelloWorld, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  scope "/", PhoenixHelloWorld do
    pipe_through :browser

    get "/", PageController, :index
  end
end
