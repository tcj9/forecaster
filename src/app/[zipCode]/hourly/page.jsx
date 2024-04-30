import HourlyForecastContainer from "@/containers/HourlyForecastContainer";

const HourlyForecastPage = ({ params }) => {
    return <HourlyForecastContainer zipCode={params.zipCode} />;
};

export function generateStaticParams() {
    return [{ id: '06105' }, { id: '64111' }, { zipCode: '39702' }]
}

export default HourlyForecastPage;