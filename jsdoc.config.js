module.exports = {
    source: {
        include: "src",
        exclude: "node_modules"
    },
    opts: {
        destination: "./docs"
    },
    sourceType: "module",
    tags: {
        allowUnknownTags: true,
        dictionaries: ["jsdoc", "closure"]
    }
}