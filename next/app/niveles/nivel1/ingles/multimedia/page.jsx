// Página Multimedia
"use client"
import Multimedia from "@/components/templates/multimedia/page"
import PrivateRoute from "@/components/PrivateRoute";

export default function InglesPage() {
    return (
        <PrivateRoute>
            <div>
                <Multimedia
                    href="/niveles/nivel1/ingles"

                />
            </div>
        </PrivateRoute>

    );
}