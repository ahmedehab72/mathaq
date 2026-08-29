export function PolicyPage({ eyebrow, title, intro, sections }: { eyebrow: string; title: string; intro: string; sections: { title: string; copy: string }[] }) {
  return <div className="page-shell policy-page"><section className="policy-hero"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{intro}</p></section><section className="section-wrap policy-content"><div className="policy-list">{sections.map((section, index) => <article key={section.title}><span>0{index + 1}</span><div><h2>{section.title}</h2><p>{section.copy}</p></div></article>)}</div></section></div>;
}
