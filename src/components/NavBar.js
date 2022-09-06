import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import {sideBarData} from './SideBarData';
import './navbar.css'
import { IconContext } from 'react-icons';
import { Button} from "antd"


function NavBar() {
  const [sideBar, setSideBar] = useState(false)
  const showSideBar = () => setSideBar(!sideBar)

  const [subnav, setSubnav] = useState(false)
  const showSubnav = () => setSubnav(!subnav)

  return (
    <>
    <IconContext.Provider value = {{color: '#fff', size: '20px'}}>
    <div className = "navbarSPPH">
        <Link to="#" className='menu-bars' style={{justifyContent:"flex-start", position:"left", alignItems:"left"}}>
            <FaIcons.FaBars onClick = {showSideBar} />
        </Link>
    </div>
    <div>
    
    <nav className={sideBar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items' > 
            <li className='navbar-toggle'>
            </li>
            { sideBarData.map((item, index) => {
                return (
                    <li key={index} className={item.cName}>
                        <Link to={item.path} onClick={item.subNav && showSubnav}>
                            {item.icon}
                            <span>{item.title}</span>
                            <div>
                                {item.subNav && subnav
                                ? item.iconOpen
                                : item.subNav
                                ? item.iconClosed
                                : null
                            }
                            </div>
                        </Link>
                        {subnav && item.subNav?.map((item, index) => {
                        return (
                            <li>
                            <Link to={item.path} key={index} 
                            style={{textDecoration: 'none',
                            height: '40px',
                            paddingLeft: '3rem',
                            display: 'flex',
                            alignItems: 'center'}}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                            </li>
                        )
                    })}
                    </li>
                )
            })}
        </ul>
        <Button  style={{display: "flex", position:"absolute", bottom:"0px"}}>
          <Link to="/">GO TO HIVES</Link>
        </Button>
    </nav>
    </div>
    </IconContext.Provider>
    </>
  )
}

export default NavBar;