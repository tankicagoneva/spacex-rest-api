export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number => {
  const R = 6371; // metres
  const dLat1 = ((lat2 - lat1) * Math.PI) / 180;
  const dLon1 = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat1 / 2) * Math.sin(dLat1 / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon1 / 2) *
      Math.sin(dLon1 / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};
