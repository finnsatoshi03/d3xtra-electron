// scaling factor to represent the distance in a way that looks like km
export function convertDistanceToKm(distanceInCm) {
  return (distanceInCm / 100).toFixed(2);
}

export function calculateWalkingTime(distanceInKm) {
  return ((distanceInKm / 5) * 60).toFixed(0); // 5 km/h
}

export function calculateMotorcyclingTime(distanceInKm) {
  return ((distanceInKm / 60) * 60).toFixed(0); // 60 km/h
}
