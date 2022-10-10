import React from "react";
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as HiIcons from 'react-icons/hi'
import * as MdIcons from 'react-icons/md'

export const sideBarData = [
    // {
    //     title: 'Home',
    //     path: "/spph",
    //     icon: <AiIcons.AiFillHome />,
    //     cName: 'nav-text'
    // },
    {
        title: 'Send Email',
        path: "/spph/send",
        icon: <IoIcons.IoMdSend />,
        cName: 'nav-text'
    },
    {
        title: 'Schedule Email',
        path: "/spph/schedule",
        icon: <MdIcons.MdScheduleSend />,
        cName: 'nav-text'
    },
    {
        title: 'Email Template',
        path: "/spph/template/edit",
        icon: <HiIcons.HiTemplate />,
        iconClosed: <IoIcons.IoMdArrowDropdown/>,
        iconOpen: <IoIcons.IoMdArrowDropup />,
        cName: 'nav-text',
        subNav: [
            {
                title: 'Edit',
                path: "/spph/template/edit",
                icon: <AiIcons.AiFillEdit />,
                cName: 'nav-text'
            },
            {
                title: 'New',
                path: "/spph/template/new",
                icon: <MdIcons.MdNoteAdd />,
                cName: 'nav-text'
            },
            {
                title: 'Delete',
                path: "/spph/template/delete",
                icon: <MdIcons.MdDelete />,
                cName: 'nav-text'
            },
        ]
    },
    {
        title: 'Subscriber settings',
        path: "/spph/settings",
        icon: <IoIcons.IoIosSettings />,
        cName: 'nav-text'
    },
]