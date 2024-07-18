import { UserPanel } from '../UserPanel/UserPanel.jsx';
import { DailyInfo } from '../DailyInfo/DailyInfo.jsx';
import { MonthInfo } from '../MonthInfo/MonthInfo.jsx';

import css from './WaterDetailedInfo.module.css';

const WaterDetailedInfo = () => {
  return (
    <div className={css['water-detailed-info-container']}>
      <UserPanel />
      <DailyInfo />
      <MonthInfo />
    </div>
  );
};

export default WaterDetailedInfo;
