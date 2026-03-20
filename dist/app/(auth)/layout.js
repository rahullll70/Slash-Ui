import { jsx as _jsx } from "react/jsx-runtime";
const layout = async ({ children }) => {
    const isUserAuthenticated = false; // remove later
    // const isUserAuthenticated = await isAuthenticated(); 
    // if (!isUserAuthenticated) redirect('/sign-in');
    return (_jsx("div", { className: 'auth-layout', children: children }));
};
export default layout;
