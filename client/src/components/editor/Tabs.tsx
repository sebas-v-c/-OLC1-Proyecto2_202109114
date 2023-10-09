import React, { useState } from 'react';
import "../../scss/Tabs.scss";

type Tab = {
    onTabClick: (index: number) => void;
    onNewTab: () => void;
    onRemoveTab: (index: number) => void;
    tabNames: string[];
}

export default function Tabs({ onTabClick, onNewTab, onRemoveTab, tabNames }: Tab) {
    const [activeTab, setActiveTab] = useState(0);
    //const empty: Tab[] = [{content: 'Main.qc'}]
    //const [tabs, setTabs] = useState([]);
    //
    function handleTabClick(index: number) {
        setActiveTab(index);
        onTabClick(index);
    }

    return (
        <div>
            <div className='tab-buttons'>
                {tabNames.map((tab, index) => (
                    <div key={index}>
                    <button
                        className={index === activeTab ? 'active' : 'hidden'}
                        onClick={() => handleTabClick(index)}
                    >
                        {tab}
                        <span className='close' onClick={() => onRemoveTab(index)}>x</span>
                    </button>
                    </div>
                ))}
                <button className='add-tab' onClick={onNewTab}>+</button>
            </div>
            <div className='tab-content'>
                {tabNames.map((tab, index) => (
                    <div key={index} className={index === activeTab ? 'active' : 'hidden'}>
                    </div>
                ))}
            </div>
        </div>
    );

}
