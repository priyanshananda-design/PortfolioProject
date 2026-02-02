"use client";

import { useCallback, useMemo, useState } from "react";
import { site } from "../lib/site";

type Entry = {
  command: string;
  response: string;
};

export default function Terminal() {
  const commandMap = useMemo(() => site.terminal.commands, []);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Entry[]>([
    {
      command: "help",
      response: commandMap.help
    }
  ]);

  const runCommand = useCallback(
    (command: string) => {
      const trimmed = command.trim();
      if (!trimmed) return;
      const key = trimmed.toLowerCase();
      const response =
        commandMap[key as keyof typeof commandMap] ??
        "Command not found. Type 'help' to see available commands.";
      setHistory((prev) => [...prev, { command: trimmed, response }]);
    },
    [commandMap]
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    runCommand(input);
    setInput("");
  };

  const copyOutput = async () => {
    const text = history.map((entry) => `$ ${entry.command}\n${entry.response}`).join("\n\n");
    await navigator.clipboard.writeText(text);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-black/70 p-5 text-sm text-slate-200 shadow-glow">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">
          {site.ui.terminalTitle}
        </p>
        <button
          type="button"
          onClick={copyOutput}
          className="text-xs text-accent hover:text-accent-strong focus-ring"
          aria-label="Copy terminal output"
        >
          {site.ui.terminalCopyLabel}
        </button>
      </div>
      <div className="mt-4 space-y-4 font-mono">
        {history.map((entry, index) => (
          <div key={`${entry.command}-${index}`} className="space-y-1">
            <p className="text-accent">
              {site.terminal.prompt}:~$ <span className="text-white">{entry.command}</span>
            </p>
            <p className="text-muted">{entry.response}</p>
          </div>
        ))}
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <span className="text-accent">{site.terminal.prompt}:~$</span>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="flex-1 bg-transparent text-white outline-none"
            placeholder={site.ui.terminalPlaceholder}
            aria-label="Terminal command input"
          />
        </form>
      </div>
    </div>
  );
}
