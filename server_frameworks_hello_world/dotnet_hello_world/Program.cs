var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", async context =>
        {
            await context.Response.WriteAsync("<h1>Hello, World!</h1>");
        });

app.Run();
