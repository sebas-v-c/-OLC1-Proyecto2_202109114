import React, { useState } from 'react';
import "../../scss/Tabs.scss";

type Tab = {
    onTabClick: (index: number) => void;
    onNewTab: () => void;
    onRemoveTab: (index: number) => void;
    tabNames: string[];
    currentTab: number;
}

export default function Tabs({ onTabClick, onNewTab, onRemoveTab, tabNames, currentTab }: Tab) {

    return (
        <div className='tab-container'>
            <div className='tab-buttons'>
                {tabNames.map((tab, index) => (
                    <div key={index} >
                        <button
                            className={index === currentTab ? 'tab-button active-tab-button' : 'tab-button hidden-tab-button'}
                            onClick={() => onTabClick(index)}
                        >
                            {tab}

                            <span className="close" onClick={() => {onRemoveTab(index)}}>x</span>
                        </button>
                    </div>
                ))}
                <button className='add-tab' onClick={onNewTab}>+</button>
            </div>
        </div>
    );

}
