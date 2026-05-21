export default function Footer() {
    return (
        <footer className="grid gap-8 border-t border-cyan-400/10 py-10 text-left md:grid-cols-3">
            <div>
                <div className="text-lg font-semibold text-white">Team</div>
                <div className="mt-3 space-y-2 text-cyan-50/55">
                    <div>AI Inventory Team</div>
                    <div>Data & Automation Unit</div>
                </div>
            </div>

            <div>
                <div className="text-lg font-semibold text-white">Contact</div>
                <div className="mt-3 space-y-2 text-cyan-50/55">
                    <div>+60196706433</div>
                    <div>2024271478@student.uitm.edu.my</div>
                </div>
            </div>

            <div>
                <div className="text-lg font-semibold text-white">Company</div>
                <div className="mt-3 space-y-2 text-cyan-50/55">
                    <div>AI Inventory Assistant</div>
                    <div>analytics.aiinventory.com</div>
                </div>
            </div>

            <div className="md:col-span-3 border-t border-cyan-400/8 pt-5 text-cyan-50/35">
                © 2024 AI Inventory Assistant. All rights reserved.
            </div>
        </footer>
    );
}