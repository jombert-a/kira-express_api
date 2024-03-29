var fs = require('fs');

exports.readDevices = function (req, res) {
    fs.readFile("../kira/devices.json", "utf-8", (err, data) => {
        if (err) {
            console.error(err)
            res.status(500).send({
                message:
                    err.message || "Some errors"
            })
            return
        }

        JSON.parse(data).forEach(element => {
            const jsonSceme = JSON.stringify(element.scheme)
            const unquotedSceme = jsonSceme.replace(/"([^"]+)"/g, '$1');

            const model = `module.exports = mongoose => {
                const ${element.name} = mongoose.model(
                  "${element.name}",
                  mongoose.Schema(
                    ${unquotedSceme},
                    { timestamps: ${element.timestamp} }
                  )
                );
              
                return ${element.name};
              };`
              
            fs.writeFile(`../kira/app/models/${element.name}.models.js`, model, function (err) {
                if (err) {
                    res.status(500).send({
                        message:
                            err.message || "Some errors"
                    })
                }
            })
        });

        res.send()
    })
}