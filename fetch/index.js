function main() {
    fetch("https://official-joke-api.appspot.com/random_joke")

.then(async (response) =>{
    const json = await response.json();
    console.log(json.random_joke.length);
    await response.text();
});
}
main();