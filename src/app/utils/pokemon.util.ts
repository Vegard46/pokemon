import { StorageKeys } from "../enums/storage-keys.enum";
import { Pokemon } from "../models/pokemon.model";
import { User } from "../models/user.model";
import { StorageUtil } from "./storage.util";

export class PokemonUtil {
    public isAlreadyCollected(pokemon: Pokemon): boolean {
        let user: User | undefined = StorageUtil.read(StorageKeys.User);
        let pokemons = user!.pokemon;
        for(let pkmon of pokemons){
            if (pkmon.name === pokemon.name){
                return true;
            }
        }
        return false;
    }
}