"use client";

import { useSession } from 'next-auth/react';
import { useEffect, useState } from "react";
import { DateTime } from "luxon";

// styles
import dashboard from "./dashboard.module.css";
import { useQueryProcessor } from '@/hooks/useTanstackQuery';
import { formatToDecimal } from '@/lib/numberFormatter';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

// assets

export default function Dashboard() {
  const { data: session, status} = useSession();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [initialDateTime, setInitialDateTime] = useState(null); // Store initial time from server  
  
  useEffect(() => {
    // Set initial date and time when authenticated
    if (status === 'authenticated') {
      setDate(DateTime.now().toLocaleString(DateTime.DATE_HUGE));
      setTime(DateTime.now().toLocaleString(DateTime.TIME_SIMPLE));
    }
  }, [status]);
  
  console.log("process.env.NEXT_PUBLIC_BACKEND_URL", process.env.NEXT_PUBLIC_BACKEND_URL)
  useEffect(() => {
    if (status === 'authenticated') {
      // Determine the API URL based on the environment
       
      // Fetch data from the server
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/datetime`)
        .then(response => response.json())
        .then(data => {
          const serverDateTime = DateTime.fromISO(data.datetime); // Parse the datetime from the server
          setInitialDateTime(serverDateTime); // Store the initial server datetime
          setDate(serverDateTime.toLocaleString(DateTime.DATE_HUGE)); // Set the date
          setTime(serverDateTime.toLocaleString(DateTime.TIME_SIMPLE)); // Set the initial time
        })
        .catch(error => {
          console.error('Error fetching date and time:', error);
        });
    }
  }, [status]);

  useEffect(() => {
    // Only start real-time updates if initialDateTime has been set
    if (!initialDateTime) return;

    // Update the time every 10 seconds
    const interval = setInterval(() => {
      const updatedDateTime = initialDateTime.plus({ seconds: 10 }); // Add 10 seconds to initial time
      setTime(updatedDateTime.toLocaleString(DateTime.TIME_SIMPLE)); // Update the time
      setInitialDateTime(updatedDateTime); // Update the initial time reference
    }, 10000); // Run every 10 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [initialDateTime]);

  const {data, status:dashboardStatus} = useQueryProcessor({
    url:`/admin/dashboard`,
    key:['dashboard','admin'],
  })
  const monthMapping = {
    "01": "January",
    "02": "february",
    "03": "march",
    "04": "april",
    "05": "may",
    "06": "june",
    "07": "july",
    "08": "august",
    "09": "september",
    "10": "october",
    "11": "november",
    "12": "december",
  };
  const router = useRouter()
  // Show a loading state while authentication is being checked
  if (status === "loading" || dashboardStatus === "pending") {
    return <p>Loading...</p>;
  }  

  const month = (new Date().getMonth() +1) > 9 ? monthMapping[`${(new Date().getMonth() + 1)}`] : monthMapping[`0${(new Date().getMonth() + 1)}`]
  const year = new Date().getFullYear()
  // The user should be authenticated at this point
  // You can proceed to render the dashboard UI
  return (
    <div className={dashboard.main_content_container}>
      <div className={dashboard.main_hero_container}>
        <h3 className={dashboard.hero_head}>
          Welcome {session.user.username}!
        </h3>
        <h6 className={dashboard.hero_info}>{date} | {time}</h6>
        <h6 className={`ml-14 -mt-10 mb-5`}>Here&apos;s a rundown for {month} {year}</h6>
      </div>

      <div className={dashboard.main_content_row_div}>
        <div className={dashboard.main_stats_div}>
          <h6 className={dashboard.stats_head}>Total Collections for Month </h6>
          <div className={dashboard.stats_info_div}>
            <h3 className={dashboard.stats_info + ``}>{formatToDecimal(data?.totalStatments?.totalCollections)}</h3>
          </div>
        </div>

        <div className={dashboard.main_stats_div}>
          <h6 className={dashboard.stats_head}>Remaining Collectibles</h6>
          <div className={dashboard.stats_info_div}>
            <h3 className={dashboard.stats_info}>{formatToDecimal(data?.totalStatments?.totalCollectibles)}</h3>
          </div>
        </div>
      </div>

      <div className='bg-white rounded-[25px] px-7 py-5 w-[98%] mx-auto flex items-center justify-between'>
        <span className='font-semibold'>Pending Transactions ({data?.noOfPendingTransaction})</span>
        <Button onClick={() => router.push('/transactions')} >View Transactions</Button>
      </div>


      <div className={dashboard.main_content_row_div}>
        <div className={dashboard.main_stats_div}>
          <h6 className={dashboard.stats_head}>Total Hoa Due Collection </h6>
          <div className={dashboard.stats_info_div}>
            <h3 className={dashboard.stats_info + ``}>{formatToDecimal(data?.totalCollection.hoa)}</h3>
          </div>
        </div>

        <div className={dashboard.main_stats_div}>
          <h6 className={dashboard.stats_head}>Total Water Due Collection </h6>
          <div className={dashboard.stats_info_div}>
            <h3 className={dashboard.stats_info}>{formatToDecimal(data?.totalCollection.water)}</h3>
          </div>
        </div>

        <div className={dashboard.main_stats_div}>
          <h6 className={dashboard.stats_head}>Total Wallet Incoming </h6>
          <div className={dashboard.stats_info_div}>
            <h3 className={dashboard.stats_info}>{formatToDecimal(data?.totalWalletCollectionsThisMonth)}</h3>
          </div>
        </div>

      </div>
    </div>
  );
}