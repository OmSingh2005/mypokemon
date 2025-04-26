import json
import requests

# Download real Pokémon data from PokeAPI
def get_pokemon_data(id):
    url = f"https://pokeapi.co/api/v2/pokemon/{id}/"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        name = data['name'].capitalize()
        types = [t['type']['name'].capitalize() for t in data['types']]
        stats = { stat['stat']['name'].upper().replace('-', ''): stat['base_stat'] for stat in data['stats'] }
        
        return {
            "id": id,
            "name": name,
            "type": "/".join(types),
            "sprite": f"/images/pokemon/{id}.png",
            "stats": {
                "HP": stats.get("HP", 0),
                "ATK": stats.get("ATTACK", 0),
                "DEF": stats.get("DEFENSE", 0),
                "SPATK": stats.get("SPECIALATTACK", 0),
                "SPDEF": stats.get("SPECIALDEFENSE", 0),
                "SPD": stats.get("SPEED", 0)
            }
        }
    else:
        print(f"Error fetching Pokémon ID {id}")
        return None

pokemonData = []

for i in range(1, 1026):  # Pokémon 1 to 400
    print(f"Fetching Pokémon {i}...")
    pdata = get_pokemon_data(i)
    if pdata:
        pokemonData.append(pdata)

# Output the JavaScript file
with open("pokemonData.js", "w", encoding="utf-8") as f:
    f.write("export const pokemonData = ")
    json.dump(pokemonData, f, indent=2)
    f.write(";")

print("✅ All done! Generated 'pokemonData.js' with real Pokémon data.")
