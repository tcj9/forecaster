'use server'
import { get7DayForecastFromZipCode, get12HourForecastFromZipCode } from "@/utils/forecast";

export async function GET(request) {
    let zipCode = request.nextUrl.searchParams.get("zipCode");
    let type = request.nextUrl.searchParams.get("type")

    if (type === "hourly") {
        let hourlyForecastData = await get12HourForecastFromZipCode(zipCode);
        return Response.json(hourlyForecastData);
    } else if (type === "daily") {
        let dailyForecastData = await get7DayForecastFromZipCode(zipCode)
        return Response.json(dailyForecastData)
    }
}