//Pagina principal receso
"use client"
import BreakSection from "@/components/breaksection";
import PrivateRoute from "@/components/PrivateRoute";

export default function Home() {
  return (
    <PrivateRoute>
      <div>
        <BreakSection />
      </div>
    </PrivateRoute>
  );
}
