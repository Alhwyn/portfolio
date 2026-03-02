"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { usePathname } from "next/navigation";
import { ArrowUp, X, FolderOpen, Trophy, Trash2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { BicycleWheelIcon } from "./BicycleWheelIcon";
import MarkdownContent from "./MarkdownContent";
import { FileDown } from "lucide-react";

interface AISidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

type ReferenceItem = {
  type: "project" | "hackathon";
  slug: string;
  title: string;
  icon?: string;
};

export function AISidebar({ isOpen, onClose }: AISidebarProps) {
  const pathname = usePathname();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectedItemRef = useRef<HTMLButtonElement>(null);

  const [input, setInput] = useState("");
  const [referencedItems, setReferencedItems] = useState<ReferenceItem[]>([]);
  const [projects, setProjects] = useState<ReferenceItem[]>([]);
  const [hackathons, setHackathons] = useState<ReferenceItem[]>([]);
  const [showAtDropdown, setShowAtDropdown] = useState(false);
  const [atFilter, setAtFilter] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const referencedItemsRef = useRef<ReferenceItem[]>([]);
  referencedItemsRef.current = referencedItems;

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: () => ({
          pathname: pathname || "/",
          referencedItems: referencedItemsRef.current.map(({ type, slug }) => ({
            type,
            slug,
          })),
        }),
      }),
    [pathname]
  );

  const { messages, sendMessage, status, setMessages } = useChat({ transport });

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => {
        setProjects(data.projects || []);
        setHackathons(data.hackathons || []);
      })
      .catch(() => {
        setProjects([]);
        setHackathons([]);
      });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const isResumeQuery = (t: string) => /resume/i.test(t.trim());

  const showResumeInChat = async (userText: string) => {
    try {
      const res = await fetch("/api/resume");
      if (!res.ok) throw new Error("Resume not found");
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { id: `user-${Date.now()}`, role: "user" as const, parts: [{ type: "text" as const, text: userText }] },
        { id: `assistant-${Date.now()}`, role: "assistant" as const, parts: [{ type: "data-resume" as const, data: { content: data.content, files: data.files } }] },
      ]);
    } catch {
      sendMessage({ text: userText });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if ((!text && referencedItems.length === 0) || status !== "ready") return;
    if (referencedItems.length > 0) {
      sendMessage({
        parts: [
          { type: "text" as const, text },
          { type: "data-references" as const, data: referencedItems },
        ],
      });
    } else if (isResumeQuery(text)) {
      showResumeInChat(text);
    } else {
      sendMessage({ text });
    }
    setInput("");
    setReferencedItems([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    const atMatch = value.match(/@([\w-]*)$/);
    if (atMatch) {
      setShowAtDropdown(true);
      setAtFilter(atMatch[1].toLowerCase());
    } else {
      setShowAtDropdown(false);
    }
  };

  const handleSelectItem = (item: ReferenceItem) => {
    if (
      referencedItems.some((r) => r.type === item.type && r.slug === item.slug)
    )
      return;
    setReferencedItems((prev) => [...prev, item]);
    setInput((prev) => prev.replace(/@[\w-]*$/, "").trim());
    setShowAtDropdown(false);
    inputRef.current?.focus();
  };

  const removeReferencedItem = (type: "project" | "hackathon", slug: string) => {
    setReferencedItems((prev) =>
      prev.filter((r) => !(r.type === type && r.slug === slug))
    );
  };

  const filterItems = (items: ReferenceItem[]) =>
    atFilter
      ? items.filter(
          (p) =>
            p.slug.toLowerCase().includes(atFilter) ||
            p.title.toLowerCase().includes(atFilter)
        )
      : items;

  const filteredProjects = filterItems(projects);
  const filteredHackathons = filterItems(hackathons);

  const flatItems = useMemo(
    () => [...filteredProjects, ...filteredHackathons],
    [filteredProjects, filteredHackathons]
  );

  useEffect(() => {
    if (showAtDropdown) setSelectedIndex(0);
  }, [showAtDropdown, atFilter]);

  useEffect(() => {
    selectedItemRef.current?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showAtDropdown) {
      if (e.key === "Escape") return;
      return;
    }
    if (e.key === "Escape") {
      setShowAtDropdown(false);
      e.preventDefault();
      return;
    }
    if (e.key === "ArrowDown" && flatItems.length > 0) {
      e.preventDefault();
      setSelectedIndex((i) => (i + 1) % flatItems.length);
      return;
    }
    if (e.key === "ArrowUp" && flatItems.length > 0) {
      e.preventDefault();
      setSelectedIndex((i) => (i - 1 + flatItems.length) % flatItems.length);
      return;
    }
    if (e.key === "Enter" && flatItems.length > 0) {
      const item = flatItems[selectedIndex];
      if (item) {
        e.preventDefault();
        handleSelectItem(item);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/10 dark:bg-black/20 z-40 pointer-events-none"
            aria-hidden
          />

          <motion.aside
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-2 bottom-2 left-2 top-2 sm:left-auto w-full sm:w-[360px] h-[calc(100vh-1rem)] bg-white dark:bg-neutral-900 flex flex-col z-50 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-700/50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-200 dark:border-neutral-700/50">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">alhwyn.com</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setMessages([])}
                  aria-label="Clear chat"
                  title="Clear chat"
                  className="p-1.5 text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" strokeWidth={1} />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="p-1.5 text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded transition-colors"
                >
                  <X className="w-4 h-4" strokeWidth={1} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2 min-h-0">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "rounded-md p-2.5 text-sm",
                    message.role === "user"
                      ? "ml-4 bg-neutral-600 dark:bg-neutral-700 text-white"
                      : "bg-neutral-100 dark:bg-neutral-700/50 mr-4 text-neutral-800 dark:text-neutral-200"
                  )}
                >
                  <div className="flex flex-wrap items-center gap-1.5 whitespace-pre-wrap break-words">
                    {message.parts.map((part, i) => {
                      if (part.type === "text") {
                        return (
                          <span key={`${message.id}-${i}`}>{part.text}</span>
                        );
                      }
                      if (part.type === "data-references") {
                        const refs = (
                          part as { type: "data-references"; data: ReferenceItem[] }
                        ).data;
                        return (
                          <span
                            key={`${message.id}-${i}`}
                            className="contents"
                          >
                            {refs.map((item) => (
                              <span
                                key={`${item.type}-${item.slug}`}
                                className="inline-flex items-center gap-1.5 rounded-md bg-neutral-200 dark:bg-neutral-600/80 px-2 py-0.5 text-xs text-neutral-700 dark:text-neutral-200 shrink-0 max-w-[140px]"
                              >
                                {item.icon ? (
                                  <Image
                                    src={item.icon}
                                    alt=""
                                    width={14}
                                    height={14}
                                    className="rounded object-cover shrink-0"
                                  />
                                ) : (
                                  <FolderOpen className="w-3.5 h-3.5 shrink-0" />
                                )}
                                <span className="truncate">@{item.title}</span>
                              </span>
                            ))}
                          </span>
                        );
                      }
                      const toolPart = part as { type?: string; toolName?: string; result?: { content?: string; files?: Array<{ name: string; url: string }> } };
                      if (toolPart.type === "tool-invocation" && toolPart.toolName === "fetch_resume" && (toolPart.result?.content || toolPart.result?.files?.length)) {
                        const result = toolPart.result;
                        return (
                          <span key={`${message.id}-${i}`} className="contents">
                            {result.content && (
                              <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none text-neutral-800 dark:text-neutral-200">
                                <MarkdownContent content={result.content} />
                              </div>
                            )}
                            {result.files && result.files.length > 0 && (
                              <>
                                {result.files.map((file) => (
                                  <a
                                    key={file.url}
                                    href={file.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 rounded-md bg-neutral-200 dark:bg-neutral-600/80 px-2 py-0.5 text-xs text-neutral-700 dark:text-neutral-200 shrink-0"
                                  >
                                    <FileDown className="w-3.5 h-3.5" strokeWidth={1} />
                                    {file.name}
                                  </a>
                                ))}
                              </>
                            )}
                          </span>
                        );
                      }
                      const dataPart = part as { type?: string; data?: { content?: string; files?: Array<{ name: string; url: string }> } };
                      if (dataPart.type === "data-resume" && dataPart.data) {
                        const d = dataPart.data;
                        if (!d.content && !d.files?.length) return null;
                        return (
                          <span key={`${message.id}-${i}`} className="contents">
                            {d.content && (
                              <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none text-neutral-800 dark:text-neutral-200">
                                <MarkdownContent content={d.content} />
                              </div>
                            )}
                            {d.files && d.files.length > 0 && (
                              <>
                                {d.files.map((file) => (
                                  <a
                                    key={file.url}
                                    href={file.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 rounded-md bg-neutral-200 dark:bg-neutral-600/80 px-2 py-0.5 text-xs text-neutral-700 dark:text-neutral-200 shrink-0"
                                  >
                                    <FileDown className="w-3.5 h-3.5" strokeWidth={1} />
                                    {file.name}
                                  </a>
                                ))}
                              </>
                            )}
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              ))}
              {(status === "submitted" || status === "streaming") && (
                <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                  <BicycleWheelIcon className="w-5 h-5" spin />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3">
              <div className="relative flex flex-wrap items-center gap-2 rounded-lg bg-neutral-100 dark:bg-neutral-700/50 px-2.5 py-1.5 min-h-[42px]">
                {referencedItems.map((item) => (
                  <span
                    key={`${item.type}-${item.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-md bg-neutral-200 dark:bg-neutral-600/80 px-2 py-0.5 text-xs text-neutral-700 dark:text-neutral-200 shrink-0 max-w-[140px]"
                  >
                    {item.icon ? (
                      <Image
                        src={item.icon}
                        alt=""
                        width={14}
                        height={14}
                        className="rounded object-cover shrink-0"
                      />
                    ) : (
                      <FolderOpen className="w-3.5 h-3.5 shrink-0" />
                    )}
                    <span className="truncate">@{item.title}</span>
                    <button
                      type="button"
                      onClick={() =>
                        removeReferencedItem(item.type, item.slug)
                      }
                      aria-label={`Remove ${item.title}`}
                      className="hover:text-neutral-400 shrink-0"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about this page... Type @ to reference projects or hackathons"
                  disabled={status !== "ready"}
                  className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-500 text-sm"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || status !== "ready"}
                  aria-label="Send"
                  className="p-1.5 rounded-md bg-transparent hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0 text-black dark:text-white"
                >
                  <ArrowUp className="w-4 h-4" strokeWidth={1} />
                </button>
                {showAtDropdown && (
                  <div className="absolute bottom-full left-0 right-0 mb-1 max-h-36 overflow-y-auto rounded-md border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 shadow-lg">
                    {flatItems.length === 0 ? (
                      <div className="px-2 py-1.5 text-xs text-neutral-500">
                        No matches
                      </div>
                    ) : (
                      <>
                        {filteredProjects.length > 0 && (
                          <div className="border-b border-neutral-200 dark:border-neutral-700/80">
                            <div className="px-2 py-1 flex items-center gap-1.5 text-[10px] font-medium text-neutral-500 uppercase tracking-wide">
                              <FolderOpen className="w-3 h-3" />
                              Projects
                            </div>
                            {filteredProjects.map((item, i) => {
                              const idx = i;
                              const isSelected = idx === selectedIndex;
                              return (
                                <button
                                  key={`project-${item.slug}`}
                                  ref={isSelected ? selectedItemRef : undefined}
                                  type="button"
                                  onClick={() => handleSelectItem(item)}
                                  className={cn(
                                    "w-full px-2 py-1.5 flex items-center gap-2 text-left text-xs text-neutral-800 dark:text-neutral-200",
                                    isSelected
                                      ? "bg-neutral-200 dark:bg-neutral-600"
                                      : "hover:bg-neutral-100 dark:hover:bg-neutral-700/80"
                                  )}
                                >
                                  {item.icon ? (
                                    <Image
                                      src={item.icon}
                                      alt=""
                                      width={18}
                                      height={18}
                                      className="rounded object-cover shrink-0"
                                    />
                                  ) : (
                                    <FolderOpen className="w-4 h-4 text-neutral-500 shrink-0" />
                                  )}
                                  <span className="truncate">{item.title}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                        {filteredHackathons.length > 0 && (
                          <div>
                            <div className="px-2 py-1 flex items-center gap-1.5 text-[10px] font-medium text-neutral-500 uppercase tracking-wide">
                              <Trophy className="w-3 h-3" />
                              Hackathons
                            </div>
                            {filteredHackathons.map((item, i) => {
                              const idx = filteredProjects.length + i;
                              const isSelected = idx === selectedIndex;
                              return (
                                <button
                                  key={`hackathon-${item.slug}`}
                                  ref={isSelected ? selectedItemRef : undefined}
                                  type="button"
                                  onClick={() => handleSelectItem(item)}
                                  className={cn(
                                    "w-full px-2 py-1.5 flex items-center gap-2 text-left text-xs text-neutral-800 dark:text-neutral-200",
                                    isSelected
                                      ? "bg-neutral-200 dark:bg-neutral-600"
                                      : "hover:bg-neutral-100 dark:hover:bg-neutral-700/80"
                                  )}
                                >
                                  {item.icon ? (
                                    <Image
                                      src={item.icon}
                                      alt=""
                                      width={18}
                                      height={18}
                                      className="rounded object-cover shrink-0"
                                    />
                                  ) : (
                                    <Trophy className="w-4 h-4 text-neutral-500 shrink-0" />
                                  )}
                                  <span className="truncate">{item.title}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </form>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
