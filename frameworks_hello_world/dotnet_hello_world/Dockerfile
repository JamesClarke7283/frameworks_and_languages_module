# Use the official ASP.NET 7.0 SDK image as the base image
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /app

# Copy the project file and restore any dependencies (via NuGet)
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of the project files
COPY . ./

# Expose the port the app runs on
EXPOSE 5000

# Set the environment to Development
ENV ASPNETCORE_ENVIRONMENT=Development

# Command to run the application using dotnet run
CMD ["dotnet", "run", "--urls", "http://*:5000"]
