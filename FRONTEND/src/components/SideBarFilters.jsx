import { ChevronLeft } from "lucide-react";

export default function SidebarFilters() {
  return (
    <aside className="w-full max-w-xs p-4 bg-white rounded-lg shadow-md space-y-6">

      {/* Filter Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Filters</h3>
          <ChevronLeft className="w-4 h-4" />
        </div>

        {/* Working Schedule */}
        <div>
          <h4 className="text-sm text-gray-500 mb-2">Working schedule</h4>
          <div className="space-y-2 text-sm">
            <FilterOption label="Full time" defaultChecked />
            <FilterOption label="Part time" defaultChecked />
            <FilterOption label="Internship" />
            <FilterOption label="Project work" defaultChecked />
            <FilterOption label="Volunteering" />
          </div>
        </div>

        {/* Employment Type */}
        <div>
          <h4 className="text-sm text-gray-500 mb-2">Employment type</h4>
          <div className="space-y-2 text-sm">
            <FilterOption label="Full day" defaultChecked />
            <FilterOption label="Flexible schedule" />
            <FilterOption label="Shift work" />
            <FilterOption label="Distant work" defaultChecked />
            <FilterOption label="Shift method" />
          </div>
        </div>
      </div>
    </aside>
  );
}

function FilterOption({ label, defaultChecked = false }) {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        className="form-checkbox h-4 w-4 text-black rounded checked:bg-black"
        defaultChecked={defaultChecked}
      />
      <span>{label}</span>
    </label>
  );
}
