export const timeFormat = (date) => {
    let hours = date.getHours()
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am"
    hours = hours % 12
    hours = hours ? hours : 12
    minutes = minutes < 10 ? "0" + minutes : minutes
    const timestamp = hours + ":" + minutes + ampm
    return timestamp
  }

export const dateFormat = (string) => {
   const newDate = new Date(string)
    const returnedDate = newDate.getDate() +"/" + newDate.getMonth() + "/1" + newDate.getFullYear()
    return returnedDate
  }
export const differenceInDates = (string) => {
   const newDate = new Date (new Date(new Date()).toLocaleDateString())
  
    const nextDate = new Date(new Date(new Date(string).toISOString()).toLocaleDateString())
  
    const diffTime = Math.abs(newDate-nextDate)
    const diffDays = Math.ceil(diffTime/ (1000 * 60* 60 * 24))
    return diffDays
}