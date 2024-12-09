import { Form, Input, Spin } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../firebase/firebase";
import { useState } from "react";
import useAuthenticate from "../../zustand/useAuth";
import { LoadingOutlined } from "@ant-design/icons";

const { Item } = Form;

const Login = () => {
  const handleLogin = useAuthenticate((state) => state.handleLogin);
  const [loading, setLoading] = useState(false);

  const handleFinish = async ({ email, password }) => {
    setLoading(true);

    await signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((res) => {
        const user = res.user;
        handleLogin({
          email: user.email,
          uid: user.uid,
          emailVerified: user.emailVerified,
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log({ error });
      });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f9faff]">
      <div className="bg-white drop-shadow-2xl rounded-lg w-96 p-8 border">
        <div className="font-bold text-3xl text-center mb-6">Login</div>
        <Form onFinish={handleFinish} layout="vertical" className="space-y-6">
          {/* Email Input */}
          <Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input placeholder="example@gmail.com" />
          </Item>

          {/* Password Input */}
          <Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="***************" />
          </Item>

          {/* Forgot Password */}
          <div className="text-right text-blue-500 text-sm cursor-pointer">
            Forgot password?
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="transition-all w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
          >
            {loading ? (
              <Spin
                indicator={<LoadingOutlined className="text-white" spin />}
              />
            ) : (
              "Sign In"
            )}
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
