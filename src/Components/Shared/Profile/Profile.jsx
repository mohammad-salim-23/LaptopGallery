import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Compare from './Compare/Compare';
import Myorder from './Myorder/Myorder';
import UserInfo from './UserInfo/UserInfo';

const Profile = () => {
    return (
        <div className=' md:container md:mx-auto md:p-24 '>
            <Tabs>
                <TabList>
                    <Tab>Profile</Tab>
                    <Tab>My Order</Tab>
                    <Tab>Compare</Tab>
                </TabList>

                <TabPanel>
                    <UserInfo></UserInfo>
                </TabPanel>
                

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
