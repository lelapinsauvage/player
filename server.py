#!/usr/bin/env python3
"""Simple HTTP server with Range request support for audio/video seeking."""

import os
import re
from http.server import HTTPServer, SimpleHTTPRequestHandler

class RangeHTTPRequestHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        path = self.translate_path(self.path)

        if os.path.isdir(path):
            return SimpleHTTPRequestHandler.do_GET(self)

        if not os.path.exists(path):
            self.send_error(404, "File not found")
            return

        file_size = os.path.getsize(path)
        start = 0
        end = file_size - 1

        range_header = self.headers.get('Range')
        if range_header:
            match = re.match(r'bytes=(\d*)-(\d*)', range_header)
            if match:
                start_str, end_str = match.groups()
                if start_str:
                    start = int(start_str)
                if end_str:
                    end = int(end_str)

                if start > end or start >= file_size:
                    self.send_error(416, "Requested range not satisfiable")
                    return

                self.send_response(206)
                self.send_header('Content-Range', f'bytes {start}-{end}/{file_size}')
        else:
            self.send_response(200)

        content_length = end - start + 1
        content_type = self.guess_type(path)

        self.send_header('Content-Type', content_type)
        self.send_header('Content-Length', str(content_length))
        self.send_header('Accept-Ranges', 'bytes')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

        with open(path, 'rb') as f:
            f.seek(start)
            self.wfile.write(f.read(content_length))

if __name__ == '__main__':
    port = 8000
    print(f'Starting server with Range support at http://localhost:{port}')
    HTTPServer(('', port), RangeHTTPRequestHandler).serve_forever()
