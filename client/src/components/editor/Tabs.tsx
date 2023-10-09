import React, { useState } from 'react';
import "../../scss/Tabs.scss";

type Tab = {
    content?: string;
}

export default function Tabs() {
    const [activeTab, setActiveTab] = useState(0);
    //const empty: Tab[] = [{content: 'Main.qc'}]
    const [tabs, setTabs] = useState([{ content: "Main.qc" }]);

    function handleTabClick(index: number) {
        setActiveTab(index);
    }

    function handleAddTab() {
        setTabs([...tabs, { content: 'New Tab' }]);
    }

    function handleRemoveTab(index: number) {
        const newTabs = tabs.slice();
        const updatedTabs = newTabs.filter((tab, i) => i !== index);
        setTabs(updatedTabs);
    }

    return (
        <div>
            <div className='tab-buttons'>
                {tabs.map((tab, index) => (
                    <div key={index}>
                    <button
                        className={index === activeTab ? 'active' : 'hidden'}
                        onClick={() => handleTabClick(index)}
                    >
                        {tab.content}
                        <span className='close' onClick={() => handleRemoveTab(index)}>x</span>
                    </button>
                    </div>
                ))}
                <button className='add-tab' onClick={handleAddTab}>+</button>
            </div>
            <div className='tab-content'>
                {tabs.map((tab, index) => (
                    <div key={index} className={index === activeTab ? 'active' : 'hidden'}>
                        {tab.content}
                    </div>
                ))}
            </div>
        </div>
    );

}
