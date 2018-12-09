from flask import Flask, render_template, Response, request, send_from_directory
import secrets
import os
import json

app = Flask(__name__)
upload_dir_location = os.path.join(app.root_path, "uploads")
if not os.path.isdir(upload_dir_location):
    os.mkdir(upload_dir_location)

app.secret_key = "ld59OQNgflac7xv2Ig-ciUZEFvnjkdnksjdnvkdhnvkjdba6"


@app.route("/")
def files():
    return render_template("index.html")


@app.route("/upload/", methods=["POST"])
def uplaod():
    fn = secrets.token_urlsafe(6)
    xfn = request.headers.get("x-file-name")
    xiv = request.headers.get("x-init-vector")
    with open(os.path.join(upload_dir_location, f"{fn}.data"), "w") as f:
        f.write(json.dumps({"name": xfn, "iv": xiv}))
    with open(os.path.join(upload_dir_location, fn), "wb") as f:
        while 1:
            chunk = request.stream.read(4096 * 1024)
            if chunk:
                f.write(chunk)
            else:
                break
    return Response(json.dumps({"file": fn}), mimetype="application/json")


@app.route("/dl/", strict_slashes=False)
def dlfile():
    return send_from_directory("uploads", request.args.get("f"))


if __name__ == "__main__":
    app.run(debug=True)
