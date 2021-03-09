"use strict";
const yellow = ["#FFFFB7", "#FFF192", "#FFEA61", "#FFDD3C", "#FFD400"];
const Colours = { darkBlue: "colour" };
const dateToYMD = (date) => date.toISOString().slice(0, 10);
const increaseDate = (date) => new Date(date.setDate(date.getDate() + 1));
const createDateRange = (start, end) => {
  const dateArr = [];
  for (
    let startCp = increaseDate(new Date(start));
    startCp < end;
    startCp = increaseDate(startCp)
  ) {
    dateArr.push(new Date(startCp));
  }
  return dateArr;
};
const createMarkedDates = (start, end) => {
  const startStr = dateToYMD(start);
  const endStr = dateToYMD(end);
  const selectedStr = createDateRange(start, end).map((d) => dateToYMD(d));
  const markedDates = {
    [startStr]: { startingDay: true, color: yellow[4], textColor: Colours.darkBlue },
  };
  selectedStr.forEach((dateStr) => {
    markedDates[dateStr] = { selected: true, color: yellow[4], textColor: Colours.darkBlue };
  });
  markedDates[endStr] = { endingDay: true, color: yellow[4], textColor: Colours.darkBlue };
  return markedDates;
};

let date = new Date();
let in14days = new Date(new Date(date).setDate(date.getDate() + 14));
console.log(createMarkedDates(date, in14days));
