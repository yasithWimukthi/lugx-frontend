# Use official Nginx image
FROM nginx:alpine

# Remove default Nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy custom static site into Nginx html directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80
