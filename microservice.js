const fs = require('fs').promises;

console.log('Running microservice..');

async function readFile() {
    const fileResult = await fs.readFile('movie.txt');
    const data = fileResult.toString();
    if (data.startsWith('Streaming services of: ')) {
        const movie = data.slice(data.lastIndexOf(':') + 2, data.length);
        console.log(`Getting streaming services of ${movie}...`)
        getMovieId(movie);
    }
}

async function getMovieId(movie) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=f5cb27f9&t=${movie}`);
    const info = await response.json();
    if (info.Error) {
        fs.writeFile('movie.txt', JSON.stringify({ error: info.Error }), function (err) {
            if (err) throw err;
        });
        console.log('Error: Unable to find movie.')
        return;
    };
    
    const imdbId = info.imdbID;
    console.log(`IMDB ID of ${movie}: ${imdbId}`)
    getStreamingService(imdbId);
}

async function getStreamingService(imdbId) {
    const response = await fetch(`https://api.watchmode.com/v1/title/${imdbId}/details/?apiKey=hlTN5qwErJg7aHJS3XovnPBY2BFB7zyz2cp9uFvk&append_to_response=sources`);
    const info = await response.json();

    if (info.statusMessage) {
        fs.writeFile('movie.txt', JSON.stringify({ error: info.statusMessage }), function (err) {
            if (err) throw err;
        });
        console.log('Error: Unable to find movie.')
        return;
    }
    const services = info.sources
    
    const newArr = services.map(mapArray);
    console.log(newArr)
    fs.writeFile('movie.txt', JSON.stringify(newArr), function (err) {
        if (err) throw err;
    });
}

function mapArray(object) {
    return object.name
}

setInterval(readFile, 5000);
