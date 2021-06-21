import React from 'react';
import {
    Route,
    Redirect
} from "react-router-dom";
import { useContext } from 'react/cjs/react.development';
import { UserContext } from '../../App';


const PrivateRoute = ({ children, ...rest }) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                loggedInUser.displayName ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;