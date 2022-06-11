import React from 'react'
import { Redirect, Route } from 'react-router-dom';

export default function RouteWrapper({
    component: Component,
    isPrivate,
    superUser,
    ...rest
}) {

    const { superSigned, signed } = true;
    const loading = null;

    if (loading) {
        return (
            <div></div>
        )
    }

    if ((!signed && isPrivate) || (!superSigned && superSigned)) {
        return <Redirect to='/' />
    }

    return (
        <Route
            {...rest}
            render={props => (
                <Component {...props} />
            )}
        />
    )
}
