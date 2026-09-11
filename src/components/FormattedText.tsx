// Renders admin-entered free text (product description, etc.) the way it was
// meant to read instead of as one wall of text. Hard line breaks in the raw
// value are usually wrap artifacts from wherever the text was first composed
// (Notes, WhatsApp, an Instagram caption) rather than real paragraph breaks,
// so whitespace is normalized first and the copy is re-segmented using the
// structure the admin actually typed: a "·" starts a bullet list, a stray
// ". " inside that list is a second bullet separator (people bounce between
// the two when a bullet character does not paste cleanly), and the last
// sentence right before the list — if it ends in ":" — becomes a heading.
export default function FormattedText({ text, className }: { text: string; className?: string }) {
  const flat = text.replace(/\s+/g, ' ').trim();
  if (!flat) return null;

  const bulletStart = flat.indexOf('·');
  if (bulletStart === -1) {
    return <p className={className}>{flat}</p>;
  }

  const intro = flat.slice(0, bulletStart).trim();
  const items = flat.slice(bulletStart + 1)
    .split(/·|\s\.\s/)
    .map(s => s.trim())
    .filter(Boolean);

  const sentences = intro.split(/(?<=\.)\s+/).filter(Boolean);
  const lastSentence = sentences[sentences.length - 1];
  const hasHeading = sentences.length > 1 && lastSentence?.endsWith(':');
  const heading = hasHeading ? lastSentence : '';
  const body = (hasHeading ? sentences.slice(0, -1) : sentences).join(' ').trim();

  return (
    <div className={className}>
      {body && <p>{body}</p>}
      {heading && <p className="font-semibold mt-2">{heading}</p>}
      {items.length > 0 && (
        <ul className="list-disc pl-4 space-y-1 mt-2">
          {items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      )}
    </div>
  );
}
