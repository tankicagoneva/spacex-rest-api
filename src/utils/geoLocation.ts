/**
 *  Haversine formula to calculate distance between two points on the Earth.
  * @param latA latitude of the first point
  * @param latB latitude of the second point
  * @param lonA longitude of the first point
  * @param lonB longitude of the second point
 * @returns distance between two points in km
 */

export const calculateDistance = (
  latA: number,
  latB: number,
  lonB: number,
  lonA: number,
): number => {
  const R = 6371; // Earth radius 
  const dLatA = ((latB - latA) * Math.PI) / 180; // difference in latitude
  const dLonA = ((lonB - lonA) * Math.PI) / 180; // difference in longitude

  const chordLengthBetweenPoints  =
    Math.sin(dLatA / 2) * Math.sin(dLatA / 2) +
    Math.cos((latA * Math.PI) / 180) *
      Math.cos((latB * Math.PI) / 180) *
      Math.sin(dLonA / 2) *
      Math.sin(dLonA / 2);  

  const angularDistance  = 2 * Math.atan2(Math.sqrt(chordLengthBetweenPoints ), Math.sqrt(1 - chordLengthBetweenPoints )); 


  return R * angularDistance ; // distance in km
};
