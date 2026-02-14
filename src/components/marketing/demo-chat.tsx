"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MarketingDictionary } from "@/i18n/types";

function getInsight(
  answers: Record<string, string>,
  dict: MarketingDictionary
): { title: string; body: string } {
  const role = answers.role;
  const goal = answers.goal;
  const challenge = answers.challenge;
  const platform = answers.platform;

  const roleLabel = dict.demo.roleLabels[role] || role;
  const goalLabel = dict.demo.goalLabels[goal] || goal;
  const challengeAdvice = dict.demo.challengeAdvice[challenge] || "";
  const platformAdvice = dict.demo.platformAdvice[platform] || "";

  const title = dict.demo.insightTitleTemplate
    .replace("{{role}}", roleLabel)
    .replace("{{goal}}", goalLabel);

  return {
    title,
    body: `${challengeAdvice}\n\n${platformAdvice}\n\n${dict.demo.insightSuffix}`,
  };
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
      <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]" />
      <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]" />
    </div>
  );
}

interface ChatMessage {
  type: "kun" | "user" | "typing" | "insight";
  text?: string;
  insight?: { title: string; body: string };
}

export function DemoChat({ dict }: { dict: MarketingDictionary }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showOptions, setShowOptions] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const questions = dict.demo.questions;

  // Auto-scroll to latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, showOptions]);

  // Start the conversation
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([
        { type: "kun", text: dict.demo.greeting },
      ]);
      setTimeout(() => {
        setMessages((prev) => [...prev, { type: "typing" }]);
        setTimeout(() => {
          setMessages((prev) => [
            ...prev.filter((m) => m.type !== "typing"),
            { type: "kun", text: questions[0].text },
          ]);
          setCurrentQuestion(0);
          setShowOptions(true);
        }, 1200);
      }, 800);
    }, 500);
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleAnswer(questionId: string, option: { label: string; value: string }) {
    setShowOptions(false);
    const newAnswers = { ...answers, [questionId]: option.value };
    setAnswers(newAnswers);

    // Add user's answer
    setMessages((prev) => [...prev, { type: "user", text: option.label }]);

    const nextIdx = currentQuestion + 1;

    if (nextIdx < questions.length) {
      // Show typing, then next question
      setTimeout(() => {
        setMessages((prev) => [...prev, { type: "typing" }]);
        setTimeout(() => {
          setMessages((prev) => [
            ...prev.filter((m) => m.type !== "typing"),
            { type: "kun", text: questions[nextIdx].text },
          ]);
          setCurrentQuestion(nextIdx);
          setShowOptions(true);
        }, 1000);
      }, 500);
    } else {
      // All questions answered — analyze
      setAnalyzing(true);
      setTimeout(() => {
        setMessages((prev) => [...prev, { type: "typing" }]);
        setTimeout(() => {
          setMessages((prev) => [
            ...prev.filter((m) => m.type !== "typing"),
            { type: "kun", text: dict.demo.analyzing },
          ]);
          setTimeout(() => {
            const insight = getInsight(newAnswers, dict);
            setMessages((prev) => [...prev, { type: "insight", insight }]);
            setAnalyzing(false);
          }, 1500);
        }, 1000);
      }, 500);
    }
  }

  function handleStartOver() {
    setMessages([]);
    setCurrentQuestion(-1);
    setAnswers({});
    setShowOptions(false);
    setAnalyzing(false);

    setTimeout(() => {
      setMessages([{ type: "kun", text: dict.demo.greeting }]);
      setTimeout(() => {
        setMessages((prev) => [...prev, { type: "typing" }]);
        setTimeout(() => {
          setMessages((prev) => [
            ...prev.filter((m) => m.type !== "typing"),
            { type: "kun", text: questions[0].text },
          ]);
          setCurrentQuestion(0);
          setShowOptions(true);
        }, 1200);
      }, 800);
    }, 300);
  }

  const question = currentQuestion >= 0 ? questions[currentQuestion] : null;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative">
        {/* Start Over — always visible top-end corner */}
        {currentQuestion >= 0 && (
          <button
            onClick={handleStartOver}
            className="absolute top-3 end-3 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#252525] border border-gray-700 text-gray-400 hover:border-[#D4A843]/40 hover:text-[#D4A843] text-xs font-medium transition-all"
          >
            <RotateCcw className="w-3 h-3" />
            {dict.demo.startOver}
          </button>
        )}
      <div
        ref={scrollRef}
        className="bg-[#1A1A1A] rounded-2xl border border-[#D4A843]/20 p-6 pt-12 h-[480px] overflow-y-auto flex flex-col gap-4"
      >
        {messages.map((msg, idx) => {
          if (msg.type === "typing") {
            return (
              <div key={idx} className="self-start">
                <div className="bg-[#252525] rounded-2xl rounded-bl-sm">
                  <TypingIndicator />
                </div>
              </div>
            );
          }

          if (msg.type === "kun") {
            return (
              <div key={idx} className="self-start max-w-[80%]">
                <div className="bg-[#252525] text-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 text-sm">
                  {msg.text}
                </div>
              </div>
            );
          }

          if (msg.type === "user") {
            return (
              <div key={idx} className="self-end max-w-[80%]">
                <div className="bg-[#D4A843] text-[#0D0D0D] rounded-2xl rounded-br-sm px-4 py-3 text-sm font-medium">
                  {msg.text}
                </div>
              </div>
            );
          }

          if (msg.type === "insight" && msg.insight) {
            return (
              <div key={idx} className="self-start max-w-[90%]">
                <div className="bg-gradient-to-br from-[#D4A843]/10 to-[#1A1A1A] border border-[#D4A843]/30 rounded-2xl px-5 py-5">
                  <h4 className="text-[#D4A843] font-bold text-base mb-3">
                    {msg.insight.title}
                  </h4>
                  {msg.insight.body.split("\n\n").map((paragraph, pIdx) => (
                    <p key={pIdx} className="text-gray-300 text-sm mb-3 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                  <a
                    href="#waitlist"
                    className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-[#D4A843] hover:bg-[#E5B955] text-[#0D0D0D] font-semibold rounded-lg transition-colors text-sm"
                  >
                    {dict.demo.insightCta}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          }

          return null;
        })}

        {/* Answer options */}
        {showOptions && question && !analyzing && (
          <div className="flex flex-wrap gap-2 mt-1">
            {question.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(question.id, option)}
                className={cn(
                  "px-4 py-2 rounded-full border text-sm font-medium transition-all",
                  "border-[#D4A843]/40 text-[#D4A843] hover:bg-[#D4A843] hover:text-[#0D0D0D]"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}

      </div>
      </div>
    </div>
  );
}
