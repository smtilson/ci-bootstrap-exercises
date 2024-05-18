import os
from taskmanager import app

if __name__ == "__main__":
    app.run(
        host=os.environ.get("IP"),
        port=5000,
        debug=os.environ.get("DEBUG")
    )