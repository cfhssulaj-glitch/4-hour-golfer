import { AppProvider, useApp } from "@/context/AppContext";
import { Header } from "@/components/Header";
import { DaySelector } from "@/components/DaySelector";
import { WeekSchedule } from "@/components/WeekSchedule";

function AppContent() {
  const { state } = useApp();

  return (
    <div className="min-h-screen bg-slate-dark">
      <Header />
      {state.setupComplete ? <WeekSchedule /> : <DaySelector />}
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
