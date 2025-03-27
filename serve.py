import http.server
import socketserver
import webbrowser
import os

# Set the port number
PORT = 8000

# Create a custom handler to serve files from the current directory
class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)

# Create the server
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Server started at http://localhost:{PORT}")
    print("Press Ctrl+C to stop the server")
    
    # Open the website in the default browser
    webbrowser.open(f'http://localhost:{PORT}')
    
    try:
        # Start serving
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server...")
        httpd.shutdown() 