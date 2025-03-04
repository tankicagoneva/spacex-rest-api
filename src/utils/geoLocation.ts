/**
 *  Haversine formula to calculate distance between two points on the Earth.
 * @param lat1 
 * @param lon1 
 * @param lat2 
 * @param lon2 
 * @returns distance between two points in km
 */

export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number => {
  const R = 6371; // Earth radius 
  const dLat1 = ((lat2 - lat1) * Math.PI) / 180; // difference in latitude
  const dLon1 = ((lon2 - lon1) * Math.PI) / 180; // difference in longitude

  const a =
    Math.sin(dLat1 / 2) * Math.sin(dLat1 / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon1 / 2) *
      Math.sin(dLon1 / 2);  // a is the square of half the chord length between the points

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // c is the angular distance in radians


  return R * c; // distance in km
};
