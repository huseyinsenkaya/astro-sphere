export default function Avatar({ src, customClass }) {
  return (
    <div
      className={`inline-block overflow-hidden rounded-full ${
        customClass ? customClass : "h-14 w-14"
      }`}
    >
      <img className="h-full w-full object-cover" src={src} alt="User avatar" />
    </div>
  );
}
