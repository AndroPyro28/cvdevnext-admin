"use client"

import Link from "next/link";

// styles
import settings from "../settings.module.css";
import waset from "./waset.module.css";
import { useState, useEffect } from "react";

// assets

// components
import SettingsWaterListItem from "../components/SettingsWaterListItem.js";

export default function GarbageCollectionSettings() {
    const [miscData, setMiscData] = useState([]); // State to store the data
    const [miscType, setMiscType] = useState("water_rate");
    const [miscAnnRate, setMiscAnnRate] = useState(null);
    const [miscAnnUnit, setMiscAnnUnit] = useState("n/a");
    const [miscUnit, setMiscUnit] = useState("n/a");
    const [miscUnitAmt, setMiscUnitAmt] = useState(null);
    const [miscRangeMin, setMiscRangeMin] = useState("n/a");
    const [miscRangeMax, setMiscRangeMax] = useState("n/a");
    const [miscDesc, setMiscDesc] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Fetch data when the component is mounted
    useEffect(() => {
        const fetchMisc = async () => {
        try {
            // Determine the API URL based on the environment
             

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/settings/misc`); // Call your API
            const data = await response.json(); // Parse the JSON response
            setMiscData(data); // Store the data in state
        } catch (error) {
            console.error('Error fetching data:', error); // Handle any errors
        }
        };

        fetchMisc(); // Trigger the fetch when the component mounts
    }, []); // The empty dependency array ensures this only runs on initial render

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
        setIsProcessing(true); // Set processing to true

        const calculatedMiscUnitAmt = (miscAnnRate / 12).toFixed(2);

        try {
              

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/settings/new-water-rate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    miscType,
                    miscAnnRate,
                    miscAnnUnit,
                    miscUnit,
                    calculatedMiscUnitAmt,
                    miscRangeMin,
                    miscRangeMax,
                    miscDesc,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to add a new rate");
            }

            setShowModal(false); // Close modal after successful submission
            await fetchMisc(); // Refresh the list to include the new entry
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsProcessing(false); // Reset processing state
        }
    };

    // Filter for items with misc_type === "water_rate"
    const watRateData = miscData.filter(miscInfo => miscInfo.misc_type === "water_rate");

    return (
        <div className={settings.main_content_container}>
            <div className={settings.main_content_div}>
                <div className={settings.main_settings_sidebar_div}>
                    <div className={settings.settings_sidebar_nav_div}>
                        <nav className={settings.sidebar_navlist_div}>
                            <ul className={settings.sidebar_navlist}>
                                <li className={`${settings.sidebar_navlist_item}`}>
                                    <Link href="/settings/hoa-rates">
                                        HOA Rates
                                    </Link>
                                </li>

                                <li className={`${settings.sidebar_navlist_item} ${settings.sidebar_navlist_item_active}`}>
                                    <Link href="/settings/water-rates">
                                        Water Rates
                                    </Link>
                                </li>

                                <li className={`${settings.sidebar_navlist_item}`}>
                                    <Link href="/settings/garbage-collection">
                                        Garbage Collection
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className={settings.main_settings_content_div}>
                    {/* Modal */}
                    {showModal && (
                        <div className={waset.settings_garbage_modal_div}>
                            <div className={waset.settings_garbage_modal_content}>
                                <div className={settings.settings_content_cta_row}>
                                    <h5 className={settings.settings_content_title}>Add Water Rate</h5>
                                </div>
                                
                                <form className={settings.settings_modal_form}>
                                    <div className={settings.settings_formgroup_input_div}>
                                        <p className={settings.settings_formgroup_input_label}>Fixed Rate per cu.m.</p>
                                        <input className={settings.settings_formgroup_input} 
                                        type="number" step="0.01" 
                                        value={miscAnnRate} onChange={(e) => setMiscAnnRate(e.target.value)}/>
                                    </div>
                                    <div className={settings.settings_formgroup_input_div}>
                                        <p className={settings.settings_formgroup_input_label}>Annual Unit Label</p>
                                        <input className={settings.settings_formgroup_input} 
                                        type="text" value={miscAnnUnit} disabled/>
                                    </div>
                                    <div className={settings.settings_formgroup_input_div}>
                                        <p className={settings.settings_formgroup_input_label}>Starting Meter Range</p>
                                        <input className={settings.settings_formgroup_input} 
                                        type="number" value={miscRangeMin} onChange={(e) => setMiscRangeMin(e.target.value)}/>
                                    </div>
                                    <div className={settings.settings_formgroup_input_div}>
                                        <p className={settings.settings_formgroup_input_label}>Ending Meter Range</p>
                                        <input className={settings.settings_formgroup_input} 
                                        type="number" value={miscRangeMax} onChange={(e) => setMiscRangeMax(e.target.value)}/>
                                    </div>
                                    <div className={settings.settings_formgroup_input_div}>
                                        <p className={settings.settings_formgroup_input_label}>Water Rate Description</p>
                                        <input className={settings.settings_formgroup_input} 
                                        type="text" value={miscDesc} onChange={(e) => setMiscDesc(e.target.value)}/>
                                    </div>

                                    <div className={settings.settings_formgroup_cta_div}>
                                        <button 
                                            type="button" 
                                            className={settings.settings_formgroup_close_btn} 
                                            onClick={() => setShowModal(false)}
                                        >
                                            Close
                                        </button>
                                        <button 
                                            type="submit" 
                                            className={settings.settings_formgroup_submit_btn}
                                            disabled={isProcessing} // Disable button if processing
                                            onClick={handleSubmit}
                                        >
                                            {isProcessing ? "Processing..." : "Submit"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Main Content */}
                    {!showModal && (
                        <div className={settings.main_settings_content}>
                            <div className={settings.settings_content_cta_row}>
                                <h5 className={settings.settings_content_title}>Water Rates</h5>

                                <div className={waset.settings_cta_btn_div}>
                                    <button 
                                        className={waset.settings_cta_btn} 
                                        onClick={() => setShowModal(true)}
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>

                            <div className={settings.settings_content_div}>
                                <h6 className={settings.settings_content_subtitle}>CURRENT RATE</h6>

                                {watRateData.length > 0 ? (
                                    watRateData.map((item) => (
                                        <SettingsWaterListItem key={item._id} itemData={item} />
                                    ))
                                ) : (
                                    <p>No data retrieved...</p> // Show message if no "water_rate" data is found
                                )}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}