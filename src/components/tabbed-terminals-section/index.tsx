import classNames from "classnames";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import SectionWrapper from "../section-wrapper";
import Terminal from "../terminal";
import { H1, H4, P } from "../text";
import s from "./TabbedTerminalsSection.module.css";

interface TerminalTab {
  title: string;
  description: string;
  lines: string[];
}

interface TabbedTerminalsSectionProps {
  className?: string;
  title: string;
  terminalTabs: TerminalTab[];
}

export default function TabbedTerminalsSection({
  className,
  title,
  terminalTabs,
}: TabbedTerminalsSectionProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <SectionWrapper className={classNames(s.tabbedTerminalsSection, className)}>
      <div className={s.content}>
        <div>
          <H1>{title}</H1>
          <ul className={s.tabs}>
            {terminalTabs.map((tab, i) => {
              const isActiveTab = i === activeTabIndex;
              return (
                <li
                  key={tab.title}
                  className={classNames({
                    [s.activeTab]: isActiveTab,
                  })}
                  onClick={() => setActiveTabIndex(i)}
                >
                  <div className={s.header}>
                    <H4>{tab.title}</H4>
                    <ChevronDown size={16} />
                  </div>
                  {isActiveTab && (
                    <P className={s.description}>{tab.description}</P>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className={s.spotlight}>
          <Terminal
            fontSize="small"
            columns={70}
            rows={20}
            title="~"
            lines={terminalTabs[activeTabIndex].lines}
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
