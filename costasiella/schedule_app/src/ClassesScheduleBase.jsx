import React from 'react'
import { useQuery } from '@apollo/client'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { v4 } from 'uuid'
import moment from 'moment'

import { GET_FILTER_VALUES_QUERY } from "./queries"
import LSK from "./local_storage_keys"
import { get_list_query_variables } from "./tools"


function ClassesScheduleBase({ children, dateFrom, refetchClasses=f=>f, setDates=f=>f }) {
  const { loading, error, data } = useQuery(GET_FILTER_VALUES_QUERY)

  if (loading) {
    return <p>Loading...</p>
  }
  
  if (error) {
    return <p>Error loading filter data...</p>
  }
  
  return (
    <div>
        {/* Tools here */}
        <Formik
          initialValues={{ 
            organizationLocation: "",
            organizationClasstype: "",
            organizationLevel: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
              console.log('submit values:')
              console.log(values)
            }}
          >
          {({ isSubmitting, setFieldValue, setFieldTouched, errors, values }) => (
            <Form>
              <div className="cs-row">
                <div className="cs-col-md-3">
                  <label htmlFor="organizationLocation">Location</label>
                  <Field component="select" 
                        name="organizationLocation" 
                        value={localStorage.getItem(LSK.LOCATION) || ""}
                        onChange={(event) => {
                          let locId = event.target.value
                          localStorage.setItem(LSK.LOCATION, locId)
                          refetchClasses(get_list_query_variables())
                        }}
                        className={(errors.organizationLocation) ? "form-control is-invalid" : "form-control"} 
                        autoComplete="off">
                    <option value="" key={v4()}>All locations</option>
                    {data.organizationLocations.edges.map(({ node }) =>
                      <option value={node.id} key={v4()}>{node.name}</option>
                    )}
                  </Field>
                  <ErrorMessage name="organizationLocation" component="span" className="invalid-feedback" />
                </div>
                <div className="cs-col-md-3">
                  <label htmlFor="organizationClasstype">Class</label>
                  <Field component="select" 
                        name="organizationClasstype" 
                        value={localStorage.getItem(LSK.CLASSTYPE) || ""}
                        onChange={(event) => {
                          let ctId = event.target.value
                          localStorage.setItem(LSK.CLASSTYPE, ctId)
                          refetchClasses(get_list_query_variables())
                        }}
                        className={(errors.organizationClastype) ? "form-control is-invalid" : "form-control"} 
                        autoComplete="off">
                    <option value="" key={v4()}>All classes</option>
                    {data.organizationClasstypes.edges.map(({ node }) =>
                      <option value={node.id} key={v4()}>{node.name}</option>
                    )}
                  </Field>
                  <ErrorMessage name="organizationClasstype" component="span" className="invalid-feedback" />
                </div>
                <div className="cs-col-md-3">
                  <label htmlFor="organizationLevel">Level</label>
                  <Field component="select" 
                        name="organizationLevel" 
                        value={localStorage.getItem(LSK.LEVEL) || ""}
                        onChange={(event) => {
                          let lId = event.target.value
                          localStorage.setItem(LSK.LEVEL, lId)
                          refetchClasses(get_list_query_variables())
                        }}
                        className={(errors.organizationLevel) ? "form-control is-invalid" : "form-control"} 
                        autoComplete="off">
                    <option value="" key={v4()}>All levels</option>
                    {data.organizationLevels.edges.map(({ node }) =>
                      <option value={node.id} key={v4()}>{node.name}</option>
                    )}
                  </Field>
                  <ErrorMessage name="organizationLevel" component="span" className="invalid-feedback" />
                </div>
                <div className="cs-col-md-3">
                  <label>Week</label>
                  <button 
                    type="button"
                    onClick={() => {
                      let dateFrom = moment(localStorage.getItem(LSK.DATE_FROM))
                      dateFrom.subtract(7, 'days')
                      setDates(dateFrom)
                    }}
                  >
                    &lt;
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      let dateFrom = moment(localStorage.getItem(LSK.DATE_FROM))
                      dateFrom.add(7, 'days')
                      setDates(dateFrom)
                    }}
                  >
                    &gt;
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setDates(moment())
                    }}
                  >
                    This week
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
    
        {/* Classes here */}
        <div id="cs-classes">
          {children}
        </div>
    </div>
  )
}


export default ClassesScheduleBase
