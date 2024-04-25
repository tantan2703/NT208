import React from 'react'
import {useParams} from 'react-router-dom'
import SingleBanner from '../Components/Banners/Banner'
import banner_img from '../Components/Assets/jeremy-budiman-unsplash.jpg'
import './CSS/UserProfile.css'
import UserSidebar from '../Components/UserProfile/UserSidebar'
import AccountSettings from '../Components/UserProfile/AccountSettings'
import './CSS/UserProfile.css'
import ChangePassword from '../Components/UserProfile/ChangePassword'
import YourOrders from '../Components/UserProfile/YourOrders'
import UserAddress from '../Components/UserProfile/UserAddress'
import LegalNotice from '../Components/UserProfile/LegalNotice'
import Overview from '../Components/UserProfile/Overview'
const UserProfile = () => {
    const {activepage} = useParams()

    return (
        <div className='User-container'>
            <SingleBanner heading='My Profile' bannerimage={banner_img}/>
            <div className='userprofilein'>
                <div className='userprofile-left'>
                    <UserSidebar activepage={activepage}/>
                </div>
                <div className='userprofile-right'>
                    {!activepage || activepage === 'overview' && <Overview/>}
                    {activepage === 'accountsettings' && <AccountSettings/>}
                    {activepage === 'changepassword' && <ChangePassword/>}
                    {activepage === 'yourorders' && <YourOrders/>}
                    {activepage === 'address' && <UserAddress/> }
                    {activepage === 'legalnotice' && <LegalNotice/>}
                </div>
            </div>
        </div>
    )
}

export default UserProfile