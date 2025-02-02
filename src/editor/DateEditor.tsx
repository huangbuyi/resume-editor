import { DatePicker, Flex, Select } from 'antd';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';

export interface DateEditorProps {
  startDate: string;
  endDate: string;
  onChange: (date: { startDate?: string, endDate?: string }) => void;
}

type DateType = 'year' | 'month';

export default function DateEditor({ startDate, endDate, onChange }: DateEditorProps) {
  const [dateType, setDateType] = useState<DateType>(dayjs(startDate, 'YYYY', true).isValid() ? 'year' : 'month');
  const dateFormat = useRef(dateType === 'month' ? 'YYYY-MM' : 'YYYY');

  const handleDateTypeChange = (dateType: DateType) => {
    setDateType(dateType);
    dateFormat.current = dateType === 'month' ? 'YYYY-MM' : 'YYYY';
    onChange({
      startDate: dayjs(startDate).format(dateFormat.current),
      endDate: endDate && dayjs(endDate).format(dateFormat.current)
    })
  }

  return <Flex>
    <DatePicker picker={dateType} placeholder="开始时间" value={dayjs(startDate)} onChange={date => onChange({ startDate: date.format(dateFormat.current) })} />
    <DatePicker picker={dateType} placeholder="至今" allowClear value={endDate && dayjs(endDate)} onChange={date => onChange({ endDate: date && date.format(dateFormat.current) })} style={{ marginLeft: 8 }}/>
    <Select
      value={dateType}
      options={[
        { value: 'month', label: '月' },
        { value: 'year', label: '年' },
      ]}
      onChange={handleDateTypeChange}
      style={{ width: '4em', marginLeft: 8 }}
    ></Select>
  </Flex>
}
