import Navbar from "../components/Navbar";

const defaultPowerBiEmbedUrl =
  "https://app.powerbi.com/view?r=eyJrIjoiNzJjMzcyOTAtNTZiNi00N2E5LWFjYjQtYjRiNjQxNTA5NDE5IiwidCI6ImNkY2JiMGUyLTlmZWEtNGY1NC04NjcwLTY3MjcwNzc5N2FkYSIsImMiOjEwfQ%3D%3D";

const rawPowerBiEmbedUrl =
  import.meta.env.VITE_POWER_BI_EMBED_URL?.trim() || defaultPowerBiEmbedUrl;

function withPowerBiDisplayParams(url) {
  const displayParams = {
    filterPaneEnabled: "false",
    navContentPaneEnabled: "false",
    pageView: "fitToPage",
  };

  try {
    const embedUrl = new URL(url);

    Object.entries(displayParams).forEach(([key, value]) => {
      embedUrl.searchParams.set(key, value);
    });

    return embedUrl.toString();
  } catch {
    const separator = url.includes("?") ? "&" : "?";

    return `${url}${separator}${new URLSearchParams(
      displayParams
    ).toString()}`;
  }
}

const powerBiEmbedUrl = withPowerBiDisplayParams(rawPowerBiEmbedUrl);

export default function Dashboard() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#02070d]">
      <Navbar />

      <main className="flex min-h-[calc(100vh-89px)] w-full items-start justify-center bg-[radial-gradient(circle_at_top_left,rgba(53,243,255,0.12),transparent_32%),linear-gradient(135deg,#02070d,#050f1a_55%,#02070d)] px-3 py-4 md:px-6 md:py-5 xl:px-8">
        <section className="w-full max-w-[1080px] overflow-hidden rounded-lg border border-cyan-400/15 bg-[#03111d] shadow-[0_22px_70px_rgba(0,0,0,0.45)]">
          <div className="flex items-center justify-between gap-4 border-b border-cyan-400/10 bg-[#051625] px-4 py-3 md:px-5">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-200/60">
                Power BI
              </p>

              <h1 className="text-lg font-semibold text-white">
                Interactive Dashboard
              </h1>
            </div>

            <a
              href={rawPowerBiEmbedUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-cyan-400/25 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/10"
            >
              Open in Power BI
            </a>
          </div>

          <div className="bg-black p-2 md:p-3">
            <div className="aspect-[16/9] w-full overflow-hidden rounded-md border border-white/10 bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]">
              <iframe
                title="Ayam Serayu Power BI Dashboard"
                src={powerBiEmbedUrl}
                className="h-full w-full border-0 bg-black"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}