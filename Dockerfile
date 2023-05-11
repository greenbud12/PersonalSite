# Author  : Bailey Bakerson <bailey.bakerson@gmail.com>
# Access instance using `docker exec -it exam-container_flask-app bash`

# Instantiate Ubuntu 20.04
FROM ubuntu:20.04
LABEL maintainer "Bailey Bakerson <bailey.bakerson@gmail.com>"
LABEL description="This is custom Docker Image for the ultimate calculator"

# Update Ubuntu Software repository
RUN apt update
RUN apt-get update -qq

# Add the Flask application and install requirements
RUN apt -y install python3-pip
RUN apt -y install vim
RUN mkdir /app
COPY . /app
WORKDIR /app
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Open ports, set environment variables, start the application.
EXPOSE 8080 
ENV PORT 8080

ENV FLASK_ENV=development
CMD exec python3 app.py
# ----------------------------------------------------- 
