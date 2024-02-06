const express = require("express");
const router = express.Router();

//usando motor de plantillas
router.get("/", (req, res) => {
    res.render("index", {titulo: "Con Handlebars"});
})

module.exports = router;