# Use the official Python 3.11 image
FROM python:3.11-slim-buster

# Set the working directory
WORKDIR /app

# Copy requirements file into the container
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the server file into the container
COPY server.py .

# Expose the port the app runs on
EXPOSE 8000

# Command to run the application
CMD ["python", "server.py"]
