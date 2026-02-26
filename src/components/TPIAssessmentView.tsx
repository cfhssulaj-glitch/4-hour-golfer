import { useState } from "react";
import { Plus, Trash2, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAssessments } from "@/hooks/useAssessments";
import type { TPIAssessment, TPIField } from "@/types/assessment";
import { cn } from "@/lib/utils";

const EMPTY_ASSESSMENT: Omit<TPIAssessment, "id" | "date"> = {
  verticalJump: null,
  seatedTrunkRotationL: null,
  seatedTrunkRotationR: null,
  singleLegBalanceL: null,
  singleLegBalanceR: null,
  toeTouch: null,
  deepSquat: null,
  hipInternalRotationL: null,
  hipInternalRotationR: null,
  hipExternalRotationL: null,
  hipExternalRotationR: null,
  thoracicRotationL: null,
  thoracicRotationR: null,
};

const FIELD_LABELS: Record<TPIField, string> = {
  verticalJump: "Vertical Jump (in)",
  seatedTrunkRotationL: "Seated Trunk Rotation L (deg)",
  seatedTrunkRotationR: "Seated Trunk Rotation R (deg)",
  singleLegBalanceL: "Single Leg Balance L (sec)",
  singleLegBalanceR: "Single Leg Balance R (sec)",
  toeTouch: "Toe Touch",
  deepSquat: "Deep Squat (1-3)",
  hipInternalRotationL: "Hip Internal Rotation L (deg)",
  hipInternalRotationR: "Hip Internal Rotation R (deg)",
  hipExternalRotationL: "Hip External Rotation L (deg)",
  hipExternalRotationR: "Hip External Rotation R (deg)",
  thoracicRotationL: "Thoracic Rotation L (deg)",
  thoracicRotationR: "Thoracic Rotation R (deg)",
};

function TrendIcon({ current, previous }: { current: number | string | null; previous: number | string | null }) {
  if (current === null || previous === null) return null;
  if (typeof current === "string" || typeof previous === "string") {
    if (current === previous) return <Minus className="h-3 w-3 text-slate-400" />;
    if (current === "pass" && previous === "fail") return <TrendingUp className="h-3 w-3 text-emerald-400" />;
    return <TrendingDown className="h-3 w-3 text-red-400" />;
  }
  if (current > previous) return <TrendingUp className="h-3 w-3 text-emerald-400" />;
  if (current < previous) return <TrendingDown className="h-3 w-3 text-red-400" />;
  return <Minus className="h-3 w-3 text-slate-400" />;
}

export function TPIAssessmentView() {
  const { assessments, addAssessment, deleteAssessment } = useAssessments();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Omit<TPIAssessment, "id" | "date">>({ ...EMPTY_ASSESSMENT });

  const handleSubmit = () => {
    addAssessment({
      ...form,
      id: `assessment-${Date.now()}`,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    });
    setForm({ ...EMPTY_ASSESSMENT });
    setShowForm(false);
  };

  const updateNumericField = (field: TPIField, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value === "" ? null : Number(value),
    }));
  };

  const numericFields: TPIField[] = [
    "verticalJump",
    "seatedTrunkRotationL",
    "seatedTrunkRotationR",
    "singleLegBalanceL",
    "singleLegBalanceR",
    "hipInternalRotationL",
    "hipInternalRotationR",
    "hipExternalRotationL",
    "hipExternalRotationR",
    "thoracicRotationL",
    "thoracicRotationR",
  ];

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">TPI Assessment</h2>
          <p className="text-sm text-slate-400">Track your physical benchmarks</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowForm(!showForm)}
          className="text-teal-400 hover:text-teal-300"
        >
          <Plus className="h-4 w-4 mr-1" />
          New
        </Button>
      </div>

      {showForm && (
        <div className="bg-slate-800 rounded-xl border border-teal-500/30 p-4 mb-6">
          <h3 className="text-sm font-medium text-teal-300 mb-4">New Assessment</h3>

          <div className="space-y-3">
            {numericFields.map((field) => (
              <div key={field} className="flex items-center justify-between gap-4">
                <label className="text-xs text-slate-300 flex-1">{FIELD_LABELS[field]}</label>
                <input
                  type="number"
                  value={form[field] ?? ""}
                  onChange={(e) => updateNumericField(field, e.target.value)}
                  className="w-20 bg-slate-700 border border-slate-600 rounded-lg px-2 py-1 text-sm text-white text-right focus:outline-none focus:border-teal-500"
                  placeholder="—"
                />
              </div>
            ))}

            <div className="flex items-center justify-between gap-4">
              <label className="text-xs text-slate-300 flex-1">Toe Touch</label>
              <div className="flex gap-2">
                {(["pass", "fail"] as const).map((val) => (
                  <button
                    key={val}
                    onClick={() => setForm((prev) => ({ ...prev, toeTouch: prev.toeTouch === val ? null : val }))}
                    className={cn(
                      "px-3 py-1 rounded-lg text-xs font-medium transition-colors",
                      form.toeTouch === val
                        ? val === "pass"
                          ? "bg-emerald-dark/50 text-emerald-300"
                          : "bg-red-900/50 text-red-300"
                        : "bg-slate-700 text-slate-400"
                    )}
                  >
                    {val.charAt(0).toUpperCase() + val.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <label className="text-xs text-slate-300 flex-1">Deep Squat</label>
              <div className="flex gap-2">
                {([1, 2, 3] as const).map((val) => (
                  <button
                    key={val}
                    onClick={() => setForm((prev) => ({ ...prev, deepSquat: prev.deepSquat === val ? null : val }))}
                    className={cn(
                      "w-8 h-8 rounded-lg text-xs font-medium transition-colors",
                      form.deepSquat === val
                        ? "bg-teal-600/50 text-teal-200"
                        : "bg-slate-700 text-slate-400"
                    )}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button size="sm" onClick={handleSubmit} className="bg-teal-600 hover:bg-teal-700">
              Save Assessment
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {assessments.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-500">No assessments yet.</p>
          <p className="text-sm text-slate-600 mt-1">
            Record your TPI benchmarks to track progress over time.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {assessments.map((assessment, idx) => {
            const previous = assessments[idx + 1] ?? null;
            return (
              <div
                key={assessment.id}
                className="bg-slate-800 rounded-xl border border-slate-700 p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-white">{assessment.date}</p>
                  <button
                    onClick={() => {
                      if (window.confirm("Delete this assessment?")) deleteAssessment(assessment.id);
                    }}
                    className="text-slate-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(FIELD_LABELS) as TPIField[]).map((field) => {
                    const val = assessment[field];
                    if (val === null) return null;
                    const prevVal = previous?.[field] ?? null;
                    return (
                      <div key={field} className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 truncate mr-2">
                          {FIELD_LABELS[field].replace(/ \(.*\)/, "")}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="text-white font-mono">
                            {typeof val === "number" ? val : val}
                          </span>
                          <TrendIcon current={val} previous={prevVal} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
