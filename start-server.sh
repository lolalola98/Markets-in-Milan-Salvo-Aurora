#!/bin/bash

# Simple web server starter script for Markets in Milan project

echo "Starting web server for Markets in Milan..."
echo ""
echo "Server will run at: http://localhost:8000"
echo "Press Ctrl+C to stop the server"
echo ""

# Try Python 3 first (most common)
if command -v python3 &> /dev/null; then
    python3 -m http.server 8000
# Try Python 2 as fallback
elif command -v python &> /dev/null; then
    python -m SimpleHTTPServer 8000
# Try Node.js http-server
elif command -v http-server &> /dev/null; then
    http-server . -p 8000
# Try Node.js built-in
elif command -v node &> /dev/null; then
    echo "Node.js found. Please install 'http-server' with: npm install -g http-server"
else
    echo "Error: No suitable web server found."
    echo "Please install Python 3 or Node.js http-server"
    exit 1
fi
