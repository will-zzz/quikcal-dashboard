import Logo from "./images/Logo.png";
import BarGraph from "./components/BarGraph";
import CompanyCard from "./components/CompanyCard";

export default function App() {
  return (
    <div>
      {/* Navbar: Logo and title */}
      <div className="flex flex-row items-center p-2">
        <img src={Logo} alt="logo" className="h-12" />
        <h1 className="text-2xl font-bold ml-4">QuikCal Dashboard</h1>
      </div>
      {/* Body */}
      <div className="flex flex-col items-center p-4 bg-gray-200 h-[calc(100vh-64px)]">
        <div className="flex items-center justify-center w-3/4 h-[75vh] bg-white rounded-2xl shadow-lg">
          <BarGraph />
        </div>

        <div className="flex flex-wrap justify-center h-[25vh] overflow-auto bg-white rounded-2xl shadow-lg mt-4 m">
          <CompanyCard />
          <CompanyCard />
          <CompanyCard />
          <CompanyCard />
        </div>
      </div>
    </div>
  );
}
