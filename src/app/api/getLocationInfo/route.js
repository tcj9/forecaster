import { getLocationDataFromZipCode } from "@/utils/location"

export async function GET(request) {
    let zipCode = request.nextUrl.searchParams.get("zipCode");
    let locationResults = await getLocationDataFromZipCode(zipCode)
    return Response.json(locationResults)
}