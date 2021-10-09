import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { v4 } from 'uuid'
import moment from 'moment'

import { GET_CLASSES_QUERY } from './queries'
import ClassesScheduleBase from './ClassesScheduleBase'
import LSK from './local_storage_keys'
import { get_class_messages, get_list_query_variables } from './tools'


function getButtonBook(bookingStatus, dateBookingOpen, urlBooking, dateFormat) {
  let book = ''
  switch( bookingStatus ) {
    case "NOT_YET_OPEN":
      book = 'Book from ' + moment(dateBookingOpen).format(dateFormat);
      break;
    case "FINISHED":
      book = "Finished";
      break;
    case "HOLIDAY":
      book = "Holiday";
      break;
    case "CANCELLED":
      book = "Cancelled";
      break;
    case "ONGOING":
      book = "Ongoing...";
      break;
    case "FULL":
      book = "Fully booked";
      break;
    case "OK":
      book = <a target="_blank" href={urlBooking}><button>Book &gt;</button></a>;
      break;
  }

  return book
}

// Set starting values for date from and until to today + 6 days
localStorage.setItem(LSK.DATE_FROM, moment().format('YYYY-MM-DD')) 
localStorage.setItem(LSK.DATE_UNTIL, moment().add(6, 'days').format('YYYY-MM-DD')) 

function ClassesSchedule({ t, match, history }) {
    const dateFormat = "DD-MM-YYYY"
    const timeFormat = "HH:mm"
  
    // const title = t("shop.home.title")
    const title="Schedule"
    const { loading, error, data, refetch } = useQuery(GET_CLASSES_QUERY, {
      variables: get_list_query_variables()
    })
  
    if (loading) return (
      <ClassesScheduleBase refetchClasses={refetch}>
        <div className="cs-loading">Loading classes...</div>
      </ClassesScheduleBase>
    )
    if (error) return (
      <ClassesScheduleBase refetchClasses={refetch}>
        Error loading classes...
      </ClassesScheduleBase>
    )
  
    console.log(data)
    console.log(data.scheduleClasses)

    function setDates(dateFrom) {
      const queryDateFormat = "YYYY-MM-DD"
      const dateUntil = moment(dateFrom).add(6, 'days')

      localStorage.setItem(LSK.DATE_FROM, dateFrom.format(queryDateFormat))
      localStorage.setItem(LSK.DATE_UNTIL, dateUntil.format(queryDateFormat))

      refetch({
        dateFrom: dateFrom.format(queryDateFormat),
        dateUntil: dateUntil.format(queryDateFormat),

      })
    }
  
    return (
      <ClassesScheduleBase 
        refetchClasses={refetch}
        setDates={setDates}
        title={title}
      >
        
      {/* <ShopClassesScheduleFilter data={data} refetch={refetch} /> */}
        {data.scheduleClasses.map(({ date, bookingOpenOn, classes }) =>
          <div key={v4()}>
            <div className="cs-row">
              <div className="cs-col-md-12">
                <h3>{moment(date).format("dddd")} <small>{date}</small></h3>
              </div>         
            </div>
            {(!classes.length) ? <div className="cs-row">
              <div className="cs-col-md-12">
                No classes found on this day
              </div>
            </div> :
              classes.map((
                { scheduleItemId, 
                  frequencyType,
                  date, 
                  status,
                  holiday,
                  holidayName,
                  description,
                  account, 
                  role,
                  account2,
                  role2,
                  organizationLocationRoom, 
                  organizationClasstype, 
                  organizationLevel,
                  timeStart, 
                  timeEnd,
                  displayPublic,
                  bookingStatus,
                  bookingOpenOn,
                  urlBooking
                }) => (
                <div className="cs-row cs-class" key={v4()}>
                  <div className="cs-col-md-2">
                    {/* Start & end time */}
                    {moment(date + ' ' + timeStart).format(timeFormat)} {' - '}
                    {moment(date + ' ' + timeEnd).format(timeFormat)} <br /> 
                    {/* {(frequencyType === 'SPECIFIC') ? <Badge color="primary">{t('general.once')}</Badge> : null } <br /> */}
                    <small className="text-muted">{get_class_messages(status, description, holiday, holidayName)}</small>
                  </div>
                  <div className="cs-col-md-3">
                    {/* Location */}
                    {organizationLocationRoom.organizationLocation.name} <br />
                    <small className="text-muted">{organizationLocationRoom.name}</small>
                  </div>
                  <div className="cs-col-md-3">
                    {/* Type and level */}
                    {organizationClasstype.name} <br />
                    <small className="text-muted">
                      {(organizationLevel) ? organizationLevel.name: ""}
                    </small>
                  </div>
                  <div className="cs-col-md-2">
                    {/* Teacher(s) */}
                    { (account) ? account.fullName : "" } <br />
                    <span className="text-muted">
                      {(account2) ? account2.fullName : ""}
                    </span>
                  </div>
                  <div className="cs-col-md-2">
                    <span className="cs-float-right">
                      {getButtonBook(
                        bookingStatus,
                        bookingOpenOn,
                        urlBooking,
                        dateFormat
                      )}
                    </span>
                  </div>
                </div>
              ))}
            <div className="cs-row">
              
            </div>
          </div>
        )}
  
      </ClassesScheduleBase>
    )
  }
  
export default ClassesSchedule