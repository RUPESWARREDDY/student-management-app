import React, { useEffect, useState } from "react";
import axios from "axios";
import DeviceTable from "../../components/Table";
import { fitnessColumns, assetsColumns } from "../../constants/deviceTableColumns";

export default function DevicesTable() {
  const [devices, setDevices] = useState([]);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDevices, setShowDevices] = useState(false);
  const [showAssets, setShowAssets] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [resDevices, resAssets] = await Promise.all([
          axios.get("http://localhost:3000/fitnessdevices"),
          axios.get("http://localhost:3000/itAssets"),
        ]);
        setDevices(resDevices.data);
        setAssets(resAssets.data);
      } catch (err) {
        console.error("Fetch failed", err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
  <>
     

      <DeviceTable
        title="Fitness Devices"
        count={devices.length}
        rows={devices}
        columns={fitnessColumns}
        loading={loading}
        expanded={showDevices}
        onToggle={() => {
          setShowDevices((p) => !p);
        }}
      />
      <DeviceTable
        title="IT Assets"
        count={assets.length}
        rows={assets}
        columns={assetsColumns}
        loading={loading}
        expanded={showAssets}
        onToggle={() => {
          setShowAssets((p) => !p);
        }}
      />
    </>
  );
}
