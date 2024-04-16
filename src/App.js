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
        <div className="w-3/4 h-[65vh] bg-white rounded-2xl shadow-lg flex justify-center items-center">
          {/* Using this weird styling here because idk the graph library is being weird */}
          <div style={{ height: "95%", width: "95%" }}>
            <BarGraph />
          </div>
        </div>

        <div className="flex flex-wrap justify-center w-3/4 h-[35vh] overflow-auto bg-white rounded-2xl shadow-lg mt-4 pt-1">
          <CompanyCard
            name="Company Name"
            time="12:30 PM - 1:30 PM"
            info="Info about the delivery."
          />
          <CompanyCard
            name="Company Name"
            time="12:30 PM - 1:30 PM"
            info="Info about the delivery."
          />
          <CompanyCard
            name="Company Name"
            time="12:30 PM - 1:30 PM"
            info="Info about the delivery."
          />
          <CompanyCard
            name="Company Name"
            time="12:30 PM - 1:30 PM"
            info="Info about the delivery."
          />
        </div>
      </div>
    </div>
  );
}
