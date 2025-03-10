const calculateETA = (distanceInKm) => {
    const speedKmPerMin = 0.5; // Assume 30 km/h average speed (0.5 km per min)
    const baseTime = 10; // Base preparation time in minutes
    const travelTime = distanceInKm / speedKmPerMin;

    return Math.ceil(baseTime + travelTime); // Round up to nearest minute
};

module.exports = calculateETA;