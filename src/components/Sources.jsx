import { useEffect, useState } from "react";

export default function Sources({ data, onSourceChange, type }) {
    let sources = Array.from(new Set(data.map(row => row[type])));
    sources = sources.filter(source => source && source.trim() !== "");
    
    const [checkedSources, setCheckedSources] = useState([]);

    // add selected sources to the state and pass it to the parent component
    const changeCheckedSources = (source, checked) => {
        setCheckedSources(prev => {
            if (checked) {
                onSourceChange([...prev, source]);
                return [...prev, source];
            } else {
                onSourceChange(prev.filter(s => s !== source));
                return prev.filter(s => s !== source);
            }
        });
    };

    return (
        <div className="grow">
            <section className="grid place-items-center bg-main rounded-2xl">
                <label>
                    <input className="peer/showLabel absolute scale-0" type="checkbox" />
                    <span className="block max-h-14 max-w-xs overflow-hidden rounded-lg  px-4 py-0  transition-all duration-300 peer-checked/showLabel:max-h-52">
                    <h3 className="flex h-14 cursor-pointer items-center font-bold ">{type}</h3>
<div className="relative flex flex-col rounded-xl">
                <nav className="w-fit flex-wrap flex p-1 rounded-xl">
                    {sources.map((source, index) => (
                        <div
                            role="button"
                            className="flex items-center rounded-lg p-0 transition-all hover:bg-darkboxes focus:bg-slate-100 active:bg-slate-100"
                        >
                            <label
                                htmlFor={`check-vertical-list-group${type}-${index}`}
                                className="flex w-full cursor-pointer items-center px-3 py-2"
                            >
                                <div className="inline-flex items-center">
                                    <label
                                        className="flex items-center cursor-pointer relative"
                                        htmlFor={`check-vertical-list-group${type}-${index}`}
                                    >
                                        <input
                                            type="checkbox"
                                            className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                                            id={`check-vertical-list-group${type}-${index}`}
                                            onChange={(e) => changeCheckedSources(source, e.target.checked)}
                                        />
                                        <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3.5 w-3.5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                stroke="currentColor"
                                                strokeWidth={1}
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </span>
                                    </label>
                                    <label
                                        className="cursor-pointer ml-2 text-xs"
                                        htmlFor="check-vertical-list-group4"
                                    >
                                        {source}
                                    </label>
                                </div>
                            </label>
                        </div>
                    ))}
                </nav>
            </div>
                    </span>
                </label>
            </section>
            
        </div>

    )
}
