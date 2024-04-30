import DailyForecastContainer from '@/containers/DailyForecastContainer';

const DailyForecastPage = ({ params }) => {
    return <DailyForecastContainer zipCode={params.zipCode} />;
};

export function generateStaticParams() {
    return [{ id: '06105' }, { id: '64111' }, { zipCode: '39702' }]
}

export default DailyForecastPage;