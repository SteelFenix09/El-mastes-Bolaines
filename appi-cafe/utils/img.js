function getFilePath(file) {
    const filePath=file.path
    const fileSprit=filePath.split("\\")
    return `${fileSprit[0]}/${fileSprit[1]}`
}

module.exports = {
    getFilePath
}