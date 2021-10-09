import { gql } from "@apollo/client"

export const GET_CLASSES_QUERY = gql`
  query ScheduleClasses(
      $dateFrom: Date!, 
      $dateUntil:Date!, 
      $orderBy: String, 
      $organizationClasstype: String,
      $organizationLevel: String,
      $organizationLocation: String,
      $attendanceCountType: String!
    ){
    scheduleClasses(
        dateFrom:$dateFrom, 
        dateUntil: $dateUntil, 
        orderBy: $orderBy, 
        organizationClasstype: $organizationClasstype,
        organizationLevel: $organizationLevel,
        organizationLocation: $organizationLocation,
        publicOnly: true,
        attendanceCountType: $attendanceCountType
    ){
      date
      classes {
        scheduleItemId
        frequencyType
        date
        status
        holiday
        holidayName
        description
        account {
          id
          fullName
        }
        role
        account2 {
          id
          fullName
        }
        role2
        organizationLocationRoom {
          id
          name
          organizationLocation {
            id
            name
          }
        }
        organizationClasstype {
          id
          name
        }
        organizationLevel {
          id
          name
        }
        timeStart
        timeEnd
        availableSpacesOnline
        availableSpacesTotal
        displayPublic
        bookingStatus
        bookingOpenOn
        urlBooking
      }
    }
  }
`

export const GET_FILTER_VALUES_QUERY = gql`
  query FilterValues {
    organizationLocations(first: 100, archived: false) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          archived
          name
        }
      }
    }
    organizationClasstypes(first: 100, archived: false) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          archived
          name
        }
      }
    }
    organizationLevels(first: 100, archived: false) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          archived
          name
        }
      }
    }
  }
`