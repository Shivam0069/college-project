'use client';

import Link from 'next/link';
import { useState } from 'react';

export const Sidebar = ({ items = [], isOpen = true, onToggle = () => {} }) => {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpanded = (itemLabel) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemLabel]: !prev[itemLabel],
    }));
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={onToggle}
        className="md:hidden fixed top-20 left-4 p-2 bg-blue-600 text-white rounded-lg z-40"
      >
        Menu
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-gray-900 text-white transition-transform duration-300 z-30 pt-20 md:pt-0 md:relative md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64`}
      >
        <div className="p-4 h-full overflow-y-auto">
          <nav className="space-y-2">
            {items.map((item, index) => (
              <div key={index}>
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleExpanded(item.label)}
                      className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2">
                        {item.icon && <span className="text-lg">{item.icon}</span>}
                        {item.label}
                      </span>
                      <span className={`transition-transform ${expandedItems[item.label] ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                    </button>
                    {expandedItems[item.label] && (
                      <div className="ml-4 space-y-1">
                        {item.subItems.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm rounded-lg hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
                  >
                    {item.icon && <span className="text-lg">{item.icon}</span>}
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};
