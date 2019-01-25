const download = require('image-downloader')

// Download to a directory and save with the original filename
// const options = {
//     url: 'https://www.cbpq.org.br/site/download/i/foto/84859.jpg?5c4a0894b8d9b',
//     dest: 'imageDownloaded'                  // Save to /path/to/dest/image.jpg
// }

const path = 'imageDownloaded'; // criar dir comecando a partir da raiz do projeto.

async function downloadIMG(urlImage) {
    try {
        const { filename, image } = await download.image({url: urlImage, dest: path})
        console.log(filename) // => /path/to/dest/image.jpg 
    } catch (e) {
        console.error(e)
    }
}

module.exports = {
    downloadIMG: downloadIMG
}