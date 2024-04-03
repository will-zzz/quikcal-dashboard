import Logo from "./images/Logo.png";
import BarGraph from "./components/BarGraph";
import CompanyCard from "./components/CompanyCard";

export default function App() {
  return (
    <div>
      {/* Navbar: Logo and title */}
      <div className="flex items-center justify-between p-2">
        <img src={Logo} alt="logo" className="h-12" />
        <h1 className="text-2xl font-bold ml-4">QuikCal Dashboard</h1>
      </div>
      {/* Body */}
      <div className="flex flex-col items-center p-4 bg-gray-300 h-[calc(100vh-64px)]">
        <div className="flex items-center justify-center w-3/4 border-2 border-red-500 h-[75vh]">
          <BarGraph />
        </div>

        <div className="flex flex-wrap justify-center h-[25vh] overflow-auto border-2 border-red-500">
          <CompanyCard />
          <CompanyCard />
          <CompanyCard />
          <CompanyCard />
        </div>
      </div>
    </div>
  );
}
