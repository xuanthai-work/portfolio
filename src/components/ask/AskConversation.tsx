"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { AskAttachment } from "@/components/ask/AskAttachment";
import { Button } from "@/components/ui/Button";
import {
  matchPrompt,
  type AskAttachmentView,
  type AskPromptView,
} from "@/lib/ask";
import { cn } from "@/lib/utils";
import type { AskContent } from "@/types";

interface AskConversationProps {
  className?: string;
  content: AskContent;
  prompts: AskPromptView[];
}

type Entry =
  | { id: number; from: "visitor"; text: string }
  | {
      id: number;
      from: "assistant";
      text: string;
      attachment: AskAttachmentView;
    };

function AssistantAvatar() {
  return (
    <div
      aria-hidden="true"
      className="font-heading flex size-9 shrink-0 items-center justify-center rounded-lg bg-[var(--ink)] text-xl text-[var(--paper)]"
    >
      T
    </div>
  );
}

export function AskConversation({
  className,
  content,
  prompts,
}: AskConversationProps) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [asked, setAsked] = useState<string[]>([]);
  const [draft, setDraft] = useState("");

  const nextId = useRef(1);
  const latestVisitorRef = useRef<HTMLDivElement | null>(null);
  const shouldScrollRef = useRef(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldScrollRef.current && latestVisitorRef.current) {
      latestVisitorRef.current.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
      shouldScrollRef.current = false;
    }
  }, [entries, reduceMotion]);

  function handleSelectPrompt(prompt: AskPromptView) {
    const visitorId = nextId.current++;
    const assistantId = nextId.current++;
    shouldScrollRef.current = true;

    setEntries((prev) => [
      ...prev,
      { id: visitorId, from: "visitor", text: prompt.question },
      {
        id: assistantId,
        from: "assistant",
        text: prompt.answer,
        attachment: prompt.attachment,
      },
    ]);
    setAsked((prev) =>
      prev.includes(prompt.id) ? prev : [...prev, prompt.id],
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;

    const match = matchPrompt(text, prompts);
    const visitorId = nextId.current++;
    const assistantId = nextId.current++;
    shouldScrollRef.current = true;

    if (match) {
      setEntries((prev) => [
        ...prev,
        { id: visitorId, from: "visitor", text },
        {
          id: assistantId,
          from: "assistant",
          text: match.answer,
          attachment: match.attachment,
        },
      ]);
      setAsked((prev) =>
        prev.includes(match.id) ? prev : [...prev, match.id],
      );
    } else {
      setEntries((prev) => [
        ...prev,
        { id: visitorId, from: "visitor", text },
        {
          id: assistantId,
          from: "assistant",
          text: content.fallbackAnswer,
          attachment: { kind: "none" },
        },
      ]);
    }
    setDraft("");
  }

  function handleStartOver() {
    shouldScrollRef.current = false;
    setEntries([]);
    setAsked([]);
    setDraft("");
  }

  const availablePrompts = prompts.filter((p) => !asked.includes(p.id));
  const latestVisitorId = entries
    .filter((e) => e.from === "visitor")
    .at(-1)?.id;

  return (
    <div
      className={cn(
        "flex min-h-[calc(100dvh-9rem)] max-w-[760px] flex-col",
        className,
      )}
    >
      <div className="flex gap-4">
        <AssistantAvatar />
        <div>
          <h1 className="font-heading text-[2.75rem] leading-[1.05] tracking-[-0.02em] text-balance sm:text-6xl">
            {content.heading}
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-8 text-[var(--muted-foreground)]">
            {content.subheading}
          </p>
        </div>
      </div>

      <div
        aria-label="Conversation"
        aria-live="polite"
        className="mt-10 flex flex-col gap-8"
        role="log"
      >
        {entries.map((entry) => {
          if (entry.from === "visitor") {
            const isLatest = entry.id === latestVisitorId;
            return (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="max-w-[85%] scroll-mt-24 self-end rounded-2xl rounded-br-md bg-[var(--ink)] px-4 py-2.5 text-[var(--paper)]"
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                key={entry.id}
                ref={isLatest ? latestVisitorRef : undefined}
                transition={{ duration: 0.25 }}
              >
                <p className="text-[15px] leading-6">{entry.text}</p>
              </motion.div>
            );
          }

          return (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="flex scroll-mt-24 gap-4"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              key={entry.id}
              transition={{ duration: 0.25 }}
            >
              <AssistantAvatar />
              <div className="flex min-w-0 flex-1 flex-col gap-4">
                <p className="pt-1.5 text-[17px] leading-7">{entry.text}</p>
                <AskAttachment attachment={entry.attachment} />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="sticky bottom-0 mt-auto flex flex-col gap-3 bg-[var(--background)] pt-6 pb-4">
        <div className="flex flex-wrap gap-2">
          {availablePrompts.map((prompt) => (
            <button
              className="min-h-11 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-4 text-left text-sm transition hover:border-[var(--ink)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none"
              key={prompt.id}
              onClick={() => handleSelectPrompt(prompt)}
              type="button"
            >
              {prompt.question}
            </button>
          ))}
          {entries.length > 0 ? (
            <Button
              className="min-h-11 rounded-full text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              onClick={handleStartOver}
              size="sm"
              type="button"
              variant="ghost"
            >
              Start over
            </Button>
          ) : null}
        </div>

        <form
          className="flex items-center gap-2 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-1.5 pl-4 focus-within:ring-2 focus-within:ring-[var(--accent)]"
          onSubmit={handleSubmit}
        >
          <label className="sr-only" htmlFor="ask-input">
            Ask a question
          </label>
          <input
            autoComplete="off"
            className="min-h-11 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-[var(--muted-foreground)]"
            id="ask-input"
            onChange={(e) => setDraft(e.target.value)}
            placeholder={content.inputPlaceholder}
            type="text"
            value={draft}
          />
          <Button type="submit">Ask</Button>
        </form>
      </div>
    </div>
  );
}
