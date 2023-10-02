# Use the official Deno image
FROM denoland/deno

# Set the working directory
WORKDIR /app

# Copy the server.js file to the working directory
COPY server.js .

# Expose the port your app runs on
EXPOSE 8000

# Command to run your Deno app
CMD ["run", "-A", "server.js"]
