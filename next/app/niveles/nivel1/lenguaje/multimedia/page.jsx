// Página Multimedia
"use client"
import Multimedia from "@/components/templates/multimedia/page"
import PrivateRoute from "@/components/PrivateRoute";

export default function LenguajePage() {
    return (
        <PrivateRoute>
            <div>
                <Multimedia
                    href="/niveles/nivel1/lenguaje"

                />
            </div>
        </PrivateRoute>

    );
}