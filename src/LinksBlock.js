import React, { useEffect, useState } from "react";

import {
    LINKS_BY_STEP,
    LINKS_COUNT,
    BASE_URL
} from './consts';
import Link from './Link';

// Иммитация динамического рендера ссылок
const addLinks = (links, setLinks) => {
    if (links.length >= LINKS_COUNT) {
        return;
    }

    const RENDER_TIMING = 5 * Math.random();

    setTimeout(() => {
        console.log(`RENDER NEW (${LINKS_BY_STEP}):::${RENDER_TIMING}`);
        
        const newLinks = new Array(LINKS_BY_STEP).fill(1).map((url, indx) => {
            return {
                id: links.length + 1 + indx,
                params: { rgid: links.length + 1 + indx }
            };
        });

        setLinks(links.concat(newLinks));
    }, RENDER_TIMING);
};

export const LinksBlock = () => {
    const [links, setLinks] = useState([]);

    useEffect(() => {
        addLinks(links, setLinks);
    });
    
    return (
        <div className='links-block'>
            {
                links.map((link, indx) => <Link key={link.id} baseUrl={BASE_URL} params={link.params} text={indx}/>)
            }
        </div>
    );
};