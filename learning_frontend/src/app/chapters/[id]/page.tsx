"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/Sidebar";
import { getChapter, updateProgress, getChapters } from "@/lib/api";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  BookOpen,
  CircleHelp,
  ArrowRight,
  Trophy,
} from "lucide-react";
import toast from "react-hot-toast";

export default function ChapterPage() {
  const { id } = useParams<{ id: string }>();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [chapter, setChapter] = useState<any>(null);
  const [allCh, setAllCh] = useState<any[]>([]);
  const [quizIdx, setQuizIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!id) return;

    getChapter(id)
      .then((r) => setChapter(r.data.data))
      .catch(() => toast.error("Chapter not found"));

    getChapters()
      .then((r) => setAllCh(r.data.data))
      .catch(() => {});
  }, [id]);

  const markComplete = async () => {
    try {
      await updateProgress({
        chapterId: id,
        completed: true,
        quizScore: score,
      });

      toast.success("Marked as complete!");
    } catch {
      toast.error("Login required to save progress");
    }
  };

  const checkQuiz = () => {
    if (selected === null || !chapter?.quiz?.[quizIdx]) return;

    setShowAnswer(true);

    if (selected === chapter.quiz[quizIdx].correctIndex) {
      setScore((s) => s + 1);
    }
  };

  if (authLoading || !user) return null;

  if (!chapter) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />

        <div className="flex flex-1 items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-primary-600" />
        </div>
      </div>
    );
  }

  const num =
    chapter.number || parseInt(String(id).replace("ch", ""), 10);

  const prev = allCh.find((c) => c.number === num - 1);
  const next = allCh.find((c) => c.number === num + 1);

  const quiz = chapter.quiz?.[quizIdx];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-5xl p-5 md:p-6 lg:p-8">
          {/* Top Navigation */}
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/dashboard"
              className="inline-flex w-fit items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-slate-500 transition hover:bg-white hover:text-primary-600"
            >
              <ChevronLeft className="h-4 w-4" />
              Dashboard
            </Link>

            <button
              onClick={markComplete}
              className="btn-primary flex w-fit items-center gap-2 text-sm shadow-sm"
            >
              <CheckCircle className="h-4 w-4" />
              Mark Complete
            </button>
          </div>

          {/* Chapter Header */}
          <div className="relative mb-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary-100/60 blur-3xl" />

            <div className="relative p-6 md:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 ring-1 ring-primary-100">
                  <BookOpen className="h-6 w-6" />
                </div>

                <div className="min-w-0">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
                    Chapter {chapter.number}
                  </p>

                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                    {chapter.title}
                  </h1>

                  <p className="mt-2 text-sm text-slate-500">
                    Study the concepts below and test your understanding
                    with the quick quiz.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-4">
            {(chapter.sections || []).map((s: any, i: number) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md md:p-6"
              >
                <div className="mb-4 flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-xs font-bold text-primary-600">
                    {i + 1}
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-primary-600">
                      Section {i + 1}
                    </p>

                    <h2 className="mt-0.5 text-lg font-semibold text-slate-900">
                      {s.title}
                    </h2>
                  </div>
                </div>

                <div className="prose-content text-sm leading-7 text-slate-600">
                  {s.content}
                </div>

                {s.examples?.length > 0 && (
                  <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                    <div className="border-b border-slate-200 px-4 py-2.5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Examples
                      </p>
                    </div>

                    <div className="p-4">
                      {s.examples.map((ex: string, j: number) => (
                        <pre
                          key={j}
                          className="mb-2 whitespace-pre-wrap font-mono text-xs leading-6 text-slate-700 last:mb-0"
                        >
                          {ex}
                        </pre>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quiz */}
          {chapter.quiz?.length > 0 && quiz && (
            <div className="mt-7 overflow-hidden rounded-2xl border border-primary-200 bg-white shadow-sm">
              {/* Quiz Header */}
              <div className="border-b border-primary-100 bg-primary-50/60 px-5 py-4 md:px-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                      <CircleHelp className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-primary-600">
                        Test Your Knowledge
                      </p>

                      <h2 className="font-semibold text-slate-900">
                        Quick Quiz
                      </h2>
                    </div>
                  </div>

                  <span className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 shadow-sm ring-1 ring-primary-100">
                    {quizIdx + 1} / {chapter.quiz.length}
                  </span>
                </div>
              </div>

              {/* Quiz Body */}
              <div className="p-5 md:p-6">
                <p className="mb-5 text-base font-semibold leading-6 text-slate-900">
                  {quiz.question}
                </p>

                <div className="space-y-2.5">
                  {quiz.options.map((opt: string, i: number) => {
                    const isSelected = selected === i;
                    const isCorrect = i === quiz.correctIndex;

                    let optionClass =
                      "border-slate-200 bg-white hover:border-primary-200 hover:bg-primary-50/40";

                    if (!showAnswer && isSelected) {
                      optionClass =
                        "border-primary-500 bg-primary-50 text-primary-700 ring-1 ring-primary-500/20";
                    }

                    if (showAnswer && isCorrect) {
                      optionClass =
                        "border-emerald-300 bg-emerald-50 text-emerald-700";
                    }

                    if (
                      showAnswer &&
                      isSelected &&
                      !isCorrect
                    ) {
                      optionClass =
                        "border-red-300 bg-red-50 text-red-700";
                    }

                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() =>
                          !showAnswer && setSelected(i)
                        }
                        className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${optionClass}`}
                      >
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-semibold ${
                            isSelected
                              ? "bg-primary-600 text-white"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {String.fromCharCode(65 + i)}
                        </span>

                        <span className="flex-1">{opt}</span>

                        {showAnswer && isCorrect && (
                          <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Check Answer */}
                {!showAnswer ? (
                  <button
                    onClick={checkQuiz}
                    className="btn-primary mt-5 inline-flex items-center gap-2"
                    disabled={selected === null}
                  >
                    Check Answer
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                          selected === quiz.correctIndex
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {selected === quiz.correctIndex ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <CircleHelp className="h-5 w-5" />
                        )}
                      </div>

                      <div>
                        <p
                          className={`text-sm font-semibold ${
                            selected === quiz.correctIndex
                              ? "text-emerald-600"
                              : "text-red-600"
                          }`}
                        >
                          {selected === quiz.correctIndex
                            ? "Correct!"
                            : "Incorrect"}
                        </p>

                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          {quiz.explanation}
                        </p>
                      </div>
                    </div>

                    {quizIdx < chapter.quiz.length - 1 ? (
                      <button
                        className="btn-secondary mt-4 inline-flex items-center gap-2"
                        onClick={() => {
                          setQuizIdx(quizIdx + 1);
                          setSelected(null);
                          setShowAnswer(false);
                        }}
                      >
                        Next Question
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <div className="mt-4 flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200">
                        <Trophy className="h-4 w-4 text-amber-500" />
                        Score: {score}/{chapter.quiz.length}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Chapter Navigation */}
          <div className="mt-8 flex items-center justify-between gap-3 border-t border-slate-200 pt-6">
            {prev ? (
              <Link
                href={`/chapters/${prev.chapterId}`}
                className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition hover:border-primary-200 hover:text-primary-600"
              >
                <ChevronLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />

                <span>
                  <span className="hidden text-[10px] uppercase tracking-wider text-slate-400 sm:block">
                    Previous
                  </span>
                  Ch {prev.number}
                </span>
              </Link>
            ) : (
              <span />
            )}

            {next ? (
              <Link
                href={`/chapters/${next.chapterId}`}
                className="btn-primary inline-flex items-center gap-2 text-sm shadow-sm"
              >
                <span>
                  <span className="hidden text-[10px] uppercase tracking-wider text-white/70 sm:block">
                    Next
                  </span>
                  Ch {next.number}
                </span>

                <ChevronRight className="h-4 w-4" />
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}