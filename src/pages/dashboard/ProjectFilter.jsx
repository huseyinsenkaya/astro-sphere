const filterList = [
  "all",
  "mine",
  "development",
  "fashion&music",
  "design",
  "production",
  "philanthropy&sports",
  "sales",
  "marketing",
];

export default function ProjectFilter({ currentFilter, changeFilter }) {
  return (
    <div className="mx-auto my-8">
      <nav className="flex rounded bg-white p-2">
        <p className="mr-3 text-sm">Filter by:</p>
        {filterList.map((filter) => (
          <button
            className={`grow border-r border-solid border-[#e4e4e4] bg-transparent p-1 text-xs font-bold  last:border-none ${
              currentFilter === filter
                ? "text-primary-color"
                : "text-text-color"
            }`}
            onClick={() => changeFilter(filter)}
            key={filter}
          >
            {filter}
          </button>
        ))}
      </nav>
    </div>
  );
}
