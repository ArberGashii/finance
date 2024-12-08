export const sumShipmentsCodByStatus = (shipments, key) => {
  return shipments.reduce((sum, shipment) => {
    const sumConst = shipment.products.reduce(
      (productSum, product) => productSum + product[key],
      0
    ); // Sum cod in products
    return sum + sumConst; // Add to the total sum
  }, 0);
};
