
/*
Models based on the format of the data retrieved from the PokeAPI
in order to process it correctly
*/

export interface PokemonPublic {
    count: number,
    next: string,
    previous: string,
    results: PokemonPublicSingle[]
}

export interface PokemonPublicSingle {
    name: string,
    url: string
}