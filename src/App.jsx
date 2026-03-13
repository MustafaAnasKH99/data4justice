import { useEffect, useState } from "react";
import Papa from "papaparse";
import DataViewer from "./components/DataViewer.jsx";
import DataSummary from "./components/DataSummary.jsx";
import logo from "./assets/logo.png";
import "./App.css";

export default function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    search: "",
    yearRange: [2011, 2024]
  });

  const [yearRange, setYearRange] = useState([2011, 2024]);

  const filteredData = data.filter(row =>
    row['عنوان السياسية'].toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    Papa.parse("/data.csv", {
      download: true,
      header: true,
      complete: (results) => {
        setData(results.data);
      }
    });
  }, []);

  return (
    <div className="bg-main">
      <div className="p-8 text-white flex justify-center w-full">
        <img className="w-160" src={logo} alt="Company Logo" />
      </div>
      <DataViewer data={data} />
    </div>
  );
}
