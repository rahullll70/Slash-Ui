import React from 'react';

interface DocShellProps {
  title: string;
  description: string;
  dependencies?: string[];
  interaction?: { type: string; description: string }[];
  usage: React.ReactNode;
  propsData?: { prop: string; type: string; desc: string }[];
  keepInMind?: string;
  children?: React.ReactNode;
}

export const DocShell = ({ 
  title, description, dependencies = [], interaction = [], usage, propsData = [], keepInMind, children 
}: DocShellProps) => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-16 text-zinc-100">
      {/* Header */}
      <header className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-white">{title}</h1>
        <p className="text-zinc-400 text-lg">{description}</p>
      </header>

      {/* Dependencies */}
      {dependencies.length > 0 && (
        <section>
          <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-3">Dependencies</h3>
          <div className="flex gap-2">
            {dependencies.map(dep => (
              <span key={dep} className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-xs font-mono text-zinc-300">
                {dep}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Interaction Type */}
      {interaction.length > 0 && (
        <section className="border-t border-zinc-800 pt-8">
          <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-4">Interaction Type</h3>
          <div className="space-y-4">
            {interaction.map((item, i) => (
              <div key={i} className="flex gap-4">
                <span className="text-zinc-300">{item.type}</span>
                <span className="text-zinc-500">—</span>
                <span className="text-zinc-400">{item.description}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* How to Use */}
      <section className="border-t border-zinc-800 pt-8">
        <h3 className="text-lg font-medium text-white mb-4">How to Use</h3>
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6 overflow-x-auto">
          {usage}
        </div>
      </section>

      {/* Props Table */}
      {propsData.length > 0 && (
        <section className="border-t border-zinc-800 pt-8">
          <h3 className="text-lg font-medium text-white mb-4">Props</h3>
          <div className="w-full border border-zinc-800 rounded-lg overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-900 text-zinc-400">
                <tr>
                  <th className="p-3">Prop</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {propsData.map((p, i) => (
                  <tr key={i}>
                    <td className="p-3 font-mono text-amber-400">{p.prop}</td>
                    <td className="p-3 font-mono text-zinc-400">{p.type}</td>
                    <td className="p-3 text-zinc-300">{p.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Keep in Mind */}
      {keepInMind && (
        <section className="border-t border-zinc-800 pt-8">
          <h3 className="text-lg font-medium text-white mb-4">Keep in Mind</h3>
          <p className="text-zinc-400 leading-relaxed bg-zinc-900/30 p-4 rounded-md border border-zinc-800">
            {keepInMind}
          </p>
        </section>
      )}

      {children}
    </div>
  );
};