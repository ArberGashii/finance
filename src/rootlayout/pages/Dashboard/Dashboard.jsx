import StatsCard from "../../../components/Card/StatsCard";
import { useCallback, useEffect, useMemo, useState } from "react";
import { sumShipmentsCodByStatus } from "../../../functions/sumShipmentsCodByStatus";
import { sumShipmentsByStatus } from "../../../functions/shipmentsFunctions";
import { DatePicker, Segmented, Skeleton } from "antd";
import { useShipmentsState } from "../../../zustand/useShipmentsState";
import {
  filterShipmentsByPeriod,
  makePeriodReadable,
  returnPercentageOfSales,
} from "../../../functions/filterShipmentsByPeriod";
import LineChart from "../../../components/Charts/LineChart";
import Shipments from "./Shipments";
import { get } from "../../../api/get";

const { RangePicker } = DatePicker;

const Dashboard = () => {
  // state
  const [loadingShipments, setLoadingShipments] = useState(false);
  const [shipments, setShipments] = useState([]);
  const { selectedPeriod, setSelectedPeriod } = useShipmentsState();

  const fetchShipments = async (table, field, condition) => {
    return await get(table, field, condition);
  };

  const shipmentsUpdater = useCallback((action, newData) => {
    if (action === "edit") {
      setShipments((prev) =>
        prev.map((data) => (data.id === newData.id ? newData : data))
      );
    } else if (action === "delete") {
      setShipments((prev) => prev.filter((data) => data.id !== newData));
    }
  }, []);

  useEffect(() => {
    setLoadingShipments(true);
    const fetchData = async () => {
      try {
        const res = await fetchShipments("shipments");
        console.log({ res });
        setLoadingShipments(false);
        setShipments(res);
      } catch (error) {
        setLoadingShipments(false);
        console.log({ error });
      }
    };

    fetchData();
  }, []);

  // by status start
  const deliveredShipments = useMemo(() => {
    return sumShipmentsByStatus(shipments, "delivered");
  }, [shipments]);

  const awaitingPickupShipments = useMemo(() => {
    return sumShipmentsByStatus(shipments, "awaiting pickup");
  }, [shipments]);

  const filteredShipmentsAP = useMemo(
    () => filterShipmentsByPeriod(awaitingPickupShipments, selectedPeriod),
    [awaitingPickupShipments, selectedPeriod]
  );

  const awaitingPickupCod = useMemo(() => {
    const toReturn = sumShipmentsCodByStatus(filteredShipmentsAP, "cod");
    return toReturn;
  }, [filteredShipmentsAP]);

  const percentageCodAP = returnPercentageOfSales(
    awaitingPickupCod,
    selectedPeriod,
    awaitingPickupShipments,
    "cod"
  );

  // filtered shipments by period start
  const filteredShipments = useMemo(
    () => filterShipmentsByPeriod(deliveredShipments, selectedPeriod),
    [deliveredShipments, selectedPeriod]
  );

  // sum of shipments start
  const deliveredCod = useMemo(() => {
    const toReturn = sumShipmentsCodByStatus(filteredShipments, "cod");
    return toReturn;
  }, [filteredShipments]);

  const deliveredCop = useMemo(() => {
    const toReturn = sumShipmentsCodByStatus(filteredShipments, "cop");
    return toReturn;
  }, [filteredShipments]);
  // sum of shipments end

  const modifiedSelectedPeriod = useMemo(() => {
    return typeof selectedPeriod !== "string"
      ? makePeriodReadable(selectedPeriod)
      : selectedPeriod;
  }, [selectedPeriod]);

  const percentageCod = returnPercentageOfSales(
    deliveredCod,
    selectedPeriod,
    deliveredShipments,
    "cod"
  );

  const percentageCop = returnPercentageOfSales(
    deliveredCop,
    selectedPeriod,
    deliveredShipments,
    "cop"
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between w-full flex-col sm:flex-row">
        <Segmented
          value={selectedPeriod}
          onChange={setSelectedPeriod}
          className="bg-[#f3f5ff] overflow-auto"
          style={{ maxWidth: window.innerWidth - 32 }}
          options={[
            "Daily",
            "Yesterday",
            "This week",
            "Last week",
            "This month",
            "Last month",
            "All time",
          ]}
        />
        <RangePicker
          onChange={setSelectedPeriod}
          className="w-full sm:w-auto mt-2 sm:mt-0"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <StatsCard
          percentage={percentageCod}
          title="Total sales"
          period={modifiedSelectedPeriod}
          status="delivered"
          cod={deliveredCod}
          length={{
            packs: filteredShipments.length,
            pieces: filteredShipments.flatMap(({ products }) => products)
              .length,
          }}
        />
        <StatsCard
          percentage={percentageCop}
          title="Total profit"
          period={modifiedSelectedPeriod}
          status="delivered"
          cod={deliveredCop}
          length={{
            packs: filteredShipments.length,
            pieces: filteredShipments.flatMap(({ products }) => products)
              .length,
          }}
        />
        <StatsCard
          percentage={percentageCodAP}
          title="Total amount"
          period={modifiedSelectedPeriod}
          status="awaiting pickup"
          cod={awaitingPickupCod}
          length={{
            packs: filteredShipmentsAP.length,
            pieces: filteredShipmentsAP.flatMap(({ products }) => products)
              .length,
          }}
        />
      </div>

      <div className="flex items-center justify-center bg-white drop-shadow-sm rounded-md py-1">
        Showing ({filteredShipments.length} filtered shipments) of (
        {shipments.length} total shipments)
      </div>

      {loadingShipments ? (
        <div className="w-full">
          <Skeleton active />
        </div>
      ) : (
        <>
          <Shipments
            rowData={[...filteredShipments, ...filteredShipmentsAP]}
            shipmentsUpdater={shipmentsUpdater}
          />
          <div className="bg-white rounded-md drop-shadow-sm p-4">
            <LineChart rowData={filteredShipments} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
