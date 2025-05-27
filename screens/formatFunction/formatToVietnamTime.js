export default function formatToVietnamTime(dateInput) {
    const date = new Date(dateInput);
  
    const vnTime = date.toLocaleString("en-GB", {
      timeZone: "Asia/Ho_Chi_Minh",
      hour12: false,
    });
  
    const [day, time] = vnTime.split(", ");
    const formatted = `${time} ${day.replace(/\//g, "-")}`;
  
    return formatted;
  }