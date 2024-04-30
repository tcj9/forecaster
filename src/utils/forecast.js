import { cache } from 'react'
import { getLocationDataFromZipCode } from "./location"

export const get12HourForecastFromZipCode = cache(async (zipCode) => {
    let { longitude, latitude, locationName } = await getLocationDataFromZipCode(zipCode);
    let { hourlyForecastUrl } = await getForcastUrlsFromLatLong(latitude, longitude);
    return await fetch(hourlyForecastUrl)
        .then(response => response.json())
        .then(data => {
            let hourlyForecastPeriods = data.properties.periods.slice(0, 12);
            return {
                periods: hourlyForecastPeriods,
                locationName,
                updatedOn: data.properties.updated
            }
        })
        .catch(err => console.error(err))
});

export const get7DayForecastFromZipCode = cache(async (zipCode) => {
    let { longitude, latitude, locationName } = await getLocationDataFromZipCode(zipCode);
    let { dailyForecastUrl } = await getForcastUrlsFromLatLong(latitude, longitude);
    return await fetch(dailyForecastUrl)
        .then(response => response.json())
        .then(data => {
            let dailyForecastPeriods = data.properties.periods.slice(0, 1);
            dailyForecastPeriods.push(...data.properties.periods.slice(1).filter(period => period.isDaytime));
            return {
                periods: dailyForecastPeriods,
                locationName,
                updatedOn: data.properties.updated
            }
        })
        .catch(err => console.error(err))
});

const getForcastUrlsFromLatLong = cache(async (lat, long) => {
    return await fetch(`https://api.weather.gov/points/${lat},${long}`)
        .then(response => response.json())
        .then(data => {
            let dailyForecastUrl = data.properties.forecast,
                hourlyForecastUrl = data.properties.forecastHourly
            return {
                dailyForecastUrl,
                hourlyForecastUrl
            }
        })
});