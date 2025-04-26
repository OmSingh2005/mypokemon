import requests
import os

# Create directory for images
os.makedirs('pokemon_images', exist_ok=True)

# List of Pokémon IDs to download
requested_ids = [
    1, 3, 4, 6, 7, 9, 25, 65, 68, 94, 129, 130, 131, 134, 135, 136, 143, 149, 
    150, 151, 196, 197, 212, 213, 248, 254, 260, 282, 373, 392, 438, 470, 471, 
    493, 658, 700
]

# Download images
for pokemon_id in range(1,1026):
    url = f"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{pokemon_id}.png"
    response = requests.get(url)
    if response.status_code == 200:
        with open(f'pokemon_images/{pokemon_id}.png', 'wb') as f:
            f.write(response.content)
        print(f"Downloaded: {pokemon_id}.png")
    else:
        print(f"Failed to download {pokemon_id}.png")

print("All images downloaded successfully!")