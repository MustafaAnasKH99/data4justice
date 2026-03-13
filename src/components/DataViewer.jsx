import { useState, useMemo } from "react";
import DataSummary from "./DataSummary.jsx";
import Sources from "./Sources.jsx";
import Slider from "rc-slider";
import Range from "rc-slider";
import "rc-slider/assets/index.css";
import Tooltip from '@mui/material/Tooltip';


// const { Range } = Slider;

function applyFilters(data, filters) {
  return data.filter((row) => {
    const year = Number(row['التاريخ']);

    const matchesSearch =
      row['ملخص التأثير']
        ?.toLowerCase()
        .includes(filters.search.toLowerCase());

    const matchesYear =
      year >= filters.yearRange[0] &&
      year <= filters.yearRange[1];

    const matchesSources = filters.source.length === 0 || filters.source.includes(row['الجهة المصدرة']);
    const matchesCategory = filters.category.length === 0 || filters.category.includes(row['التصنيف']);
    const matchesStatus = filters.status.length === 0 || filters.status.includes(row['حالة التنفيذ']);
    
    return matchesSearch && matchesYear && matchesSources && matchesCategory && matchesStatus;
  });
}

export default function DataViewer({ data }) {
  const [filters, setFilters] = useState({
    search: "",
    yearRange: [2011, 2024],
    source: [],
    category: [],
    status: []
  });

  const filteredData = useMemo(() => {
    return applyFilters(data, filters);
  }, [data, filters]);

  const updateSearch = (value) => {
    setFilters((prev) => ({
      ...prev,
      search: value
    }));
  };

  const updateYearRange = (range) => {
    setFilters((prev) => ({
      ...prev,
      yearRange: range
    }));
  };

  const updateSource = (value) => {
    setFilters((prev) => ({
      ...prev,
      source: value
    }));
  };

  const updateCategory = (value) => {
    setFilters((prev) => ({
      ...prev,
      category: value
    }));
  };

  const updateStatus = (value) => {
    setFilters((prev) => ({
      ...prev,
      status: value
    }));
  };

  return (
    <div dir="rtl" lang="ar" className="p-8 flex flex-col gap-8 max-h-200">
        <div className="flex flex-col gap-4">

        <div className="customSlider">
        <Slider
          range
          min={2011}
          max={2024}
          step={1}
          value={filters.yearRange}
          aria-label="Default"
          valueLabelDisplay="auto"
          onChange={updateYearRange}
          // vertical={true}
          />
      
      </div>
      <div className="min-w-full max-w-full flex justify-between">
        <span>2024</span>
        <span>2011</span>
      </div>
          </div>
      <div className="flex flex-row-reverse gap-8 ">
      <div className="basis-1/4 flex flex-col items-start h-full min-w-0 bg-boxes rounded-2xl p-4 relative sticky">
          <DataSummary className="" data={filteredData} />
        <div className="flex flex-col items-start w-full border-b-1">
          <div className="pr-5 mt-5">
            {filters.yearRange[1]} – {filters.yearRange[0]}
          </div>
          <input
              placeholder="ابحث في نصوص القوانين ..."
              onChange={(e) => updateSearch(e.target.value)}
              className="w-full p-5 bg-darkboxes mt-4 mb-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-300"
          />
        </div>
        		<div className="py-5 min-w-full">
			<details className="group">
				<summary className="flex justify-between items-center font-medium cursor-pointer list-none">
					<span> الفلاتر</span>
					<span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
</svg>
              </span>
				</summary>
        <div className="flex flex-wrap md:flex-wrap flex-row gap-4 mt-4 text-sm">
          <Sources data={data} onSourceChange={updateSource} type='الجهة المصدرة' />
          <Sources data={data} onSourceChange={updateCategory} type='التصنيف' />
          <Sources data={data} onSourceChange={updateStatus} type='حالة التنفيذ' />
        </div>
			</details>
		</div>
      </div>
      <div className="basis-3/4 max-w-full min-w-0 overflow-scroll max-h-150">


      {filteredData.map((row, i) => (
        <div dir="rtl" lang="ar" key={i} className="flex flex-col gap-1 p-4 text-right bg-boxes rounded-2xl mb-4">
          <div className="tags-group flex flex-row gap-4">
            
            <div className="flex flex-row gap-4">

            <div>
                  <Tooltip title="الجهة المصدرة" placement="top">

              {
                row['الجهة المصدرة'] == "الحكومة السورية السابقة" ? (
                  <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-400">{row['الجهة المصدرة']}</span>
                ) : (
                  <span className="inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-500 inset-ring inset-ring-yellow-400/20">{row['الجهة المصدرة']}</span>                )
                }
                </Tooltip>
            </div>
            <Tooltip title="التصنيف" placement="top">

            <div>
              <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-500/20 dark:text-purple-400">{row['التصنيف']}</span>
            </div>
            </Tooltip>
            <div className="status-tags">
                  <Tooltip title="حالة التنفيذ" placement="top">
                {
                  row['حالة التنفيذ'] == "قيد التنفيذ" ? (
                    <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-teal-100 text-teal-800 dark:bg-teal-500/20 dark:text-teal-400">{row['حالة التنفيذ']}</span>
                  ) : (
                    <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-400">{row['حالة التنفيذ']}</span>
                  )
                }
                </Tooltip>
            </div>
            <div>
              <Tooltip title="الفئة الأكثر تضرراً" placement="top">
                <span dataTooltipTarget="tooltip-default" className="py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-red-100 text-red-800 rounded-full dark:bg-red-500/20 dark:text-red-400">
                  <svg className="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                  {row['الفئة الأكثر تضرراً ']}
                </span>
              </Tooltip>
          </div>
          <div></div>
          </div>
          </div>
          <div className="flex flex-row text-right gap-4 p-5 items-center">
            <div className="flex flex-wrap flex-row text-2xl font-bold gap-2">
              <div className=""><span dir="ltr">- {row['التاريخ']}</span></div>
              <div className=""> {row['عنوان السياسية']} </div>
            </div>
            <div className="items-center text-violet-300">{row['الهيئة/ الجهة المصدرة الإدارية بشكل محدد']}</div>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <div>
                <span className="font-bold text-lg">شرح مبسط للقانون</span>
              </div>
              <div>{row['شرح مبسط للقانون']}</div>
            </div>
            <div>
              <div>
                <span className="font-bold text-lg">ملخص التأثير</span>
              </div>
              <div>{row['ملخص التأثير']}</div>
            </div>
          </div>
          <div className="mt-5 mb-5">
            <button onClick={() => window.open(row['رابط الوثيقة'], '_blank')} className="rounded-md border border-transparent py-2 px-4 flex items-center text-center text-sm transition-all text-slate-600 hover:bg-darkboxes focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none bg-slate-100" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-1.5">
                <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
              اقرأ المزيد من هنا              
            </button>
          </div>
          {/* <div>{row['الانتهاك على ارض الواقع/ الشهادة']}</div> */}
          <a href={row['مصدر الشهادة']} target="_blank" rel="noopener noreferrer" className="flex flex-col gap-4">
            <div>
                {
                  row['الانتهاك على ارض الواقع/ الشهادة'] ? (
                    <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400">
                      <svg className="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                      {row['الانتهاك على ارض الواقع/ الشهادة']}
                    </span>
                  ) : null
                }
            </div>
          </a>
        </div>
      ))}
      </div>
      </div>
    </div>
  );
}