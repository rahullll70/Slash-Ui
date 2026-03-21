import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Navbar from '@/components/ui/navbar';
import Hero from '@/components/ui/hero';
import Footer from '@/components/ui/footer';
import FeaturedComponents from '@/components/ui/featuredComponents';
import Pricing from '@/components/ui/pricing';
import IndustryProof from '@/components/ui/IndustryProof';
const page = () => {
    return (_jsxs("div", { children: [_jsx(Navbar, {}), _jsx(Hero, {}), _jsx(FeaturedComponents, {}), _jsx(IndustryProof, {}), _jsx(Pricing, {}), _jsx(Footer, {})] }));
};
export default page;
