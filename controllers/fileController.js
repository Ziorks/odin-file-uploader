const multer = require("multer");
const upload = multer({ dest: "uploads/" });

//name convention <rootPath><thing><httpVerb>
function fileUploadGet(req, res) {
  res.render("upload", { title: "Upload A File" });
}

const fileUploadPost = [
  upload.single("uploaded_file"),
  (req, res) => {
    req.file;
    res.redirect("/file/upload");
  },
];

module.exports = { fileUploadGet, fileUploadPost };
