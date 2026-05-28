const generateTicketId = () => {
  const randomNumber =
    Math.floor(10000 + Math.random() * 90000);

  return `RH-${randomNumber}`;
};

export default generateTicketId;