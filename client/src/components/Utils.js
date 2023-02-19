import React from 'react';

const DateParser = (num) => {
  let options = {hours:"2-digit", minutes:"2-digit", seconds:"2-digit", weekday:"long", year:"numeric", month:"short", day:"numeric"};

  let timestamp = Date.parse(num);
  let date = new Date(timestamp).toLocaleDateString('fr-FR', options)
  return date.toString()
};

export default DateParser;