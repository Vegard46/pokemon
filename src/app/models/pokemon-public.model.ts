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