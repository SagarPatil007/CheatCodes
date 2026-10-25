import CopyButton from "./CopyButton";

export default function CodeBox({ code }: { code: string }) {
  return (
    <div className="cmd">
      <pre>{code}</pre>
      <CopyButton text={code} />
    </div>
  );
}
