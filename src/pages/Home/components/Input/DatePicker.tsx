import React from "react";
import { DatePicker as CustomDatePicker } from "antd";
import { Dayjs } from "dayjs";

type Props = {
  name: string
  placeholder: string
  disabledDate?: (current: Dayjs) => boolean,
  defaultPickerValue?: Dayjs
}

const DatePicker = ({ name, placeholder, disabledDate, defaultPickerValue, ...rest }: Props) => {
  return (
    <CustomDatePicker
      variant="filled"
      style={{ width: "100%", fontSize: "1.25rem" }}
      id={name}
      placeholder={placeholder}
      disabledDate={disabledDate}
      defaultPickerValue={defaultPickerValue}
      {...rest}
    />
  );
};

export default DatePicker;
