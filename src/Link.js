import React, { useContext, useState } from 'react';
import * as _ from 'lodash';

import { BASE_URL } from './consts';
import {LinksContext} from './LinksContext';

const Link = (props) => {
    const linksContext = useContext(LinksContext);
    const [url, setUrl] = useState(BASE_URL);

    const isURLChanged = url !== BASE_URL;

    React.useEffect(() => {
        if (!isURLChanged) {
            const id = _.uniqueId();
            const promise = linksContext.getLink({ id, params: props.params });
    
            promise.then((res) => {
                setUrl(res);
            });
        }
    }, [url]);

    return (
        <a href={url}>LINK FOR {props.text}{isURLChanged && ' <<< NEW!!!'}</a>
    );
};

export default Link;
