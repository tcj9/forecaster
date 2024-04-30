import { cache } from 'react'
export const getLocationDataFromZipCode = cache(async (zipCode) => {
    return await fetch(`https://api.zippopotam.us/us/${zipCode}`)
        .then(results => results.json())
        .then(data => {
            let { longitude, latitude, "place name": placeName, "state abbreviation": stateName } = data.places[0];
            return {
                longitude,
                latitude,
                locationName: `${placeName}, ${stateName}`
            };
        })
        .catch(err => {
            console.error(err)
        })
})
