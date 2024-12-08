import { FallOutlined, RiseOutlined } from "@ant-design/icons";
const colorOfStatus = {
  delivered: "text-green-600",
  refused: "text-red-600",
  "awaiting pickup": "text-blue-600",
};

const StatsCard = ({
  title = "",
  percentage = 0,
  cod = 0,
  period = "",
  status = "",
  length = { packs: 0, pieces: 0 },
}) => {
  // Add conditional logic for percentage formatting
  const formattedPercentage =
    percentage < 0 ? (
      <span className="text-red-600">
        {percentage}% <FallOutlined />
      </span>
    ) : (
      <span className="text-green-600">
        +{percentage}% <RiseOutlined />
      </span>
    );

  return (
    <div className="bg-white w-full rounded-md drop-shadow-sm p-4 flex flex-col gap-1">
      <div className="flex justify-between">
        <span>{title}</span>
        {formattedPercentage}
      </div>
      <div className="font-bold text-2xl">$ {cod}</div>
      <div className="flex justify-between mt-3">
        <span>{period}</span>
        <span className={colorOfStatus[status]}>{status}</span>
      </div>
      <div>
        <span>
          {length.packs} packs | {length.pieces} pieces
        </span>
      </div>
    </div>
  );
};

export default StatsCard;
