import timeAgo from '@teambit/base-ui.utils.time-ago';
import classNames from 'classnames';
import React, { useEffect, useMemo, useReducer } from 'react';
import { Tooltip } from '@teambit/design.ui.tooltip';
import styles from './time-ago.module.scss';

type TimeAgoProps = {
  date: string | number;
} & React.HTMLAttributes<HTMLSpanElement>;

export function TimeAgo(props: TimeAgoProps) {
  const { date, className, ...rest } = props;

  const [refreshIdx, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const tId = setInterval(() => forceUpdate(), 1000 * 60);
    return () => clearInterval(tId);
  }, []);

  const formatted = useMemo(() => {
    return timeAgo(date);
  }, [date, refreshIdx]);

  return (
    <Tooltip
      className={styles.dateTooltip}
      placement={'top'}
      content={<div className={styles.dateTooltipContent}>{date}</div>}
    >
      <span {...rest} className={classNames(className)}>
        {formatted}
      </span>
    </Tooltip>
  );
}
