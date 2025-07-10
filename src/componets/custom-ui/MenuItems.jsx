'use client';

import Link from 'next/link';
import Icons from '../common/Icons';
const MenuItems = ({ icon, children, path, activeTab, setActiveTab, to }) => {

    return (
        <Link
            onClick={() => setActiveTab(to)}
            href={path}
            className={`
        w-full rounded-xl font-semibold text-nowrap text-sm duration-300 leading-100 flex items-center gap-3 py-3 px-4
        ${activeTab === to ? 'bg-purple text-white hover:opacity-85' : 'text-grey hover:bg-purple/10 hover:text-purple'}
      `}
        >
            <Icons className={`${activeTab === to ? "fill-white" : ""}`} icon={icon} />
            <span>{children}</span>
        </Link>
    );
};

export default MenuItems;
