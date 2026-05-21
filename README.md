# Markets in Milan
A guide to thrift markets, weekly street markets and vintage local markets in Milan

## Setup & Running the Project

### ⚠️ Important: Use a Web Server

This project must be served through a local web server (not opened directly as a file). The browser's security features prevent file:// URLs from loading external resources.

**Quick Start:** Run the provided server script from the project directory:
```bash
./start-server.sh
```

Or use Python directly:
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open your browser to: **http://localhost:8000**

## Features

### THIS WEEK
A personalized list of markets present in that week, they can be between the favourites, the closer, the biggest, the trendy or hyped ones

### USERS FAVOURITES
A list of the favourites markets of the users present and subscribed to the website

### COME BACK
A list of market where the user has been.

## Troubleshooting

**"Error loading market data" message?**
- Make sure you're running the project through a web server (http://localhost:8000)
- Don't open the HTML file directly with `file://` URLs
- Check browser console (F12 → Console) for detailed error messages

