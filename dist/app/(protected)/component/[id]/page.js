import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Index } from '@/__registry__';
import ShowcaseContainer from '@/components/ui/ShowcaseContainer';
import ComponentRenderer from './ComponentRenderer';
export default async function Page({ params, }) {
    const { id } = await params;
    const activeItem = Index['default'][id];
    if (!activeItem) {
        return _jsxs("div", { children: ["Component \"", id, "\" not found in __registry__/index.ts"] });
    }
    return (_jsx(ShowcaseContainer, { title: (activeItem === null || activeItem === void 0 ? void 0 : activeItem.name) || id, code: activeItem === null || activeItem === void 0 ? void 0 : activeItem.content, description: activeItem === null || activeItem === void 0 ? void 0 : activeItem.description, install: activeItem === null || activeItem === void 0 ? void 0 : activeItem.install, dependencies: activeItem === null || activeItem === void 0 ? void 0 : activeItem.dependencies, interactionType: activeItem === null || activeItem === void 0 ? void 0 : activeItem.interactionType, howToUse: activeItem === null || activeItem === void 0 ? void 0 : activeItem.howToUse, children: activeItem ? (_jsx(ComponentRenderer, { id: id })) : (_jsxs("div", { className: 'flex flex-col items-center justify-center h-64 border border-dashed border-zinc-800 rounded-xl bg-zinc-950/50', children: [_jsxs("p", { className: 'text-zinc-500 font-mono text-xs uppercase tracking-widest', children: ["Component \"", id, "\" not found"] }), _jsx("span", { className: 'text-[10px] text-zinc-700 mt-2', children: "Check registry/index.ts and run build-registry.ts" })] })) }));
}
