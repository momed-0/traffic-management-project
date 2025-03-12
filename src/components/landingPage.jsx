import TrafficDataTable from "./Table/trafficDataTable";

const LandingPage = ({data}) => {
    return (
        <div>
            <TrafficDataTable data={data} />
        </div>
    );
};

export default LandingPage