import { useEffect, useState, useRef } from "react";
import { db } from "../../db/AppDatabase";

async function syncLocalChanges() {
  try {
    const addedRecords = await db.companies.where('syncStatus').equals('added').toArray();
    const updatedRecords = await db.companies.where('syncStatus').equals('updated').toArray();
    const deletedRecords = await db.companies.where('syncStatus').equals('deleted').toArray();

    for (const record of addedRecords) {
      try {
        const response = await fetch('http://localhost:3001/v1/company', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cnpj: record.cnpj,
            name: record.name,
            address: record.address,
            phone: record.phone
          })
        });

        if (response.ok) {
          const serverRecord = await response.json();
          await db.companies.put({
            ...serverRecord,
            syncStatus: 'synced'
          });
        }
      } catch (error) {
        console.error(`Failed to sync added record ${record.id}:`, error);
      }
    }

    for (const record of updatedRecords) {
      try {
        const response = await fetch(`http://localhost:3001/v1/company/${record.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cnpj: record.cnpj,
            name: record.name,
            address: record.address,
            phone: record.phone
          })
        });

        if (response.ok) {
          await db.companies.put({
            ...record,
            syncStatus: 'synced'
          });
        }
      } catch (error) {
        console.error(`Failed to sync updated record ${record.id}:`, error);
      }
    }

    for (const record of deletedRecords) {
      try {
        const response = await fetch(`http://localhost:3001/v1/company/${record.id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          await db.companies.delete(record.id);
        }
      } catch (error) {
        console.error(`Failed to sync deleted record ${record.id}:`, error);
      }
    }

    await fetchServerChanges();

  } catch (error) {
    console.error("Sync failed:", error);
    throw error;
  }
}

async function fetchServerChanges() {
  try {
    const response = await fetch("http://localhost:3001/v1/company");
    if (!response.ok) throw new Error("Failed to fetch data from server");
    
    const serverCompanies = await response.json();
    
    const localCompanies = await db.companies
      .where('syncStatus')
      .equals('synced')
      .toArray();
    
    const localCompaniesMap = new Map(
      localCompanies.map(company => [company.id, company])
    );
    
    for (const serverCompany of serverCompanies) {
      const localCompany = localCompaniesMap.get(serverCompany.id);
      
      if (!localCompany || new Date(serverCompany.updatedAt) > new Date(localCompany.updatedAt)) {
        await db.companies.put({
          ...serverCompany,
          syncStatus: 'synced'
        });
      }
    }
  } catch (error) {
    console.error("Failed to fetch server changes:", error);
    throw error;
  }
}

function NavOnOff() {
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const lastOfflineTime = useRef<number>(0);
  const lastOnlineTime = useRef<number>(0);
  const [isSyncing, setIsSyncing] = useState(false);

  const checkApiHealth = async () => {
    try {
      const response = await fetch("http://localhost:3001/v1/health");
      const currentlyOnline = response.ok;
      
      if (currentlyOnline) {
        const currentTime = Date.now();
        
        if (!isOnline && lastOfflineTime.current > lastOnlineTime.current && !isSyncing) {
          console.log("API is back online, syncing data...");
          setIsSyncing(true);
          try {
            await syncLocalChanges();
          } finally {
            setIsSyncing(false);
          }
        }
        
        lastOnlineTime.current = currentTime;
        setIsOnline(true);
        //console.log('Online');
      } else {
        throw new Error('API is not OK');
      }
    } catch (error) {
      const currentTime = Date.now();
      lastOfflineTime.current = currentTime;
      setIsOnline(false);
      // console.log('Offline');
    }
  };

  useEffect(() => {
    const syncInitialChanges = async () => {
      console.log('Sync on build')
      await syncLocalChanges();
    };
    syncInitialChanges();
    checkApiHealth();
    const interval = setInterval(checkApiHealth, 5000);
    return () => clearInterval(interval);
  }, []);

  
  return (
    <li className="nav-item nav-onoff">
      <div className="status-indicator-container">
        <div
          className={`status-indicator online ${isOnline ? "active" : ""}`}
          title="API is online"
        ></div>
      </div>
      <div className="status-indicator-container">
        <div
          className={`status-indicator offline ${!isOnline ? "active" : ""}`}
          title="API is offline"
        ></div>
      </div>
    </li>
  );
}

export default NavOnOff;