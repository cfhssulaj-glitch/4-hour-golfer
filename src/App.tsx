import { useState } from "react";
import { AppProvider, useApp } from "@/context/AppContext";
import { Header } from "@/components/Header";
import { DaySelector } from "@/components/DaySelector";
import { WeekSchedule } from "@/components/WeekSchedule";
import { HistoryView } from "@/components/HistoryView";
import { TPIAssessmentView } from "@/components/TPIAssessmentView";

type View = "schedule" | "history" | "assessment";

function AppContent() {
  const { state } = useApp();
  const [view, setView] = useState<View>("schedule");

  const renderView = () => {
    if (!state.setupComplete) return <DaySelector />;
    switch (view) {
      case "history":
        return <HistoryView />;
      case "assessment":
        return <TPIAssessmentView />;
      default:
        return <WeekSchedule />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-dark">
      <Header view={view} onNavigate={setView} />
      {renderView()}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
