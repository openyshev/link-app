import React from 'react';
import * as _ from 'lodash';

import {
    MAX_FETCH_COUNT,
    FETCHING_TIME,
    WAITING_FOR,
    BASE_URL
} from './consts';

const getLink = (link) => {
    LinksContextState.links.push(link);

    const promise = new Promise((resolve, reject) => {
        LinksContextState.promises[link.id] = [resolve, reject];
    });

    if (LinksContextState.links.length > MAX_FETCH_COUNT) {
        fetchLinks();
    } else {
        console.log('...')
        debounceFetchLinks();
    }

    return promise;
};

const fetchLinks = () => {
    const linksForFetching = LinksContextState.links.slice(0, LinksContextState.links.length);
    const fetchingCount = linksForFetching.length;

    LinksContextState.links = [];

    console.info(`START FETCHING (${fetchingCount})..`, JSON.stringify(linksForFetching));

    // Вместо fetch'a
    setTimeout(() => {
        LinksContextState.handleCount += fetchingCount;

        linksForFetching.forEach(link => {
            const [resolve, reject] = LinksContextState.promises[link.id];
            resolve(BASE_URL + link.params.rgid);
        });

        console.info('SUCCESS FETCHING..', JSON.stringify(linksForFetching));
    }, FETCHING_TIME);
};

const debounceFetchLinks = _.debounce(fetchLinks, WAITING_FOR);

export const LinksContext = React.createContext();
export const LinksContextState = {
    links: [],
    promises: {},
    handleCount: 0,
    getLink
};