import { Box } from "@chakra-ui/react";

const ForecastLayout = ({ children }) => {
    return (
        <Box height={"100vh"}>
            {children}
        </Box>
    );
};

export default ForecastLayout;