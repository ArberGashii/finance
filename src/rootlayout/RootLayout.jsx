import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
const RootLayout = () => {
  return (
    <section className="h-screen bg-[#f9faff] flex">
      <Sidebar />
      <div className="flex flex-col mx-4 my-6 gap-4">
        <Navbar />
        <div>aaa</div>
      </div>
    </section>
  );
};

export default RootLayout;
