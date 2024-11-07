import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Compare from './Compare/Compare';
import Myorder from './Myorder/Myorder';

const Profile = () => {
    return (
        <div className=' container mx-auto p-24 '>
            <Tabs>
                <TabList>
                    <Tab>My Order</Tab>
                    <Tab>Compare</Tab>
                </TabList>

                <TabPanel>
                    <Myorder></Myorder>
                </TabPanel>
                
                <TabPanel>
                   <Compare></Compare>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Profile;
