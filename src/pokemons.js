const pokemons1 = [{
    "id": 1,
    "num": "001",
    "name": "Bulbasaur",
    "img": "http://www.serebii.net/pokemongo/pokemon/001.png",
    "type": [
        "Grass",
        "Poison"
    ],
    "height": "0.71 m",
    "weight": "6.9 kg",
    "candy": "Bulbasaur Candy",
    "candy_count": 25,
    "egg": "2 km",
    "spawn_chance": 0.69,
    "avg_spawns": 69,
    "spawn_time": "20:00",
    "multipliers": [
        1.58
    ],
    "weaknesses": [
        "Fire",
        "Ice",
        "Flying",
        "Psychic"
    ],
    "next_evolution": [
        {
            "num": "002",
            "name": "Ivysaur"
        },
        {
            "num": "003",
            "name": "Venusaur"
        }
    ]
}
];


const fs = require('node:fs');
// this file has been formatted as JSON that can be read by the node fs file system reader
const fp = "/"; // add the file path to your project here!!!!!!
fs.readFile(fp + "javascript-greatest-pokemons/src/data.js", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let pokemons = JSON.parse(data);

    console.log(pokemons[0], pokemons[pokemons.length - 1]);
    console.log(pokemons.length);

// Iteration 1: All Fire Pokemons- get the array of all Fire type pokemons
    function getAllFirePokemons(pokeArr) {
        const fires = pokeArr.filter((pokemon) => {
            return pokemon.type.includes("Fire");
        });
        return fires;
    }
    const firePokemonArray = getAllFirePokemons(pokemons);
    console.log("fire pokemon array", firePokemonArray);

// Iteration 2: Shortest Pokemon- find the `name` of the shortest pokemon

function shortestPokemon(pokeArr){
    let heightArr = [];
    pokeArr.forEach(item => {
        let pokeHeight = item.height.split(" ");
        heightArr.push(Number(pokeHeight[0]));
    });
    let shortest = Math.min(...heightArr);
    console.log("shortest", shortest);
    const shortestPokemon = pokeArr.find(element => {
        let pokeHeight = element.height.split(" ");
        if(Number(pokeHeight[0]) === shortest){
            return element.name;
        }
    });
    return shortestPokemon.name;
}
console.log("shortest pokemon", shortestPokemon(pokemons));

// Iteration 3: candy_count average - average of `candy_count` for all the pokemons
function candyAverage(pokeArray){
    const count = pokeArray.filter((pokemon) => pokemon.hasOwnProperty("candy_count") ).length;
    console.log(count);
    let sum = 0;

    let candySum = pokeArray.reduce((a) => {
        if(!a.hasOwnProperty("candy_count")){
            return;
        }else{
            sum += Number(a.candy_count);
        }
    });
    console.log(sum, count);
    let result = sum / count;
    return result;
}
console.log("candy average", candyAverage(pokemons));

// Iteration 4: images for the first 10 `Ground`  Pokemons
    function getAllGroundPokemonImages(pokeArr) {
        let images = [];
        const groundPokes = pokeArr.filter((pokemon) => {
            if(pokemon.type.includes("Ground")){
                images.push(pokemon.img);
            }
        });

        return images;
    }
    const groundPokemonArray = getAllGroundPokemonImages(pokemons);
    console.log(groundPokemonArray.length);

    console.log("ground pokemon array", groundPokemonArray.slice(0,10));

// Iteration 5: Find all pokemon names heavier than Pikachu

    function heavierThanPikachu(pokeArray){
        const pikachuWeight = pokeArray.find(element => {
            return element.name === "Pikachu";
        });
        console.log(pikachuWeight.weight);
        let chuWeight = pikachuWeight.weight.split(" ")[0];
        let heavies = []
        const heavyPokes = pokeArray.map((pokemon) => {
            let weight = pokemon.weight.split(" ")[0];
            // console.log(weight);
            if(Number(chuWeight) < Number(weight)){
                // console.log("heavier than Pikachu ---> ", Number(chuWeight), Number(weight) );
                heavies.push(pokemon);
            }
        });
        return heavies;
    }

    let heavierArr = heavierThanPikachu(pokemons);
    console.log("heavier than Pikachu ------> ",  heavierArr.length, heavierArr[0]);

// Iteration 6: Alphabetic Order - Order by name and print the first 20 names

    function alphaOrderByName(pokeArr){
        const sorted = pokeArr.sort((a, b) => a.name.localeCompare(b.name));
        return sorted;
    }

    let alphabetic = alphaOrderByName(pokemons);
    let alphabetic20 = alphabetic.slice(0,19);

    console.log("alphabetic 20 ----> ", alphabetic20);

// Iteration 7: Strong pokemons - return an array of first 15 pokemons, that have just one `weakness`. If there are less that 15, return all of them 

    function strongPokemons(pokeArr){
        return pokeArr.filter((pokemon) => pokemon.weaknesses.length === 1 );
    }

    let strongPokes = strongPokemons(pokemons);
    let strongPokes15 = strongPokes.slice(0, 14);

    console.log("strong pokemons ----> ", strongPokes15);
});
