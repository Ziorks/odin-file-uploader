//name convention <rootPath><thing><httpVerb>

function indexGet(req, res) {
  res.render("index", { title: "Homepage" });
}

module.exports = { indexGet };
