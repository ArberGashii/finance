import { Modal, Timeline } from "antd";
import {
  CheckOutlined,
  ClockCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import "./Dashboard.scss";
import { useCallback, useState } from "react";
import { deleteApi } from "../../../api/delete";
import AddShipments from "../AddShipment/AddShipments";

const generateIconBasedOnStatus = (status) => {
  const icons = {
    "awaiting pickup": <ClockCircleOutlined />,
    delivered: <CheckOutlined />,
  };

  return icons[status] || null;
};

const generateColorsBasedOnStatus = (status) => {
  const icons = {
    "awaiting pickup": "bg-blue-100 text-blue-600",
    delivered: "bg-green-100 text-green-600",
  };

  return icons[status] || null;
};

const Shipments = ({ rowData, shipmentsUpdater }) => {
  const onDelete = useCallback(
    async (data) => {
      try {
        await deleteApi("shipments", data.id);
        shipmentsUpdater("delete", data.id);
      } catch (error) {
        console.log({ error });
      }
    },
    [shipmentsUpdater]
  );

  const [openEdit, setOpenEdit] = useState();

  const onEdit = useCallback(async (data) => {
    setOpenEdit(data);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {rowData.map((data) => (
        <div
          className="bg-white rounded-lg drop-shadow-sm p-4 flex flex-col transition-shadow"
          key={data.id}
        >
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <div>
              <span className="text-xs text-gray-500">Tracking ID</span>
              <h3 className="font-bold text-sm">{data.xId}</h3>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${generateColorsBasedOnStatus(
                  data.status
                )}`}
              >
                {generateIconBasedOnStatus(data.status)}
              </div>
              <div className="flex gap-2">
                <button
                  className="text-blue-500 hover:text-blue-700 transition"
                  onClick={() => onEdit(data)}
                  aria-label="Delete"
                >
                  <EditOutlined />
                </button>
                <button
                  className="text-red-500 hover:text-red-700 transition"
                  onClick={() => onDelete(data)}
                  aria-label="Delete"
                >
                  <DeleteOutlined />
                </button>
              </div>
            </div>
          </div>

          {/* City Information */}
          <div className="flex justify-between items-center">
            <div className="mt-3">
              <span className="text-xs text-gray-500">City</span>
              <h3 className="font-bold">{data.city}</h3>
            </div>
            <span>({data.products.length} product)</span>
          </div>

          <hr className="my-4 border-gray-200" />

          <Timeline
            className="custom-timeline"
            items={[
              {
                color: "blue",
                children: `created at ${dayjs(data.createdAt).format(
                  "MM/DD/YYYY hh:mm A"
                )}`,
              },
              {
                color: "green",
                children: `${data.status} at ${dayjs(data.updatedAt).format(
                  "MM/DD/YYYY hh:mm A"
                )}`,
              },
            ]}
          />

          <div className="mt-4">
            <span className="text-xs text-gray-500">Customer</span>
            <h3 className="font-bold text-sm">
              {data.receiverFullName} - {data.phone}
            </h3>
          </div>

          <hr className="my-4 border-gray-200" />

          <div className="overflow-x-auto">
            <div className="inline-flex gap-2 min-w-max">
              {data.products.map((product, index) => {
                return (
                  <div className="border rounded-md p-2" key={index}>
                    <span>
                      {product.category} - {product.type} - {product.color} -{" "}
                      {product.size}
                    </span>
                    <div className="flex gap-4 items-center">
                      <div>
                        <span className="text-xs text-gray-500">COD</span>
                        <h3 className="font-bold text-sm text-green-600">
                          ${product.cod}
                        </h3>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">COP</span>
                        <h3 className="font-bold text-sm text-green-600">
                          ${product.cop}
                        </h3>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
      {openEdit && (
        <Modal
          footer={null}
          open={openEdit}
          onCancel={() => setOpenEdit(false)}
        >
          <AddShipments
            edit={openEdit}
            setEdit={setOpenEdit}
            shipmentsUpdater={shipmentsUpdater}
          />
        </Modal>
      )}
    </div>
  );
};

export default Shipments;
