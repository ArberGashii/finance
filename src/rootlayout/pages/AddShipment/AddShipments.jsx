import {
  Button,
  Form,
  Input,
  InputNumber,
  Card,
  Select,
  message,
  DatePicker,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  availableSizes,
  category,
  colors,
  kosovaCities,
  statuses,
  typeOfProduct,
} from "../../../constants";
import { useCallback, useState } from "react";
import useAuthenticate from "../../../zustand/useAuth";
import { post } from "../../../api/post";
import dayjs from "dayjs";
import { put } from "../../../api/put";

const { Item } = Form;

const createLabel = (label) => (
  <span className="text-lg font-medium">{label}</span>
);

const rules = [{ required: true, message: "This field is required" }];

const initialValues = {
  status: "",
  // createdAt: Date.now(),
  // updatedAt: Date.now(),
  city: "",
  country: "Kosova",
  address: "",
  phone: 0,
  pieces: 0,
  products: [{ cod: 0, cop: 0, color: "", category: "", type: "", size: "" }],
  xId: "",
  receiverUserName: "",
  createdAt: dayjs(),
  updatedAt: dayjs(),
};

const AddShipments = ({
  edit = false,
  setEdit = () => {},
  shipmentsUpdater = () => {},
}) => {
  const currentUser = useAuthenticate((state) => state.currentUser);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const piecesInput = Form.useWatch("pieces", form);

  const handleFinishForm = useCallback(
    async (values) => {
      setLoading(true);
      const proceedValues = {
        ...values,
        createdBy: {
          id: currentUser.uid,
          email: currentUser.email,
        },
        isPaid: false,
        createdAt: values.createdAt ? values.createdAt.valueOf() : Date.now(),
        updatedAt: values.updatedAt ? values.updatedAt.valueOf() : Date.now(),
      };

      try {
        (await edit)
          ? put("shipments", { ...proceedValues, id: edit.id })
          : post("shipments", proceedValues);
        edit ? setEdit(false) : navigate("/finance/");
        edit && shipmentsUpdater("edit", { ...proceedValues, id: edit.id });
        message.success("shipments added successful");
        setLoading(false);
      } catch (error) {
        console.log({ error });
        message.error();
        setLoading(false);
      }
    },
    [currentUser.email, currentUser.uid, navigate, edit, setEdit]
  );

  const handleCancel = useCallback(() => {
    navigate("/finance/");
  }, [navigate]);

  const defValues = edit
    ? {
        ...edit,
        createdAt: dayjs(),
        updatedAt: dayjs(),
      }
    : initialValues;

  return (
    <div className="flex flex-col gap-4">
      <Form
        form={form}
        initialValues={defValues}
        onFinish={handleFinishForm}
        layout="vertical"
        size="large"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Item rules={rules} name="city" label={createLabel("City")}>
            <Select
              showSearch
              allowClear
              options={kosovaCities}
              placeholder="Enter city..."
            />
          </Item>
          <Item rules={rules} name="xId" label={createLabel("X-ID")}>
            <Input placeholder="Enter X-ID..." />
          </Item>
          <Item rules={rules} name="country" label={createLabel("Country")}>
            <Input disabled placeholder="Enter country..." />
          </Item>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Item name="address" label={createLabel("Address")}>
            <Input placeholder="Enter address..." />
          </Item>

          <Item rules={rules} name="status" label={createLabel("Status")}>
            <Select
              showSearch
              allowClear
              options={statuses.map((el) => ({ label: el, value: el }))}
              placeholder="Choose status..."
            />
          </Item>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Item
            name="receiverFullName"
            label={createLabel("Receiver Full Name")}
          >
            <Input placeholder="Enter Receiver Full Name..." />
          </Item>
          <Item
            name="receiverUserName"
            label={createLabel("Receiver User Name")}
          >
            <Input placeholder="Enter Receiver User Name..." />
          </Item>
        </div>
        <Item name="createdAt" label={createLabel("Created At")}>
          <DatePicker
            format={{
              format: "YYYY-MM-DD",
              type: "mask",
            }}
          />
        </Item>

        <Item name="updatedAt" label={createLabel("Updated At")}>
          <DatePicker
            format={{
              format: "YYYY-MM-DD",
              type: "mask",
            }}
          />
        </Item>

        <Item rules={rules} name="phone" label={createLabel("Phone")}>
          <InputNumber
            type="number"
            className="w-full"
            placeholder="Enter phone..."
          />
        </Item>

        <Item
          rules={[{ required: true, message: "Please input a piece amount!" }]}
          name="pieces"
          label={createLabel("Pieces")}
        >
          <InputNumber
            type="number"
            className="w-full"
            placeholder="Enter piece amount..."
          />
        </Item>

        {piecesInput ? (
          <Form.List name="products">
            {(fields, { add, remove }) => (
              <>
                {Array.from({ length: piecesInput }, (_, i) => (
                  <Card
                    key={i}
                    title={`Details for piece ${i + 1}`}
                    bordered={true}
                    className="mb-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Item
                        {...fields[i]} // Ensure each piece's field is uniquely handled
                        name={[i, "cod"]}
                        rules={rules}
                        label={createLabel("COD Amount")}
                      >
                        <InputNumber
                          className="w-full"
                          placeholder="Enter COD amount..."
                        />
                      </Item>
                      <Item
                        {...fields[i]}
                        name={[i, "cop"]}
                        rules={rules}
                        label={createLabel("COP Amount")}
                      >
                        <InputNumber
                          className="w-full"
                          placeholder="Enter COP amount..."
                        />
                      </Item>
                      <Item
                        {...fields[i]}
                        name={[i, "color"]}
                        rules={rules}
                        label={createLabel("Color")}
                      >
                        <Select
                          allowClear
                          showSearch
                          options={colors.map((el) => ({
                            label: el,
                            value: el,
                          }))}
                          placeholder="Enter color of product..."
                        />
                      </Item>
                      <Item
                        {...fields[i]}
                        rules={rules}
                        name={[i, "category"]}
                        label={createLabel("Category")}
                      >
                        <Select
                          allowClear
                          showSearch
                          options={category.map((el) => ({
                            label: el,
                            value: el,
                          }))}
                          placeholder="Enter product category..."
                        />
                      </Item>
                      <Item
                        {...fields[i]}
                        name={[i, "type"]}
                        rules={rules}
                        label={createLabel("Type")}
                      >
                        <Select
                          allowClear
                          showSearch
                          options={typeOfProduct.map((el) => ({
                            label: el,
                            value: el,
                          }))}
                          placeholder="Enter product type..."
                        />
                      </Item>
                      <Item
                        {...fields[i]}
                        name={[i, "size"]}
                        label={createLabel("Size")}
                        rules={rules}
                      >
                        <Select
                          allowClear
                          showSearch
                          options={availableSizes.map((el) => ({
                            label: el,
                            value: el,
                          }))}
                          placeholder="chose size..."
                        />
                      </Item>
                    </div>
                  </Card>
                ))}
              </>
            )}
          </Form.List>
        ) : null}

        <div className="flex justify-between gap-4 mt-6">
          <Button
            htmlType="reset"
            className="bg-red-500 text-white hover:bg-red-600 px-6 py-2 rounded-md"
            onClick={edit ? () => setEdit(false) : handleCancel}
          >
            Cancel
          </Button>
          <Button
            disabled={loading}
            htmlType="submit"
            className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-md"
          >
            {loading ? "sending...." : `${edit ? "Edit" : "Register"}`}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddShipments;
