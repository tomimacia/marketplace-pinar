import { Box, Input } from "@chakra-ui/react";
import DatePicker, { utils } from "@hassanmojab/react-modern-calendar-datepicker";
import React from "react";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";

export const ConfirmDate = ({ selectedDate, setSelectedDate }) => {
  const renderCustomInput = ({ ref }) => (
    <Input
      ref={ref}
      placeholder="Selecciona la fecha"
      value={
        selectedDate
          ? `${selectedDate.day}-${selectedDate.month}-${selectedDate.year}`
          : ""
      }
      textAlign="center"
      cursor="pointer"
      borderRadius="10px"
      outline="none"
      fontSize="1rem"
      p="1rem 1rem"
      h='10px'
      className="my-custom-input-class" // a styling class
    />
  );
  return (
    <Box maxW="183px" cursor="pointer">
      <DatePicker
        onChange={setSelectedDate}
        selected={selectedDate}
        renderInput={renderCustomInput}
        className="my-custom-input-class"
        maximumDate={utils().getToday()}
        isClosable
      />
    </Box>
  );
};
