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
    xmt=request.headers.get("x-mime-type")
    with open(os.path.join(upload_dir_location, f"{fn}.data"), "w") as f:
        f.write(json.dumps({"name": xfn, "iv": xiv,"mt":xmt}))
    with open(os.path.join(upload_dir_location, fn), "wb") as f:
        while 1:
            chunk = request.stream.read(4096 * 1024)
            if chunk:
                f.write(chunk)
            else:
                break
    return Response(json.dumps({"file": fn}), mimetype="application/json")


@app.route("/req/dl/", strict_slashes=False)
def dlfile():
    fn=request.args.get("f","")
    fpath=os.path.join( upload_dir_location,fn )
    if not fn or not os.path.isfile(fpath):
        return Response(json.dumps({"error":"bad-file"}),status=200)
    with open (f"{fpath}.data","r") as f:
        data=(f.read())
   # resp=make_response( send_from_directory("uploads", request.args.get("f")))
    return Response (data)


if not os.environ.get("JufoKF6D6D1UNCRrB"):
    @app.route("/get-file/",strict_slashes=False)
    def file_ng():
        f=request.args.get("f")
        return send_from_directory("uploads",f)
    
@app.route("/f/",strict_slashes=False)
def filedl():
    return render_template("file.html")

if __name__ == "__main__":
    app.run(debug=True)
