import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useAuthStatus = () => {

    const { user } = useSelector(state => state.auth);

    const [checkUser, setCheckUser] = useState(true);

    const [loggedIn, setLoggedIn] = useState(false);

    const [verified, setVerified] = useState(false);

    useEffect(() => {

        if (user) {

            setLoggedIn(true);

            // check verification
            setVerified(user.isVerified);

        } else {

            setLoggedIn(false);

            setVerified(false);
        }

        setCheckUser(false);

    }, [user]);

    return {
        checkUser,
        loggedIn,
        verified
    };
};

export default useAuthStatus;