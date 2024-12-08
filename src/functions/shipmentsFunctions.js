export const sumShipmentsByStatus = (shipments, targetStatus) => {
  return shipments.filter(({ status }) => status === targetStatus);
};
