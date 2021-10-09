import LSK from "./local_storage_keys"

export function get_list_query_variables() {
    let organizationClasstype
    let organizationLevel
    let organizationLocation
  
    let queryVars = {
      attendanceCountType: "ATTENDING_AND_BOOKED",
      orderBy: "starttime",
      dateFrom: localStorage.getItem(LSK.DATE_FROM), 
      dateUntil: localStorage.getItem(LSK.DATE_UNTIL)
    }
  
    organizationClasstype = localStorage.getItem(LSK.CLASSTYPE)
    if (organizationClasstype) {
      queryVars.organizationClasstype = organizationClasstype
    } else {
      queryVars.organizationClasstype = undefined
    }
  
    organizationLevel = localStorage.getItem(LSK.LEVEL)
    if (organizationLevel) {
      queryVars.organizationLevel = organizationLevel
    } else {
      queryVars.organizationLevel = undefined
    }
  
    organizationLocation = localStorage.getItem(LSK.LOCATION)
    if (organizationLocation) {
      queryVars.organizationLocation = organizationLocation
    } else {
      queryVars.organizationLocation = undefined
    }
  
    console.log(queryVars)
  
    return queryVars
  }
  

export function get_class_messages(status, description, holiday, holidayName) {
  if (holiday) {
    return <span>Holiday ({holidayName})</span>
  }

  if (status == 'CANCELED') {
    return description
  }
}