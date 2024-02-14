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
      {...rest}
      aria-label={name}
      data-testid={name}
      name={name}
      variant="filled"
      style={{ width: "100%", fontSize: "1.25rem" }}
      id={name}
      placeholder={placeholder}
      disabledDate={disabledDate}
      defaultPickerValue={defaultPickerValue}
    />
  );
};

export default DatePicker;
