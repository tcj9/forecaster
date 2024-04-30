import LocationContainer from "@/containers/LocationContainer";

function ForecastLocationPage({ params }) {
    return <LocationContainer zipCode={params.zipCode} />
}

export function generateStaticParams() {
    return [{ id: '06105' }, { id: '64111' }, { zipCode: '39702' }]
}


export default ForecastLocationPage;