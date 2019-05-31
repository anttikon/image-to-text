const {spawn} = require('child_process')

function runLocalCommand(command, args) {
    return new Promise((resolve, reject) => {
        let err = []
        let output = []
        const dir = spawn(command, args);
        dir.stdout.on('data', (data) => {
            output.push(...data.toString().split('\n'))
        })
        dir.stderr.on('data', (data) => {
            err.push(data)
        })
        dir.on('close', (code) => code === 0 ? resolve(output) : reject(err.join("\n")))
    })
}

module.exports.runLocalCommand = runLocalCommand
