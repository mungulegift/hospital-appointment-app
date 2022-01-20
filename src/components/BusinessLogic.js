import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const appointments = [
    {
      serial: 1,
      providerName: "Mark Dems",
      patientName: "Jacobs Toms",
      description: "Chest pains from review",
      dateTime: "10 February 2022 11:00",
      status: 0
    }
  ]

  const providers = [
    {
      id: 1,
      firstName: "Mark",
      secondName: "Dems",
      specialty: "Pediatrician",
      remark: "Some remarks"
    },
    {
        id: 2,
        firstName: "James",
        secondName: "Stones",
        specialty: "Dentist",
        remark: "Some remarks"
      },
      {
        id: 3,
        firstName: "Nathan",
        secondName: "Bensons",
        specialty: "Dematologist",
        remark: "Some remarks"
      }
  ]


  export function useUser() {

    const [user, setUser] = useState(null)
    const navigate = useNavigate()
  
    useEffect(() => {
      axios.get("/api/user/name").then( response => {

        const user = response.data

        setUser(user)
      })
    },[])

    if(!user || !user.userType){
      navigate("/login")
    }
  
    return user
  }

  export function useProviders() {

    const [providers, setProviders] = useState(null)
  
    useEffect(() => {
      axios.get("/api/user/provider/all").then( response => {

        const providers = response.data
        console.log("repdonse:",response)
        setProviders(providers)
      })
      
      
    },[])

    return providers
  }

  

  export function useAppointments(lastupdated) {

    const [appointments, setAppointments] = useState(null)
  
    useEffect(() => {
      axios.get("/api/appointment/patient").then( response => {

        const appointments = response.data
      
        setAppointments(appointments)
      })
      
      
    },[lastupdated])

    return appointments
  }

  export const userType = {
    admin:1,
    provider: 2,
    patient: 3
  }

  export const updateData =(data, setData) => event => {

    const newData = {}
    
   const key = event.target.name
   const value = event.target.value
  
   newData[key] = value

   console.log("new data:", newData)
    setData({...data, ...newData})
  }

  export const refreshPage = () => {
    window.location.reload(false);
  }