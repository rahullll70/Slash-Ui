import { jsx as _jsx } from "react/jsx-runtime";
export default function PreviewLayout({ children }) {
    return (_jsx("html", { children: _jsx("body", { children: children }) }));
}
