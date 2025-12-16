# Use the official Home Assistant base image
FROM homeassistant/home-assistant:latest

# Set environment variables
ENV TZ=UTC
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Install system dependencies
RUN apt-get update && apt-get install -y \
    python3-pip \
    python3-dev \
    build-essential \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Create a non-root user
RUN useradd --create-home --shell /bin/bash hass
USER hass

# Set up the working directory
WORKDIR /home/hass

# Install Python dependencies
COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt

# Copy the custom component code
COPY . /home/hass/my-lovelace-card

# Set up the development environment
RUN cd /home/hass/my-lovelace-card && \
    npm install && \
    npm run build

# Expose the Home Assistant port
EXPOSE 8123

# Start Home Assistant
CMD ["hass", "-c", "/config"]
